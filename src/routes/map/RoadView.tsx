import React, { useEffect } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
export default function RoadView() {
  const [searchParams] = useSearchParams();
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const buildingName = searchParams.get('buildingname');

  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle('로드뷰');
  }, [setTitle]);

  useEffect(() => {
    if (latitude && longitude) {
      const mapCenter = new kakao.maps.LatLng(Number(latitude), Number(longitude));

      // Create map
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: mapCenter,
        level: 4,
      };
      let map;
      if (mapContainer){
          map = new kakao.maps.Map(mapContainer, mapOption);
      }

      // Create marker
      const mMarker = new kakao.maps.Marker({
        position: mapCenter,
        map: map,
      });

      // Create info window
      const mLabel = new kakao.maps.InfoWindow({
        position: mapCenter,
        content: `${buildingName}`,
      });
      if (map){
          mLabel.open(map, mMarker);
      }

      // Create roadview
      const rvContainer = document.getElementById('roadview');
      let rv: kakao.maps.Roadview;
      if (rvContainer){
        rv = new kakao.maps.Roadview(rvContainer);
      }
        
      const rc = new kakao.maps.RoadviewClient();

      rc.getNearestPanoId(mapCenter, 50, function (panoId) {
        rv.setPanoId(panoId, mapCenter);

        // Add marker to roadview
        const rMarker = new kakao.maps.Marker({
          position: mapCenter,
          map: rv,
        });

        // Add info window to roadview
        const rLabel = new kakao.maps.InfoWindow({
          position: mapCenter,
          content: `${buildingName}`,
        });
        rLabel.open(rv, rMarker);

        // Adjust viewpoint to center marker
        const projection = rv.getProjection();
        const viewpoint = projection.viewpointFromCoords(rMarker.getPosition(), rMarker.getAltitude());
        rv.setViewpoint(viewpoint);
      });
    }
  }, [latitude, longitude, buildingName]);

  return (
    <div className="roadview-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div id="map" style={{ width: '100%', height: '50%' }}></div>
      <div id="roadview" style={{ width: '100%', height: '50%' }}></div>
    </div>
  );
}
