/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropertyGroup, PropertyOption } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';
import { fetchPropertyGroups } from './fetchPropertyGroups';
import { moveToCurrentLocation } from './moveToCurrentLocation';
import guData from '@/assets/json/gu2.json';
import dongData from '@/assets/json/dong2.json';

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
  lon: number
) => {
  const container = document.getElementById('map');
  const options = {
    center: new window.kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
    level: 9, // 지도의 확대 레벨
  };
  if (!container) {
    return;
  }
  kakao.maps.load(() => {
    // 지도 생성
    const mapInstance = new kakao.maps.Map(container, options);
    setMap(mapInstance);
    console.log(mapInstance);
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

    // 매물 가져오기
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
    const getGu = () => {
      const center = mapInstance.getCenter();
      geocoder.coord2RegionCode(
        center.getLng(),
        center.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const gu = result[0].region_2depth_name;
            const dong = result[0].region_3depth_name;
            const guCode = result[0].code.slice(0, 5);
            setGu(gu);
            console.log(gu, dong, guCode);
            if (setAddress) {
              setAddress(gu + ' ' + dong);
            }
            setGuCode(guCode);
          } else {
            console.error('Geocoder failed due to: ' + status);
          }
        }
      );
    };
    getGu();

    // 다각형을 저장할 배열
    const guPolygons: kakao.maps.Polygon[] = [];
    const dongPolygons: kakao.maps.Polygon[] = [];

    // const overlayContent = document.createElement('div');
    // const overlay = new window.kakao.maps.CustomOverlay({
    //   position: new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)),
    //   content: overlayContent,
    //   clickable: true,
    // });

    // 구 다각형 생성
    const createGuPolygons = (geojson: any) => {
      geojson.features.forEach((feature: any) => {
        console.log(feature.properties.SIG_KOR_NM);
        const coordinates = feature.geometry.coordinates[0].map(
          (coord: any) => new kakao.maps.LatLng(coord[1], coord[0])
        );
        const polygon = new kakao.maps.Polygon({
          path: coordinates,
          strokeWeight: 2,
          strokeColor: '#39DE2A',
          strokeOpacity: 0.8,
          fillColor: '#A2FF99',
          fillOpacity: 0.7,
        });
        // hover 시 다각형 스타일 변경
        kakao.maps.event.addListener(polygon, 'mouseover', function () {
          polygon.setOptions({ fillColor: '#66ccff' });
        });
        kakao.maps.event.addListener(polygon, 'mouseout', function () {
          polygon.setOptions({ fillColor: '#A2FF99' });
        });
        guPolygons.push(polygon);
      });
    };

    // 동 다각형 생성
    const createDongPolygons = (geojson: any) => {
      geojson.features.forEach((feature: any) => {
        const coordinates = feature.geometry.coordinates[0].map(
          (coord: any) => new kakao.maps.LatLng(coord[1], coord[0])
        );
        const polygon = new kakao.maps.Polygon({
          path: coordinates,
          strokeWeight: 2,
          strokeColor: '#39DE2A',
          strokeOpacity: 0.8,
          fillColor: '#A2FF99',
          fillOpacity: 0.7,
        });
        // hover 시 다각형 스타일 변경
        kakao.maps.event.addListener(polygon, 'mouseover', function () {
          polygon.setOptions({ fillColor: '#66ccff' });
        });
        kakao.maps.event.addListener(polygon, 'mouseout', function () {
          polygon.setOptions({ fillColor: '#A2FF99' });
        });
        dongPolygons.push(polygon);
      });
    };

    // 구 표시
    const showGuPolygons = () => {
      guPolygons.forEach((polygon) => {
        polygon.setMap(mapInstance);
      });
    };

    // 구 숨기기
    const hideGuPolygons = () => {
      guPolygons.forEach((polygon) => {
        polygon.setMap(null);
      });
    };

    // 동 표시
    const showDongPolygons = () => {
      dongPolygons.forEach((polygon) => {
        polygon.setMap(mapInstance);
      });
    };

    // 동 숨기기
    const hideDongPolygons = () => {
      dongPolygons.forEach((polygon) => {
        polygon.setMap(null);
      });
    };

    // 줌 레벨 변경 이벤트 핸들러
    const onZoomChanged = () => {
      const level = mapInstance.getLevel();
      if (level <= 4) {
        hideGuPolygons();
        hideDongPolygons();
      } else if (level >= 5 && level <= 6) {
        hideGuPolygons();
        showDongPolygons();
      } else if (level >= 7) {
        hideDongPolygons();
        showGuPolygons();
      }
    };

    // GeoJSON 데이터를 이용하여 다각형 생성
    createGuPolygons(guData);
    createDongPolygons(dongData);

    // 초기 다각형 표시
    onZoomChanged();

    // 이벤트 리스너 등록
    kakao.maps.event.addListener(mapInstance, 'click', removeCovenientInfo);
    kakao.maps.event.addListener(mapInstance, 'idle', getGu);
    kakao.maps.event.addListener(mapInstance, 'zoom_changed', onZoomChanged);

    return () => {
      kakao.maps.event.removeListener(
        mapInstance,
        'click',
        removeCovenientInfo
      );
      kakao.maps.event.removeListener(mapInstance, 'idle', getGu);
      kakao.maps.event.removeListener(
        mapInstance,
        'zoom_changed',
        onZoomChanged
      );
    };
  });
};
