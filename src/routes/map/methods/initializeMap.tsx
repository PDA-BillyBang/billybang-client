import { Property } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";

export const initializeMap = (
  setProperties: (properties: Property[]) => void,
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
    const mapInstance = new kakao.maps.Map(container, options); // 지도를 생성
    setMap(mapInstance);

    const psInstance = new kakao.maps.services.Places(mapInstance);
    setPs(psInstance);

    const closeDrawer = () => {
        setIsDrawerOpen(0);
    };
    
    const removeCovenientInfo = () => {
        if (customOverlayRef){
          customOverlayRef.current?.setMap(null)
        }
    };

    mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
    mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);

    // 여기서 매물 요청보내기
    // kakao.maps.event.addListener(mapInstance, 'center_changed', );
    // kakao.maps.event.addListener(mapInstance, 'zoom_changed', );
    kakao.maps.event.addListener(mapInstance, 'click', closeDrawer)
    kakao.maps.event.addListener(mapInstance, 'click', removeCovenientInfo)

    return () => {
      // kakao.maps.event.removeListener(mapInstance, 'center_changed', );
      // kakao.maps.event.removeListener(mapInstance, 'zoom_changed', );
      kakao.maps.event.removeListener(mapInstance, 'click', closeDrawer)
      kakao.maps.event.removeListener(mapInstance, 'click', removeCovenientInfo)
    };
  });
};