import React, { useEffect, useState, useRef } from "react";
import Aim from '@/assets/image/icons/aim.png';
import { Property, OverlayData } from "@/utils/types";
import { initializeMap } from "./methods/initializeMap";
import { moveToCurrentLocation } from "./methods/moveToCurrentLocation";
import { renderProperties } from "./methods/renderProperties";
import { updateSelectedProperty } from "./methods/updateSelectedProperty";


export default function MapComponent() {
  const [mapInfo, setMapInfo] = useState<string>('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [map, setMap] = useState<kakao.maps.Map|null>(null);
  const overlayRef = useRef<{ [key: number]: OverlayData }>({});
  const previousSelectedPropertyIdRef = useRef<number | null>(null);

  // 더미데이터, 지도, 지도정보, 지도컨트롤러 생성
  useEffect(() => {
    const cleanup = initializeMap(setProperties, setMap, setMapInfo);
    return cleanup;
  }, []);

  // 현재 위치로 아이콘 생성
  useEffect(() => {
    const cleanup = moveToCurrentLocation(map);
    return cleanup;
  }, [map]);

  // 전체 매물 그리기
  useEffect(() => {
    const cleanup = renderProperties(map, properties, overlayRef, selectedPropertyId, setSelectedPropertyId);
    return cleanup;
  }, [map, properties]);

  // 매물 선택시 스타일 변경
  useEffect(() => {
    updateSelectedProperty(
      selectedPropertyId,
      previousSelectedPropertyIdRef,
      overlayRef,
      properties,
      setSelectedPropertyId
    );
  }, [selectedPropertyId, map, properties]);


  return (
    <div className="pt-16 h-[100vh]">
      <div id="map" className="relative h-full w-full bg-grey-6 rounded-[5px]">
        <div className="absolute top-4 left-4 z-10 p-1 bg-white-2 rounded">
          <img
            id="currentLocationImg"
            src={Aim}
            alt="현재 위치로 이동"
            className="w-8 h-8 cursor-pointer"
          />
        </div>
      </div>
      {selectedPropertyId}
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginTop: '10px' }}>
        {mapInfo}
      </pre>
    </div>
  );
}
