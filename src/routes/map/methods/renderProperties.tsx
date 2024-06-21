import { createRoot } from "react-dom/client";
import Pin from "@/components/map/Pin";
import { Property, OverlayData } from "@/utils/types";

export const renderProperties = (
  map: kakao.maps.Map | null,
  properties: Property[],
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
        area={property.area1}
        price={property.price}
        count={property.count}
        propertyId={property.propertyId}
        handleClick={(id: number) => {
          setSelectedPropertyId(id);
        }}
        isSelected={selectedPropertyId === property.propertyId}
      />,
    );

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: position,
      content: container,
      yAnchor: 1,
    });

    customOverlay.setMap(map);

    overlayRef.current[property.propertyId] = { overlay: customOverlay, root };
  });

  return () => {
    Object.values(overlayRef.current).forEach(({ overlay }) => overlay.setMap(null));
  };
};
