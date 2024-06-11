import Pin from "../../components/map/Pin";
import React, {useEffect, useState} from "react";
import Aim from '../../assets/image/icons/aim.png';

type Props = {};

export default function Map({}: Props) {
  const [mapInfo, setMapInfo] = useState<string>('');

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
    const map = new window.kakao.maps.Map(container, options); // 지도를 생성
    
    const getInfo = () => {
      // 지도의 현재 중심좌표를 얻어옵니다 
      const center = map.getCenter(); 
      
      // 지도의 현재 레벨을 얻어옵니다
      const level = map.getLevel();
      
      // 지도타입을 얻어옵니다
      const mapTypeId = map.getMapTypeId(); 
      
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
      message += '지도 타입은 ' + mapTypeId + ' 이고 \n';
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
          map.setCenter(locPosition);
        });
      } else {
        const locPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
      }
    }
    moveToCurrentLocation();

    // 현재 위치로 이동 버튼 클릭 시 현재 위치로 이동
    document.getElementById('currentLocationImg')?.addEventListener('click', moveToCurrentLocation)

  
  }, []);

  return (
    <div className="mt-16">
      <div id="map" className="relative h-96 w-full bg-grey-6 rounded-[5px]">
      <div className="absolute top-4 left-4 z-10 p-1 bg-white-2 rounded">
          <img 
            id="currentLocationImg" 
            src={Aim} 
            alt="현재 위치로 이동" 
            className="w-8 h-8 cursor-pointer"
          />
        </div>
        Map
      </div>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginTop: '10px' }}>
        {mapInfo}
      </pre>
      <Pin area={33} price={1150} onClick={()=>{}} count={3} ></Pin>
    </div>
  );
}
