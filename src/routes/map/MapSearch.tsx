import Pin from "../../components/map/Pin";
import React, { useEffect, useState } from "react";
import Aim from '../../assets/image/icons/aim.png';
import { Map, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";

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

export default function MapSearch() {
  const [mapInfo, setMapInfo] = useState<string>('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [center, setCenter] = useState({ lat: 37.5449, lng: 127.0566 });

  useEffect(() => {
    // 더미 데이터 설정
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
        price: 500
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
        price: 850
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
        price: 1100
      }
    ];

    setProperties(dummyProperties);

  }, []);

  const getMapInfo = (map: any) => {
    const center = map.getCenter();
    const level = map.getLevel();
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    const latRange = `${swLatLng.getLat()} ~ ${neLatLng.getLat()}`;
    const lngRange = `${swLatLng.getLng()} ~ ${neLatLng.getLng()}`;

    let message = `지도 중심좌표는 위도 ${center.getLat()}, \n`;
    message += `경도 ${center.getLng()} 이고 \n`;
    message += `지도 레벨은 ${level} 입니다 \n\n`;
    message += `위도의 범위는 ${latRange} 이고 \n`;
    message += `경도의 범위는 ${lngRange} 입니다`;

    setMapInfo(message);
  };

  const moveToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = { lat, lng: lon };

        setCenter(locPosition);
      });
    }
  };

  return (
    <div className="pt-16 h-[100vh]">
      <Map
        center={center}
        isPanto={true}
        style={{ width: "100%", height: "100%" }}
        level={3}
        onCenterChanged={(map) => getMapInfo(map)}
        onZoomChanged={(map) => getMapInfo(map)}
      >
          <div className="absolute top-20 left-4 z-10 p-1 bg-white-2 rounded">
            <img
              id="currentLocationImg"
              src={Aim}
              alt="현재 위치로 이동"
              className="w-8 h-8 cursor-pointer"
              onClick={moveToCurrentLocation}
            />
          </div>
        {/* <MarkerClusterer averageCenter={true} minLevel={10}> */}
          {properties.map((property) => (
            <CustomOverlayMap
              key={property.propertyId}
              position={{ lat: property.latitude, lng: property.longitude }}
              clickable={true}
              onClick={() => setSelectedPropertyId(property.propertyId)}
            >
              <div onClick={() => setSelectedPropertyId(property.propertyId)}>
                <Pin
                  propertyId={property.propertyId}
                  area={property.area1}
                  price={property.price}
                  count={property.count}
                  handleClick={() => {setSelectedPropertyId(property.propertyId); moveToCurrentLocation();}}
                />
              </div>
            </CustomOverlayMap>
          ))}
        {/* </MarkerClusterer> */}
      </Map>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginTop: '10px' }}>
        {mapInfo}
      </pre>
    </div>
  );
}
