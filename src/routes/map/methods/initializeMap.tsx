import { PropertyGroup } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";
import { fetchPropertyGroups } from "./fetchPropertyGroups";
import { moveToCurrentLocation } from "./moveToCurrentLocation";

export const initializeMap = (
  setPropertyGroups: (properties: PropertyGroup[]) => void,
  setMap: (map: kakao.maps.Map | null) => void,
  setPs: (ps: kakao.maps.services.Places) => void,
  setIsDrawerOpen: Dispatch<SetStateAction<number>>,
  customOverlayRef : React.MutableRefObject<kakao.maps.CustomOverlay | null>
) => {
  const container = document.getElementById('map');
  const options = {
    center: new window.kakao.maps.LatLng(37.5449, 127.0566), // 지도의 중심좌표
    level: 2, // 지도의 확대 레벨
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

    const closeDrawer = () => {
        setIsDrawerOpen(0);
    };
    
    // 편의시설 상세정보 지우기
    const removeCovenientInfo = () => {
        if (customOverlayRef){
          customOverlayRef.current?.setMap(null)
        }
    };

    // 매물 가져오기
    const handleFetchPropertyGroup = () => {
      fetchPropertyGroups(mapInstance, setPropertyGroups);
    }

    // 현재 위치로 아이콘 부착
    moveToCurrentLocation(mapInstance)

    // 줌, 항공뷰 컨트롤러 부착
    mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
    mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 이벤트 핸들링
    kakao.maps.event.addListener(mapInstance, 'idle', handleFetchPropertyGroup);
    kakao.maps.event.addListener(mapInstance, 'zoom_changed', handleFetchPropertyGroup);
    kakao.maps.event.addListener(mapInstance, 'click', closeDrawer)
    kakao.maps.event.addListener(mapInstance, 'click', removeCovenientInfo)

    return () => {
      kakao.maps.event.removeListener(mapInstance, 'idle', handleFetchPropertyGroup);
      kakao.maps.event.removeListener(mapInstance, 'zoom_changed', handleFetchPropertyGroup);
      kakao.maps.event.removeListener(mapInstance, 'click', closeDrawer)
      kakao.maps.event.removeListener(mapInstance, 'click', removeCovenientInfo)
    };
  });
};