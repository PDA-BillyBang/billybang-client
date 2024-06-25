import { createRoot } from "react-dom/client";
import { DistrictGroup, OverlayData } from "@/utils/types";
import DistrictPin from "@components/map/DistrictPin";

export const renderDistricts = (
  map: kakao.maps.Map | null,
  districts: DistrictGroup[],
  overlayRef: React.MutableRefObject<{ [key: number]: OverlayData }>,
) => {
  if (!map) return;
  districts.forEach((district) => {
    const position = new window.kakao.maps.LatLng(district.latitude, district.longitude);
    const container = document.createElement('div');
    const root = createRoot(container);
    root.render(
      <DistrictPin
        price={district.price}
        count={district.cnt}
        handleClick={() => {}}
        name = {district.name}
        latitude={district.latitude}
        longitude={district.longitude}
      />,
    );

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: position,
      content: container,
      clickable: true,
    });

    customOverlay.setMap(map);
    overlayRef.current[district.representativeId] = { overlay: customOverlay, root };
  });

  return () => {
    Object.values(overlayRef.current).forEach(({ overlay }) => overlay.setMap(null));
  };
};
