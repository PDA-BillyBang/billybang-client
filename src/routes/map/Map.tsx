import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Aim from '@/assets/image/map/aim.png';
import { Property, OverlayData, CategoryCode } from "@/utils/types";
import { initializeMap } from "./methods/initializeMap";
import { moveToCurrentLocation } from "./methods/moveToCurrentLocation";
import { renderProperties } from "./methods/renderProperties";
import { updateSelectedProperty } from "./methods/updateSelectedProperty";
import BottomDrawer from "@components/common/button/BottomDrawer";
import SmallButton from "@components/common/button/SmallButton";
import LargeButton from "@components/common/button/LargeButton";
import mapStatistic from "../../assets/image/map/mapStatistic.svg";
import DropDown from "@components/map/Dropdown";
import store from "@/assets/image/map/store.png";
import hospital from "@/assets/image/map/hospital.png";
import bank from "@/assets/image/map/bank.png";
import school from "@/assets/image/map/school.png";
import cafe from "@/assets/image/map/cafe.png";

export default function MapComponent() {
  const [mapInfo, setMapInfo] = useState<string>('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [map, setMap] = useState<kakao.maps.Map|null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const overlayRef = useRef<{ [key: number]: OverlayData }>({});
  const previousSelectedPropertyIdRef = useRef<number | null>(null);
  const [ps, setPs] = useState<kakao.maps.services.Places | undefined>(undefined);
  const markers = useRef<kakao.maps.Marker[]>([]);
  const navigate = useNavigate();

  // 더미데이터, 지도, 지도정보, 지도컨트롤러, 편의시설 검색체 생성
  useEffect(() => {
    const cleanup = initializeMap(setProperties, setMap, setMapInfo, (psInstance) => {
      setPs(psInstance)
    });
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

  const handleCategoryClick = (category: "" | CategoryCode) => {
    console.log(category)
    console.log(ps)
    if (!ps) return;
    ps.categorySearch(category, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        removeMarkers();
        displayPlaces(data, category);
      }
    }, { useMapBounds: true });
  };

  // 편의시설 마커 생성
  const displayPlaces = (places: any[], category: string) => {
    for (let i = 0; i < places.length; i++) {
      const marker = addMarker(new window.kakao.maps.LatLng(places[i].y, places[i].x), category);
      window.kakao.maps.event.addListener(marker, 'click', () => {
        displayPlaceInfo(places[i]);
      });
    }
  };
  
  // 생성된 마커를 지도에 삽입
  const addMarker = (position: kakao.maps.LatLng, category: string) => {
    const imageSrc = {
      CS2: store,
      HP8: hospital,
      BK9: bank,
      SC4: school,
      CE7: cafe
    }[category as CategoryCode];
    const imageSize = new kakao.maps.Size(27, 28);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const marker = new kakao.maps.Marker({ position, image: markerImage });

    marker.setMap(map);
    markers.current.push(marker);
    return marker;
  };

  const removeMarkers = () => {
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];
  };

  const displayPlaceInfo = (place: any) => {
    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;z-index:1;">${place.place_name}</div>`
    });
    infowindow.open(map, markers.current);
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
                <div className="text-xl font-bold">{selectedProperty.articleName}</div>
                <div className="text-md">{selectedProperty.price/100}억원</div>
              </div>
              <div className="mt-auto w-full flex flex-col items-center mb-4">
                <LargeButton text="더 많은 대출 상품 보러가기" customWidth="w-full" isActive={0} handleClick={()=>onButtonClick('/loan/recommend/1')} />
              </div>
            </div>
          </BottomDrawer>
        )}
        <div className="absolute bottom-4 right-4 z-10">
          <SmallButton icon={mapStatistic} text={"동대문구"} isActive={false} customWidth="min-w-20" onClick={()=>onButtonClick('/statistics/1')}></SmallButton>
        </div>
        <div className="absolute top-60 right-1 z-10 flex flex-col space-y-2 min-w-12">
          <DropDown text="편의" customWidth="w-18" handleCategoryClick={handleCategoryClick} />
        </div>
      </div>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginTop: '10px' }}>
        {mapInfo}
      </pre>
    </div>
  );
}
