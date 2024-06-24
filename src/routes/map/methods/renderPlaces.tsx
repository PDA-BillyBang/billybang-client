import React from 'react';
import { createRoot } from 'react-dom/client';
import { CategoryCode } from "@/utils/types";
import store from "@/assets/image/map/store.png";
import hospital from "@/assets/image/map/hospital.png";
import bank from "@/assets/image/map/bank.png";
import school from "@/assets/image/map/school.png";
import cafe from "@/assets/image/map/cafe.png";
import ConvenientInfo from '@/components/map/ConvenientInfo';
import { ConvenientInfoProps } from '@/components/map/ConvenientInfo';

export const removeMarkers = (markers: React.MutableRefObject<kakao.maps.Marker[]>) => {
  markers.current.forEach((marker) => marker.setMap(null));
  markers.current = [];
};

// 아래 두 함수를 이용해서 지도에 마커 그리기
export const displayPlaces = (
  map: kakao.maps.Map | null,
  places: kakao.maps.services.PlacesSearchResultItem[],
  category: string,
  markers: React.MutableRefObject<kakao.maps.Marker[]>,
  customOverlayRef: React.MutableRefObject<kakao.maps.CustomOverlay | null>
) => {
  for (let i = 0; i < places.length; i++) {
    const marker = addMarker(map, new window.kakao.maps.LatLng(parseFloat(places[i].y), parseFloat(places[i].x)), category, markers);
    window.kakao.maps.event.addListener(marker, "click", () => {
      displayPlaceInfo(map, places[i], customOverlayRef);
    });
  }
};

// 지도에 마커 그리기
const addMarker = (
  map: kakao.maps.Map | null,
  position: kakao.maps.LatLng,
  category: string,
  markers: React.MutableRefObject<kakao.maps.Marker[]>
) => {
  const imageSrc = {
    CS2: store,
    HP8: hospital,
    BK9: bank,
    SC4: school,
    CE7: cafe,
  }[category as CategoryCode];
  const imageSize = new kakao.maps.Size(27, 28);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  const marker = new kakao.maps.Marker({ position, image: markerImage });

  if (map) {
    marker.setMap(map);
  }
  markers.current.push(marker);
  return marker;
};

// 클릭시 상세보기
const displayPlaceInfo = (
  map: kakao.maps.Map | null,
  place: kakao.maps.services.PlacesSearchResultItem,
  customOverlayRef: React.MutableRefObject<kakao.maps.CustomOverlay | null>
) => {
  if (customOverlayRef.current) {
    customOverlayRef.current.setMap(null);
  }

  const overlayContent = document.createElement('div');
  const overlay = new window.kakao.maps.CustomOverlay({
    position: new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x)),
    content: overlayContent,
    clickable: true,
  });

  customOverlayRef.current = overlay;

  if (map) {
    overlay.setMap(map);
  }

  const onClose = () => overlay.setMap(null);
  const props: ConvenientInfoProps = { place, onClose };

  const root = createRoot(overlayContent);
  root.render(<ConvenientInfo {...props} />);
};