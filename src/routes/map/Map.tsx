import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Aim from '@/assets/image/icons/aim.png';
import { Property, OverlayData } from "@/utils/types";
import { initializeMap } from "./methods/initializeMap";
import { moveToCurrentLocation } from "./methods/moveToCurrentLocation";
import { renderProperties } from "./methods/renderProperties";
import { updateSelectedProperty } from "./methods/updateSelectedProperty";
import BottomDrawer from "@components/common/button/BottomDrawer";
import SmallButton from "@components/common/button/SmallButton";
import LargeButton from "@components/common/button/LargeButton";
import mapStatistic from "../../assets/image/icons/mapStatistic.svg";

export default function MapComponent() {
  const [mapInfo, setMapInfo] = useState<string>('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [map, setMap] = useState<kakao.maps.Map|null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const overlayRef = useRef<{ [key: number]: OverlayData }>({});
  const previousSelectedPropertyIdRef = useRef<number | null>(null);
  const navigate = useNavigate();

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
    if (selectedPropertyId !== null) {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
    }
  }, [selectedPropertyId, map, properties]);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedPropertyId(null);
  };

  const selectedProperty = properties.find(property => property.propertyId === selectedPropertyId);

  const onButtonClick = (link: string) => {
    navigate(link);
  };

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
        {selectedProperty && (
          <BottomDrawer isOpen={isDrawerOpen} handleClose={handleCloseDrawer}>
            <div className="mx-auto w-customWidthPercent h-full flex flex-col items-center">
              <div className="w-full text-start">
                <div className="text-lg">{selectedProperty.articleName}</div>
                <div>{selectedProperty.price/100}억원</div>
              </div>
              <div className="mt-auto w-full flex flex-col items-center mb-4">
                <LargeButton text="더 많은 대출 상품 보러가기" customWidth="w-full" isActive={0} handleClick={()=>onButtonClick('/loan/recommend/1')} />
              </div>
            </div>
          </BottomDrawer>
        )}
        <div className="absolute bottom-4 right-4 z-10">
          <SmallButton icon={mapStatistic} text={"동대문구"} isActive={false} customWidth="minw-20" onClick={()=>onButtonClick('/statistics/1')}></SmallButton>
        </div>
      </div>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginTop: '10px' }}>
        {mapInfo}
      </pre>
    </div>
  );
}
