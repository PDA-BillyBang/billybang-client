import React from 'react';
import { createRoot } from 'react-dom/client';
import { CategoryCode } from "@/utils/types";
import store from "@/assets/image/map/store.png";
import hospital from "@/assets/image/map/hospital.png";
import bank from "@/assets/image/map/bank.png";
import school from "@/assets/image/map/school.png";
import cafe from "@/assets/image/map/cafe.png";
import CustomOverlay from '@/components/map/ConvenientInfo';
import { CustomOverlayProps } from '@/components/map/ConvenientInfo';

export const removeMarkers = (markers: React.MutableRefObject<kakao.maps.Marker[]>) => {
  markers.current.forEach((marker) => marker.setMap(null));
  markers.current = [];
};

export const displayPlaces = (
  map: kakao.maps.Map | null,
  places: any[],
  category: string,
  markers: React.MutableRefObject<kakao.maps.Marker[]>
) => {
  for (let i = 0; i < places.length; i++) {
    const marker = addMarker(map, new window.kakao.maps.LatLng(places[i].y, places[i].x), category, markers);
    window.kakao.maps.event.addListener(marker, "click", () => {
      displayPlaceInfo(map, places[i], marker);
    });
  }
};

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

const displayPlaceInfo = (map: kakao.maps.Map | null, place: any, marker: kakao.maps.Marker) => {
  const overlayContent = document.createElement('div');
  const overlay = new window.kakao.maps.CustomOverlay({
    position: new window.kakao.maps.LatLng(place.y, place.x),
    content: overlayContent,
  });

  if (map) {
    overlay.setMap(map);
  }

  const onClose = () => overlay.setMap(null);
  const props: CustomOverlayProps = { place, onClose };

  const root = createRoot(overlayContent);
  root.render(<CustomOverlay {...props} />);
};
