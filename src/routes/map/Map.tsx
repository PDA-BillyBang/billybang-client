/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Aim from '@/assets/image/map/aim.png';
import {  PropertyGroup, Property, OverlayData, initialPropertyOption, PropertyOption, CategoryCode } from '@/utils/types';
import { initializeMap } from './methods/initializeMap';
import { renderProperties } from './methods/renderProperties';
import { updateSelectedProperty } from './methods/updateSelectedProperty';
import BottomDrawer from '@components/common/button/BottomDrawer';
import SmallButton from '@components/common/button/SmallButton';
import mapStatistic from '../../assets/image/map/mapStatistic.svg';
import DropDown from '@components/map/Dropdown';
import { removeMarkers } from './methods/renderPlaces';
import OptionButton from '@components/map/OptionButton';
import OptionContent from '@components/map/OptionContent';
import GetViewportSize from '@/utils/hooks/GetViewportSize';
import MapPropertyLoan from '../../components/map/MapPropertyLoan';
import { fetchPropertyDetail } from './methods/fetchPropertyDetail';
import { searchPlaces } from './methods/searchPlaces';
import { fetchPropertyGroups } from './methods/fetchPropertyGroups';
import { debounce } from 'lodash';

export default function Map() {
  const [propertyGroups, setPropertyGroups] = useState<PropertyGroup[]>([]); // 매물 묶음 데이터
  const [properties, setProperties] = useState<Property[]>([]); // 매물 상세 데이터들
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<number>(0); // 0: 닫힘 1: 옵션 2: 매물
  const [ps, setPs] = useState<kakao.maps.services.Places | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<'' | CategoryCode>(''); // 편의시설 카테고리
  const [propertyOption, setPropertyOption] = useState<PropertyOption>(initialPropertyOption);
  const [tempPropertyOption, setTempPropertyOption] = useState<PropertyOption>(initialPropertyOption);
  const [gu, setGu] = useState<string>('');
  const [guCode, setGuCode] = useState<string>('');
  const overlayRef = useRef<{ [key: number]: OverlayData }>({}); // 매물 그룹들의 컴포넌트
  const previousSelectedPropertyIdRef = useRef<number | null>(null); // 직전에 선택한 매물그룹의 propertyId
  const markers = useRef<kakao.maps.Marker[]>([]); // 편의시설을 나타낼 marker
  const customOverlayRef = useRef<kakao.maps.CustomOverlay | null>(null); // 편의시설 상세정보 UI
  const infoWindowRef = useRef<kakao.maps.InfoWindow | null>(null); // 구 정보 창
  const viewportSize = GetViewportSize(); // viewport 변경 감지
  const navigate = useNavigate();
  const location = useLocation();
  const { lat, lon, level } = location.state || { lat: 37.563915912, lon: 126.99772498493, level: 9 };
  const { setAddress } = useOutletContext<{setAddress: (title: string) => void;}>();

  // 지도 생성시에만, 총 1회 실행되는 코드들을 initializeMap에 담았음
  useEffect(() => {
    const cleanup = initializeMap(
      setPropertyGroups,
      setMap,
      (psInstance) => {
        setPs(psInstance);
      },
      setIsDrawerOpen,
      customOverlayRef,
      propertyOption,
      setGu,
      setGuCode,
      setAddress,
      lat,
      lon,
      level,
      infoWindowRef
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
      const selectedGroup = propertyGroups.find(
        (group) => group.representativeId === selectedPropertyId
      );
      if (selectedGroup) {
        fetchPropertyDetail(selectedGroup, setProperties, propertyOption);
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

  // 편의시설 카테고리 변경시 검색
  useEffect(() => {
    if (!ps || !map || !selectedCategory) return;
    if (customOverlayRef) customOverlayRef.current?.setMap(null);
    const triggerSearchPlaces = () => {
      searchPlaces(ps, map, selectedCategory, markers, customOverlayRef);
    };
    triggerSearchPlaces();
    kakao.maps.event.addListener(map, 'idle', triggerSearchPlaces);
    return () => {
      kakao.maps.event.removeListener(map, 'idle', triggerSearchPlaces);
    };
  }, [selectedCategory, map, ps]);

  // 검색옵션 변경시 매물 또는 지역 정보 다시 가져오기
  useEffect(() => {
    if (!map) return;
    const handleFetchPropertyGroups = debounce(() => {
      fetchPropertyGroups(map, setPropertyGroups, propertyOption);
    }, 500, { maxWait: 500, trailing: true });

    handleFetchPropertyGroups();
    kakao.maps.event.addListener(map, 'idle', handleFetchPropertyGroups);
    return () => {
      kakao.maps.event.removeListener(map, 'idle', handleFetchPropertyGroups);
      handleFetchPropertyGroups.cancel(); // 컴포넌트 언마운트 시 디바운스 취소
    };
  }, [propertyOption, map]);

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
  }, []);

  // 페이지 변경 버튼
  const onButtonClick = useCallback(
    (link: string) => {
      navigate(link);
    },
    [navigate]
  );

  const drawerPosition = viewportSize.width >= 768 ? 'left' : 'bottom';
  return (
    <div className="pt-16 h-[100vh]">
      <div id="map" className="relative h-full w-full bg-grey-6 rounded-[5px]">
        <div className="absolute z-10 p-1 rounded-full top-3.5 left-3.5 bg-white-2 select-none">
          <img
            id="currentLocationImg"
            src={Aim}
            alt="현재 위치로 이동"
            className="cursor-pointer w-7 h-7"
          />
        </div>

        <BottomDrawer
          isOpen={isDrawerOpen !== 0}
          handleClose={handleCloseDrawer}
          isBackDropped={false}
          position={drawerPosition}
        >
          {isDrawerOpen === 2 && <MapPropertyLoan properties={properties} />}
          {isDrawerOpen === 1 && (
            <OptionContent
              propertyOption={propertyOption}
              setPropertyOption={setPropertyOption}
              tempPropertyOption={tempPropertyOption}
              setTempPropertyOption={setTempPropertyOption}
              closeDrawer={() => setIsDrawerOpen(0)}
            />
          )}
        </BottomDrawer>
        <div className="absolute z-10 top-4 left-16">
          <OptionButton
            text={'옵션'}
            isActive={isDrawerOpen === 1}
            customWidth="min-w-16"
            onClick={() => setIsDrawerOpen(isDrawerOpen === 1 ? 0 : 1)}
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
          onClick={() => onButtonClick(`/statistics/${guCode}`)}
        >
          <SmallButton
            icon={mapStatistic}
            text={gu}
            isActive={false}
            customWidth="min-w-20"
          ></SmallButton>
        </div>
      </div>
    </div>
  );
}
