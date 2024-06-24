import { CategoryCode } from "@/utils/types";
import { removeMarkers, displayPlaces } from "./renderPlaces";

import React from 'react'

export const searchPlaces = (
  ps: kakao.maps.services.Places,
  map: kakao.maps.Map | null,
  selectedCategory: "" | CategoryCode,
  markers: React.MutableRefObject<kakao.maps.Marker[]>,
  customOverlayRef: React.MutableRefObject<kakao.maps.CustomOverlay | null>
) => {
  ps.categorySearch(selectedCategory, (data, status) => {
    if (status !== window.kakao.maps.services.Status.ERROR) {
      removeMarkers(markers);
      displayPlaces(map, data, selectedCategory, markers, customOverlayRef);
    } else {
      console.log("지도 검색 중 에러 발생");
    }
  }, { useMapBounds: true });
};
