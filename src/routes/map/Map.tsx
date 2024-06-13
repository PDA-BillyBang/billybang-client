import Pin from "../../components/map/Pin";
import React, { useEffect, useState, useRef } from "react";
import Aim from '../../assets/image/icons/aim.png';
import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";

type Property = {
  propertyId: number;
  articleName: string;
  latitude: number;
  longitude: number;
  buildingName: string;
  realEstateType: string;
  area1: number;
  area2: number;
  count: number;
  price: number;
};

export default function MapComponent() {
  const [mapInfo, setMapInfo] = useState<string>('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [map, setMap] = useState<any>(null);
  const overlayRef = useRef<{ [key: number]: any }>({});

  useEffect(() => {
    const dummyProperties: Property[] = [
      {
        propertyId: 1,
        articleName: "102동 305호",
        latitude: 37.54597011866081,
        longitude: 127.0576325066247,
        buildingName: "위례자이",
        realEstateType: "아파트",
        area1: 30,
        area2: 27,
        count: 5,
        price: 500,
      },
      {
        propertyId: 2,
        articleName: "103동 307호",
        latitude: 37.54697011866081,
        longitude: 127.0586325066247,
        buildingName: "위례자이",
        realEstateType: "아파트",
        area1: 28,
        area2: 25,
        count: 3,
        price: 850,
      },
      {
        propertyId: 3,
        articleName: "104동 309호",
        latitude: 37.547970118660814,
        longitude: 127.0596325066247,
        buildingName: "위례자이",
        realEstateType: "아파트",
        area1: 32,
        area2: 29,
        count: 1,
        price: 1100,
      },
      {
        propertyId: 4,
        articleName: "104동 309호",
        latitude: 37.53992802945424,
        longitude: 127.05142662693137,
        buildingName: "위례자이",
        realEstateType: "아파트",
        area1: 32,
        area2: 29,
        count: 1,
        price: 1100,
      },
    ];

    setProperties(dummyProperties);

    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.53992802945424, 127.05142662693137),
      // center: new window.kakao.maps.LatLng(37.5449, 127.0566), // 지도의 중심좌표
      level: 1, // 지도의 확대 레벨
    };
    const mapInstance = new window.kakao.maps.Map(container, options); // 지도를 생성
    setMap(mapInstance);

    const getInfo = () => {
      const center = mapInstance.getCenter();
      const level = mapInstance.getLevel();
      const bounds = mapInstance.getBounds();
      const swLatLng = bounds.getSouthWest();
      const neLatLng = bounds.getNorthEast();

      const latRange = swLatLng.getLat() + ' ~ ' + neLatLng.getLat();
      const lngRange = swLatLng.getLng() + ' ~ ' + neLatLng.getLng();

      let message = '지도 중심좌표는 위도 ' + center.getLat() + ', \n';
      message += '경도 ' + center.getLng() + ' 이고 \n';
      message += '지도 레벨은 ' + level + ' 입니다 \n\n';
      message += '위도의 범위는 ' + latRange + ' 이고 \n';
      message += '경도의 범위는 ' + lngRange + ' 입니다';

      setMapInfo(message);
    };

    mapInstance.addControl(new window.kakao.maps.ZoomControl(), window.kakao.maps.ControlPosition.RIGHT);
    mapInstance.addControl(new window.kakao.maps.MapTypeControl(), window.kakao.maps.ControlPosition.TOPRIGHT);
    getInfo();

    window.kakao.maps.event.addListener(mapInstance, 'center_changed', getInfo);
    window.kakao.maps.event.addListener(mapInstance, 'zoom_changed', getInfo);

    return () => {
      window.kakao.maps.event.removeListener(mapInstance, 'center_changed', getInfo);
      window.kakao.maps.event.removeListener(mapInstance, 'zoom_changed', getInfo);
    };
  }, []);

  useEffect(() => {
    if (!map) return;
    
    const moveToCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);

          map.panTo(locPosition);
        });
      }
    };

    document.getElementById('currentLocationImg')?.addEventListener('click', moveToCurrentLocation);

    properties.forEach((property) => {
      const position = new window.kakao.maps.LatLng(property.latitude, property.longitude);
      const container = document.createElement('div');
      const root = createRoot(container); 
      root.render(
        <Pin
          area={property.area1}
          price={property.price}
          count={property.count}
          propertyId={property.propertyId}
          handleClick={(id: number) => {
            setSelectedPropertyId(id);
          }}
          isSelected={selectedPropertyId === property.propertyId}
        />,
      );

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: container,
        yAnchor: 1,
      });

      customOverlay.setMap(map);

      // 오버레이를 추적하여 이후에 제거할 수 있도록 함
      overlayRef.current[property.propertyId] = customOverlay;
    });

    return () => {
      document.getElementById('currentLocationImg')?.removeEventListener('click', moveToCurrentLocation);
      // 기존 오버레이들을 모두 제거
      Object.values(overlayRef.current).forEach((overlay) => overlay.setMap(null));
    
    };
  }, [map, properties, selectedPropertyId]);

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
