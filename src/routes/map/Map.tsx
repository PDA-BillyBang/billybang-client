/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Aim from '@/assets/image/map/aim.png';
import { Property, OverlayData, CategoryCode } from '@/utils/types';
import { initializeMap } from './methods/initializeMap';
import { moveToCurrentLocation } from './methods/moveToCurrentLocation';
import { renderProperties } from './methods/renderProperties';
import { updateSelectedProperty } from './methods/updateSelectedProperty';
import BottomDrawer from '@components/common/button/BottomDrawer';
import SmallButton from '@components/common/button/SmallButton';
import mapStatistic from '../../assets/image/map/mapStatistic.svg';
import DropDown from '@components/map/Dropdown';
import PropertyLoan from '@components/map/PropertyLoan';
import { displayPlaces, removeMarkers } from "./methods/placeService";

export default function MapComponent() {
  const [mapInfo, setMapInfo] = useState<string>('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null
  );
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const overlayRef = useRef<{ [key: number]: OverlayData }>({});
  const previousSelectedPropertyIdRef = useRef<number | null>(null);
  const [ps, setPs] = useState<kakao.maps.services.Places | undefined>(
    undefined
  );
  const markers = useRef<kakao.maps.Marker[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"" | CategoryCode>("");
  const navigate = useNavigate();

  // 더미데이터, 지도, 지도정보, 지도컨트롤러, 편의시설 검색체 생성
  useEffect(() => {
    const cleanup = initializeMap(
      setProperties,
      setMap,
      setMapInfo,
      (psInstance) => {
        setPs(psInstance);
      }
    );
    return cleanup;
  }, []);

  // 현재 위치로 아이콘 생성
  useEffect(() => {
    const cleanup = moveToCurrentLocation(map);
    return cleanup;
  }, [map]);

  // 전체 매물 그리기
  useEffect(() => {
    const cleanup = renderProperties(
      map,
      properties,
      overlayRef,
      selectedPropertyId,
      setSelectedPropertyId
    );
    return cleanup;
  }, [map, properties]);

  // 매물 선택시 스타일 변경
  useEffect(() => {
    updateSelectedProperty(selectedPropertyId, previousSelectedPropertyIdRef, overlayRef, properties, setSelectedPropertyId);
    setIsDrawerOpen(selectedPropertyId !== null);
  }, [selectedPropertyId, map, properties]);
  
  // 편의시설 검색 함수
  const searchPlaces = useCallback(() => {
    if (!ps || !map || !selectedCategory) return;
    ps.categorySearch(selectedCategory, (data, status) => {
      if (status !== window.kakao.maps.services.Status.ERROR) {
        removeMarkers(markers);
        displayPlaces(map, data, selectedCategory, markers);
      } else {
        console.log("지도 검색 중 에러 발생")
      }
    }, { useMapBounds: true });
  }, [ps, map, selectedCategory]);

  // 지도 중심이나 줌 레벨이 변경될 때마다 편의시설 검색
  useEffect(() => {
    if (map) {
      kakao.maps.event.addListener(map, 'idle', searchPlaces);
    }
    return () => {
      if (map) {
        kakao.maps.event.removeListener(map, 'idle', searchPlaces);
      }
    };
  }, [map, searchPlaces]);

  // selectedCategory 변경 시 검색
  useEffect(() => {
    searchPlaces();
  }, [selectedCategory, searchPlaces]);

  // 편의시설 카테고리 선택/해제 핸들러
  const handleCategoryClick = (category: "" | CategoryCode) => {
    setSelectedCategory((prevCategory) => {
      if (prevCategory === category) {
        removeMarkers(markers);
        return "";
      }
      return category;
    });
  };
  
  // 하단 상세보기 창 닫기
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedPropertyId(null);
  };

  
  // 페이지 변경 버튼
  const onButtonClick = (link: string) => {
    navigate(link);
  };

  // 선택된 매물이 있는지 확인
  const selectedProperty = properties.find(
    (property) => property.propertyId === selectedPropertyId
  );
  
  return (
    <div className="pt-16 h-[100vh]">
      <div id="map" className="relative h-full w-full bg-grey-6 rounded-[5px]">
        <div className="absolute z-10 p-1 rounded top-4 left-4 bg-white-2">
          <img
            id="currentLocationImg"
            src={Aim}
            alt="현재 위치로 이동"
            className="w-8 h-8 cursor-pointer"
          />
        </div>
        {selectedProperty && (
          <BottomDrawer isOpen={isDrawerOpen} handleClose={handleCloseDrawer}>
            <PropertyLoan bottomButton={true} />
          </BottomDrawer>
        )}
        <div className="absolute z-10 bottom-4 right-4">
          <SmallButton
            icon={mapStatistic}
            text={'동대문구'}
            isActive={false}
            customWidth="min-w-20"
            onClick={() => onButtonClick('/statistics/1')}
          ></SmallButton>
        </div>
        <div className="absolute z-10 flex flex-col space-y-2 top-60 right-1 min-w-12">
          <DropDown
            text="편의"
            customWidth="w-18"
            handleCategoryClick={handleCategoryClick}
          />
        </div>
      </div>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          marginTop: '10px',
        }}
      >
        {mapInfo}
      </pre>
    </div>
  );
}
