import { createRoot } from "react-dom/client";
import Pin from "@/components/map/Pin";
import { OverlayData, PropertyGroup } from "@/utils/types";

export const renderProperties = (
  map: kakao.maps.Map | null,
  properties: PropertyGroup[],
  overlayRef: React.MutableRefObject<{ [key: number]: OverlayData }>,
  selectedPropertyId: number | null,
  setSelectedPropertyId: (id: number) => void
) => {
  if (!map) return;

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
        handleClick={(id: number) => {
          setSelectedPropertyId(id);
        }}
        isSelected={selectedPropertyId === property.representativeId}
      />,
    );

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: position,
      content: container,
      yAnchor: 1,
    });

    customOverlay.setMap(map);

    overlayRef.current[property.representativeId] = { overlay: customOverlay, root };
  });

  return () => {
    Object.values(overlayRef.current).forEach(({ overlay }) => overlay.setMap(null));
  };
};
