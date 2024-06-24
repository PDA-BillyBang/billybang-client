import { PropertyGroup, PropertyOption } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';
import { fetchPropertyGroups } from './fetchPropertyGroups';
import { moveToCurrentLocation } from './moveToCurrentLocation';

export const initializeMap = (
  setPropertyGroups: (properties: PropertyGroup[]) => void,
  setMap: (map: kakao.maps.Map | null) => void,
  setPs: (ps: kakao.maps.services.Places) => void,
  setIsDrawerOpen: Dispatch<SetStateAction<number>>,
  customOverlayRef : React.MutableRefObject<kakao.maps.CustomOverlay | null>,
  propertyOption : PropertyOption,
  setGu : React.Dispatch<React.SetStateAction<string>>,
  setGuCode : React.Dispatch<React.SetStateAction<string>>,
  setAddress : (title: string) => void,
) => {
  const container = document.getElementById('map');
  const options = {
    center: new window.kakao.maps.LatLng(37.5449, 127.0566), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
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
      geocoder.coord2RegionCode(center.getLng(), center.getLat(), (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const gu = result[0].region_2depth_name;
          const guCode = result[0].code.slice(0, 5);
          setGu(gu);
          setGuCode(guCode)
        } else {
          console.error('Geocoder failed due to: ' + status);
        }
      });
    }
    getGu();

    // 지도 이벤트 핸들링
    kakao.maps.event.addListener(mapInstance, 'click', removeCovenientInfo);
    kakao.maps.event.addListener(mapInstance, 'idle', getGu);

    return () => {
      kakao.maps.event.removeListener(
        mapInstance,
        'click',
        removeCovenientInfo
      );
      kakao.maps.event.removeListener(mapInstance, 'idle', getGu);
    };
  });
};
