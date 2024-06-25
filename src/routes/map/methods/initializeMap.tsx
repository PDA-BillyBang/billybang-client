/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropertyGroup, PropertyOption } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';
import { fetchPropertyGroups } from './fetchPropertyGroups';
import { moveToCurrentLocation } from './moveToCurrentLocation';
import guData from '@/assets/json/gu2.json';
import { districtInfoLocation, initialDistrictLocation } from '@/utils/districtsLocation';
import {
  renderPolygons,
  showPolygons,
  hidePolygons,
} from './renderPolygons';
import { debounce } from 'lodash';

export const initializeMap = (
  setPropertyGroups: (properties: PropertyGroup[]) => void,
  setMap: (map: kakao.maps.Map | null) => void,
  setPs: (ps: kakao.maps.services.Places) => void,
  setIsDrawerOpen: Dispatch<SetStateAction<number>>,
  customOverlayRef: React.MutableRefObject<kakao.maps.CustomOverlay | null>,
  propertyOption: PropertyOption,
  setGu: React.Dispatch<React.SetStateAction<string>>,
  setGuCode: React.Dispatch<React.SetStateAction<string>>,
  setAddress: (title: string) => void,
  lat: number,
  lon: number,
  level: number,
  infoWindowRef: React.MutableRefObject<kakao.maps.InfoWindow | null>,
) => {
  const container = document.getElementById('map');
  const options = {
    center: new window.kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
    level: level, // 지도의 확대 레벨
  };
  if (!container) {
    return;
  }
  kakao.maps.load(() => {
    // 지도 생성
    const mapInstance = new kakao.maps.Map(container, options);
    setMap(mapInstance);

    // 편의시설 검색 객체 생성
    const psInstance = new kakao.maps.services.Places(mapInstance);
    setPs(psInstance);

    const geocoder = new kakao.maps.services.Geocoder();

    // 편의시설 상세정보 지우기
    const removeCovenientInfo = () => {
      setIsDrawerOpen(0);
      if (customOverlayRef) {
        customOverlayRef.current?.setMap(null);
      }
    };

    // 지역 정보 가져오기
    fetchPropertyGroups(mapInstance, setPropertyGroups, propertyOption);

    // 현재 위치로 아이콘 부착
    moveToCurrentLocation(mapInstance);

    // 줌, 항공뷰 컨트롤러 부착
    mapInstance.addControl(
      new kakao.maps.ZoomControl(),
      kakao.maps.ControlPosition.RIGHT
    );
    mapInstance.addControl(
      new kakao.maps.MapTypeControl(),
      kakao.maps.ControlPosition.TOPRIGHT
    );

    // 현재 '구' 가져오기
    const center = mapInstance.getCenter();
    const getGu = debounce(() => {
      geocoder.coord2RegionCode(
        center.getLng(),
        center.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const gu = result[0].region_2depth_name;
            const dong = result[0].region_3depth_name;
            const guCode = result[0].code.slice(0, 5);
            setGu(gu);
            if (setAddress) {
              setAddress(gu + ' ' + dong);
            }
            setGuCode(guCode);
          } else {
            console.error('Geocoder failed due to: ' + status);
          }
        }
      );
    }, 1000, { maxWait: 1000, trailing: true, leading: false });
    getGu();


    // 구 hover시 구명 보기
    const infoWindow = new kakao.maps.InfoWindow({disableAutoPan:true});
    infoWindowRef.current = infoWindow;

    // 폴리곤 hover 이벤트 등록
    const handlePolygonHover = (name: string) => {
      return () => {
        if (!infoWindowRef.current) return;
    
        const content = `
          <div class="infoWindow-content" style="padding:5px;">
            ${name}
          </div>
          <style>
            .infoWindow-content {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 150px;
            }
          </style>
        `;
        
        const position = new kakao.maps.LatLng(districtInfoLocation[name].lat, districtInfoLocation[name].lng);
        infoWindowRef.current.setContent(content);
        infoWindowRef.current.setPosition(position);
        infoWindowRef.current.open(mapInstance);
      };
    };

    // 다각형을 저장할 배열
    const guPolygons = renderPolygons(guData, mapInstance, infoWindow, handlePolygonHover);

    // 구 표시
    const showGuPolygons = () => {
      showPolygons(guPolygons, mapInstance);
    };

    // 구 숨기기
    const hideGuPolygons = () => {
      hidePolygons(guPolygons);
    };
    
    const roadviewContainer = document.getElementById('roadview');
    const roadviewControl = document.getElementById('roadviewControl');
    
    let roadviewVisible = false;
    let marker: kakao.maps.Marker | null = null;

    if (roadviewContainer && roadviewControl) {
      const roadview = new kakao.maps.Roadview(roadviewContainer);
      const roadviewClient = new kakao.maps.RoadviewClient();
      
      const toggleRoadview = () => {
        if (roadviewVisible) {
          roadviewContainer.style.width = '0';
          container.style.width = '100%';
          roadviewContainer.classList.add('hidden');
          roadviewVisible = !roadviewVisible
          if (marker) {
            marker.setMap(null);
            marker = null;
          }
        } else {
          const position = mapInstance.getCenter();
          roadviewClient.getNearestPanoId(position, 50, (panoId: any) => {
            if (panoId) { // 현재위치에 로드뷰가 있을 시
              roadviewVisible = !roadviewVisible
              roadviewContainer.classList.remove('hidden');
              roadview.setPanoId(panoId, position);
              roadviewContainer.style.width = '50%';
              container.style.width = '50%';
              roadview.relayout();
              marker = new kakao.maps.Marker({
                position: position,
                map: mapInstance,
              });
              const newPosition = new kakao.maps.LatLng(position.getLat(),(mapInstance.getBounds().getNorthEast().getLng() + position.getLng())/2)
              mapInstance.setLevel(1,{animate:true, anchor: newPosition})
              mapInstance.panTo(newPosition)
            }
          });
        }
      };
      
      roadviewControl.addEventListener('click', toggleRoadview);
    }

    // 줌 레벨 변경 이벤트 핸들러
    const onZoomChanged = () => {
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
      setPropertyGroups([]);
      const level = mapInstance.getLevel();

      // 로드뷰 버튼 렌더링 여부 결정
      if (roadviewControl) {
        if (level <= 3) {
          roadviewControl.classList.remove('hidden');
        } else {
          roadviewControl.classList.add('hidden');
        }
      }

      // 다각형 그리기 결정
      if (level <= 6) {
        hideGuPolygons();
      } else if (level >= 7) {
        showGuPolygons();
        setPropertyGroups(initialDistrictLocation)
      }
    };
    
        
    // 초기 다각형 표시
    onZoomChanged();
    
    // 초기 지역구 핀 설정
    setPropertyGroups(initialDistrictLocation);

    // 이벤트 리스너 등록
    kakao.maps.event.addListener(mapInstance, 'click', removeCovenientInfo);
    kakao.maps.event.addListener(mapInstance, 'idle', getGu);
    kakao.maps.event.addListener(mapInstance, 'zoom_changed', onZoomChanged);
    
    return () => {
      kakao.maps.event.removeListener(mapInstance, 'click', removeCovenientInfo);
      kakao.maps.event.removeListener(mapInstance, 'idle', getGu);
      kakao.maps.event.removeListener(mapInstance, 'zoom_changed', onZoomChanged);

      if (marker) {
        marker.setMap(null);
        marker = null;
      }
    };
  });
};
