export const moveToCurrentLocation = (map: kakao.maps.Map | null) => {
    if (!map) return;
  
    const moveToLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);
          map.panTo(locPosition);
        });
      }
    };
  
    document.getElementById('currentLocationImg')?.addEventListener('click', moveToLocation);
  
    return () => {
      document.getElementById('currentLocationImg')?.removeEventListener('click', moveToLocation);
    };
  };
  