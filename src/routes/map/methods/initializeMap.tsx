import { Property } from "@/utils/types";

export const initializeMap = (
  setProperties: (properties: Property[]) => void,
  setMap: (map: kakao.maps.Map | null) => void,
  setMapInfo: (info: string) => void,
  setPs: (ps: kakao.maps.services.Places) => void
) => {
  const dummyProperties: Property[] = [
    {
      propertyId: 1,
      articleName: "102동 305호",
      latitude: 37.54597011866081,
      longitude: 127.0576325066247,
      buildingName: "위례자이",
      realEstateType: "아파트",
      area1: 30,
      area2: 27,
      count: 5,
      price: 500,
    },
    {
      propertyId: 2,
      articleName: "103동 307호",
      latitude: 37.54697011866081,
      longitude: 127.0586325066247,
      buildingName: "위례자이",
      realEstateType: "아파트",
      area1: 28,
      area2: 25,
      count: 3,
      price: 850,
    },
    {
      propertyId: 3,
      articleName: "104동 309호",
      latitude: 37.547970118660814,
      longitude: 127.0596325066247,
      buildingName: "위례자이",
      realEstateType: "아파트",
      area1: 32,
      area2: 29,
      count: 1,
      price: 1100,
    }
  ];
  setProperties(dummyProperties);

  const container = document.getElementById('map');
  const options = {
    center: new window.kakao.maps.LatLng(37.5449, 127.0566), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };
  if (!container) {
    return;
  }
  kakao.maps.load(() => {
    const mapInstance = new kakao.maps.Map(container, options); // 지도를 생성
    setMap(mapInstance);

    const psInstance = new kakao.maps.services.Places(mapInstance);
    setPs(psInstance);

    const getInfo = () => {
      const center = mapInstance.getCenter();
      const level = mapInstance.getLevel();
      const bounds = mapInstance.getBounds();
      const swLatLng = bounds.getSouthWest();
      const neLatLng = bounds.getNorthEast();

      const latRange = swLatLng.getLat() + ' ~ ' + neLatLng.getLat();
      const lngRange = swLatLng.getLng() + ' ~ ' + neLatLng.getLng();

      let message = '지도 중심좌표는 위도 ' + center.getLat() + ', \n';
      message += '경도 ' + center.getLng() + ' 이고 \n';
      message += '지도 레벨은 ' + level + ' 입니다 \n\n';
      message += '위도의 범위는 ' + latRange + ' 이고 \n';
      message += '경도의 범위는 ' + lngRange + ' 입니다';

      setMapInfo(message);
    };

    mapInstance.addControl(new window.kakao.maps.ZoomControl(), window.kakao.maps.ControlPosition.RIGHT);
    mapInstance.addControl(new window.kakao.maps.MapTypeControl(), window.kakao.maps.ControlPosition.TOPRIGHT);
    getInfo();

    window.kakao.maps.event.addListener(mapInstance, 'center_changed', getInfo);
    window.kakao.maps.event.addListener(mapInstance, 'zoom_changed', getInfo);

    return () => {
      window.kakao.maps.event.removeListener(mapInstance, 'center_changed', getInfo);
      window.kakao.maps.event.removeListener(mapInstance, 'zoom_changed', getInfo);
    };
  });
};