/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Aim from '@/assets/image/map/aim.png';
import { PropertyGroup, Property, OverlayData, CategoryCode } from '@/utils/types';
import { initializeMap } from './methods/initializeMap';
import { renderProperties } from './methods/renderProperties';
import { updateSelectedProperty } from './methods/updateSelectedProperty';
import BottomDrawer from '@components/common/button/BottomDrawer';
import SmallButton from '@components/common/button/SmallButton';
import mapStatistic from '../../assets/image/map/mapStatistic.svg';
import DropDown from '@components/map/Dropdown';
import { displayPlaces, removeMarkers } from "./methods/placeService";
import OptionButton from "@components/map/OptionButton";
import OptionContent from "@components/map/OptionContent";
import GetViewportSize from "@/utils/hooks/GetViewportSize";
import MapPropertyLoan from '../../components/map/MapPropertyLoan';
import { getDetailedProperties } from './methods/fetchPropertyDetail';

export default function MapComponent() {
  const [propertyGroups, setPropertyGroups] = useState<PropertyGroup[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<number>(0); // 0: 닫힘 1: 옵션 2: 매물
  const [ps, setPs] = useState<kakao.maps.services.Places | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<"" | CategoryCode>("");
  const overlayRef = useRef<{ [key: number]: OverlayData }>({});
  const previousSelectedPropertyIdRef = useRef<number | null>(null);
  const markers = useRef<kakao.maps.Marker[]>([]);
  const customOverlayRef = useRef<kakao.maps.CustomOverlay | null>(null);
  const viewportSize = GetViewportSize();
  const navigate = useNavigate();

  // 지도 생성시에만, 총 1회 실행되는 코드들을 initializeMap에 담았음
  useEffect(() => {
    const cleanup = initializeMap(
      setPropertyGroups,
      setMap,
      (psInstance) => {
        setPs(psInstance);
      },
      setIsDrawerOpen,
      customOverlayRef
    );
    return cleanup;
  }, []);

  // 매물 업데이트시 그리기
  useEffect(() => {
    const cleanup = renderProperties(
      map,
      propertyGroups,
      overlayRef,
      selectedPropertyId,
      setSelectedPropertyId
    );
    return cleanup;
  }, [propertyGroups, map]);

  // 매물 그룹 선택시 (스타일 변경, 자세한 매물 데이터 가져오기)
  useEffect(() => {
    if (selectedPropertyId !== null) {
      const selectedGroup = propertyGroups.find(group => group.representativeId === selectedPropertyId);
      if (selectedGroup) {
        getDetailedProperties(selectedGroup, setProperties);
      }
    } else {
      setProperties([]);
    }
    updateSelectedProperty(
      selectedPropertyId,
      previousSelectedPropertyIdRef,
      overlayRef,
      propertyGroups,
      setSelectedPropertyId
    );
    setIsDrawerOpen(selectedPropertyId !== null ? 2 : 0);
  }, [selectedPropertyId, map]);

  // 카테고리 선택시 편의시설 검색
  const searchPlaces = useCallback(() => {
    if (!ps || !map || !selectedCategory) return;
    ps.categorySearch(selectedCategory, (data, status) => {
      if (status !== window.kakao.maps.services.Status.ERROR) {
        removeMarkers(markers);
        displayPlaces(map, data, selectedCategory, markers, customOverlayRef);
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
  const handleCategoryClick = (category: '' | CategoryCode) => {
    setSelectedCategory((prevCategory) => {
      if (prevCategory === category) {
        removeMarkers(markers);
        return '';
      }
      return category;
    });
  };

  // 하단 상세보기 창 닫기
  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(0);
    setSelectedPropertyId(null);
  }, [])

  // 페이지 변경 버튼
  const onButtonClick = useCallback((link: string) => {
    navigate(link);
  }, [navigate]);

  const drawerPosition = viewportSize.width >= 768 ? 'left' : 'bottom';
  console.log(properties)
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
        <BottomDrawer isOpen={isDrawerOpen!==0} handleClose={handleCloseDrawer} isBackDropped={false} position={drawerPosition} >
          {isDrawerOpen===2 && <MapPropertyLoan />}
          {isDrawerOpen===1 && <OptionContent onApplyButtonClick={handleCloseDrawer}/>}
        </BottomDrawer>
        <div className="absolute z-10 top-4 left-16">
          <OptionButton
            text={'옵션'}
            isActive={isDrawerOpen === 1}
            customWidth="min-w-16"
            onClick={() => setIsDrawerOpen(1)}
          ></OptionButton>
        </div>
        <div className="absolute z-10 flex flex-col space-y-2 top-60 right-1 min-w-12">
          <DropDown
            text="편의"
            customWidth="w-18"
            handleCategoryClick={handleCategoryClick}
          />
        </div>
        <div
          className="absolute z-10 bottom-4 right-4"
          onClick={() => onButtonClick('/statistics/1')}
        >
          <SmallButton
            icon={mapStatistic}
            text={'동대문구'}
            isActive={false}
            customWidth="min-w-20"
          ></SmallButton>
        </div>
      </div>
    </div>
  );
}
