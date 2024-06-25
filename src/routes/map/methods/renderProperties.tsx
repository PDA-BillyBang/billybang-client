import { createRoot } from "react-dom/client";
import Pin from "@/components/map/Pin";
import { OverlayData, PropertyGroup } from "@/utils/types";
import DistrictPin from "@components/map/DistrictPin";

export const renderProperties = (
  map: kakao.maps.Map | null,
  properties: PropertyGroup[],
  overlayRef: React.MutableRefObject<{ [key: number]: OverlayData }>,
  selectedPropertyId: number | null,
  setSelectedPropertyId: (id: number) => void
) => {
  if (!map) return;
  
  // 클릭 시 지도 중심과 줌 레벨 변경
  const goToGu = (latitude: number, longitude: number) => {
    const center = new kakao.maps.LatLng(latitude, longitude);
    map.setLevel(6,{animate:true, anchor: center});
    // map.setCenter(center);
  }

  // Zoom 레벨에 따라 Pin 또는 DistrictPin 표시
  const level = map.getLevel();
  if (level <= 5) {
    // Zoom 레벨이 5 이하일 때 Pin 표시
    properties.forEach((property) => {
      const position = new window.kakao.maps.LatLng(property.latitude, property.longitude);
      const container = document.createElement('div');
      const root = createRoot(container);
      root.render(
        <Pin
          area={property.area}
          price={property.price}
          count={property.cnt}
          propertyId={property.representativeId}
          handleClick={(id: number) => setSelectedPropertyId(id)}
          isSelected={selectedPropertyId === property.representativeId}
        />,
      );

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: container,
        clickable: true,
      });

      customOverlay.setMap(map);
      overlayRef.current[property.representativeId] = { overlay: customOverlay, root };
    });
  } else {
    // Zoom 레벨이 6 이상일 때 DistrictPin 표시
    properties.forEach((property) => {
      const position = new window.kakao.maps.LatLng(property.latitude, property.longitude);
      const container = document.createElement('div');
      const root = createRoot(container);
      root.render(
        <DistrictPin
          price={property.price}
          count={property.cnt}
          handleClick={goToGu}
          name={property.name}
          latitude={property.latitude}
          longitude={property.longitude}
          isGu={level>=8}
        />,
      );

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: container,
        clickable: true,
      });

      customOverlay.setMap(map);
      overlayRef.current[property.representativeId] = { overlay: customOverlay, root };
    });
  }

  return () => {
    Object.values(overlayRef.current).forEach(({ overlay }) => overlay.setMap(null));
  };
};
