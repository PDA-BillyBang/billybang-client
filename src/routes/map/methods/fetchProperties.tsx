import { Property } from "@/utils/types";
import { getProperties } from '@/lib/apis/property';

export const fetchProperties = async (
  map: kakao.maps.Map | null,
  setProperties: (properties: Property[]) => void
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
    const response = await getProperties(params);
    if (response.data.success) {
      setProperties(response.data.response.map((item: any) => ({
        propertyId: item.representativeId,
        articleName: "", // Add appropriate value if available
        latitude: item.latitude,
        longitude: item.longitude,
        buildingName: "", // Add appropriate value if available
        realEstateType: "아파트", // Adjust according to your logic
        area1: item.area,
        area2: 0, // Add appropriate value if available
        count: item.cnt,
        price: item.price,
      })));
    } else {
      console.error('Failed to fetch properties');
    }
  } catch (error) {
    console.error('Error fetching properties', error);
  }
};
