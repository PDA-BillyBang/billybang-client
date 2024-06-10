import React, {useEffect} from "react";

type Props = {};

export default function Map({}: Props) {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
    const map = new window.kakao.maps.Map(container, options); // 지도를 생성
  }, []);

  return (
    <div id="map" className="h-96 w-customWidthPercent bg-grey-6 rounded-[5px]">
      Map
    </div>
  );
}
