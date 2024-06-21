import { PropertyGroup } from "@/utils/types";
import { getPropertyGroups } from '@/lib/apis/property';

export const fetchPropertyGroups = async (
  map: kakao.maps.Map | null,
  setPropertyGroups: (properties: PropertyGroup[]) => void
) => {
  if (!map) return;

  const bounds = map.getBounds();
  const swLatLng = bounds.getSouthWest();
  const neLatLng = bounds.getNorthEast();

  const params = {
    realEstateType: 'APT',
    tradeType: 'DEAL',
    priceMin: 0,
    priceMax: 3000,
    leftLon: swLatLng.getLng(),
    rightLon: neLatLng.getLng(),
    topLat: neLatLng.getLat(),
    bottomLat: swLatLng.getLat(),
  };

  try {
    const response = await getPropertyGroups(params);
    if (response.data.success) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any 
        setPropertyGroups(response.data.response.map((item: any) => ({ // 추후 API 응답 인터페이스 제작할 것
        representativeId: item.representativeId,
        latitude: item.latitude,
        longitude: item.longitude,
        area: item.area,
        cnt: item.cnt,
        price: item.price,
      })));
    } else {
      console.error('Failed to fetch properties');
    }
  } catch (error) {
    console.error('Error fetching properties', error);
  }
};
