import Pin from "../../components/map/Pin";
import React, {useEffect, useState} from "react";
import Aim from '../../assets/image/icons/aim.png';
import ReactDOMServer from 'react-dom/server';

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

export default function Map() {
  const [mapInfo, setMapInfo] = useState<string>('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number|null>(null);

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

    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5449, 127.0566), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
    const map = new window.kakao.maps.Map(container, options); // 지도를 생성

    const getInfo = () => {
      // 지도의 현재 중심좌표를 얻어옵니다 
      const center = map.getCenter(); 
      
      // 지도의 현재 레벨을 얻어옵니다
      const level = map.getLevel();
      
      // 지도의 현재 영역을 얻어옵니다 
      const bounds = map.getBounds();
      
      // 영역의 남서쪽 좌표를 얻어옵니다 
      const swLatLng = bounds.getSouthWest(); 
      
      // 영역의 북동쪽 좌표를 얻어옵니다 
      const neLatLng = bounds.getNorthEast(); 

      // 위도와 경도의 범위를 계산합니다.
      const latRange = swLatLng.getLat() + ' ~ ' + neLatLng.getLat();
      const lngRange = swLatLng.getLng() + ' ~ ' + neLatLng.getLng();
      
      let message = '지도 중심좌표는 위도 ' + center.getLat() + ', \n';
      message += '경도 ' + center.getLng() + ' 이고 \n';
      message += '지도 레벨은 ' + level + ' 입니다 \n\n';
      message += '위도의 범위는 ' + latRange + ' 이고 \n';
      message += '경도의 범위는 ' + lngRange + ' 입니다';
      
      setMapInfo(message);
    }
    // 지도 로딩 후 정보를 업데이트합니다.
    map.addControl(new window.kakao.maps.ZoomControl(), window.kakao.maps.ControlPosition.RIGHT);
    map.addControl(new window.kakao.maps.MapTypeControl(), window.kakao.maps.ControlPosition.TOPRIGHT);
    getInfo();
    
    // 지도 이동 시 정보를 업데이트합니다.
    window.kakao.maps.event.addListener(map, 'center_changed', getInfo);
    window.kakao.maps.event.addListener(map, 'zoom_changed', getInfo);

    // 현재 위치로 이동하는 함수
    const moveToCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);

          // 지도의 중심을 현재 위치로 이동
          map.panTo(locPosition);
        });
      }
    }
    moveToCurrentLocation();

    // 현재 위치로 이동 버튼 클릭 시 현재 위치로 이동
    document.getElementById('currentLocationImg')?.addEventListener('click', moveToCurrentLocation)

    properties.forEach(property => {
      const position = new window.kakao.maps.LatLng(property.latitude, property.longitude);
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: ReactDOMServer.renderToString(
          <Pin 
            area={property.area1} 
            price={property.price} 
            count={property.count} 
            handleClick={setSelectedPropertyId}
            propertyId={property.propertyId}
          />
        ),
        yAnchor: 1,
      });
      customOverlay.setMap(map);
    });

  }, []);

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
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginTop: '10px' }}>
        {mapInfo}
      </pre>
    </div>
  );
}
