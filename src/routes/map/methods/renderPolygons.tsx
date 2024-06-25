/* eslint-disable @typescript-eslint/no-explicit-any */
import { districtsLocation } from '@/utils/districtsLocation';
export const renderPolygons = (
    geojson: any,
    mapInstance: kakao.maps.Map,
    infoWindow: kakao.maps.InfoWindow,
    handlePolygonHover: (name: string) => () => void
  ): kakao.maps.Polygon[] => {
    const guPolygons: kakao.maps.Polygon[] = [];
  
    geojson.features.forEach((feature: any) => {
      const coordinates = feature.geometry.coordinates[0].map((coord: any) => new kakao.maps.LatLng(coord[1], coord[0]));
      const polygon = new kakao.maps.Polygon({
        path: coordinates,
        strokeWeight: 2,
        strokeColor: '#487FD7',
        strokeOpacity: 0.8,
        fillColor: '#DAE5F7',
        fillOpacity: 0.7,
      });
  
      const guName = feature.properties.SIG_KOR_NM; // 구 이름 가져오기

      // hover 시 다각형 스타일 변경
      kakao.maps.event.addListener(polygon, 'mouseover', function() {
        polygon.setOptions({ fillColor: '#66ccff' });
        mapInstance.setCursor('pointer');
  
  
        // InfoWindow 설정
        handlePolygonHover(guName)();
  
        // InfoWindow 열기
        infoWindow.open(mapInstance);
  
        // 마우스가 infoWindow 위에 있을 때 닫히지 않도록 하기 위한 이벤트 리스너 추가
        kakao.maps.event.addListener(infoWindow, 'domready', function() {
          const iwContent = document.querySelector('.infoWindow-content');
          if (iwContent) {
            iwContent.addEventListener('mouseenter', function() {
              infoWindow.open(mapInstance);
            });
            iwContent.addEventListener('mouseleave', function() {
              infoWindow.close();
            });
          }
        });
      });
  
      kakao.maps.event.addListener(polygon, 'mouseout', function() {
        mapInstance.setCursor('');
        infoWindow.close(); // InfoWindow 닫기
        polygon.setOptions({ fillColor: '#DAE5F7' }); // 다각형 색상 원래대로 복원
      });

      // 클릭 시 지도 중심과 줌 레벨 변경
      kakao.maps.event.addListener(polygon, 'click', function() {
        const location = districtsLocation[guName];
        if (location) {
          const center = new kakao.maps.LatLng(location[1], location[0]);
          mapInstance.setLevel(7,{animate:true, anchor: center});
        }
      });

      guPolygons.push(polygon);
    });
  
    return guPolygons;
  };

export const showPolygons = (polygons: kakao.maps.Polygon[], mapInstance: kakao.maps.Map) => {
  polygons.forEach(polygon => {
    polygon.setMap(mapInstance);
  });
};

export const hidePolygons = (polygons: kakao.maps.Polygon[]) => {
  polygons.forEach(polygon => {
    polygon.setMap(null);
  });
};
