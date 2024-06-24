import { PropertyGroup, PropertyOption } from "@/utils/types";
import { getPropertyGroups } from '@/lib/apis/property';
import { getRealEstateTypeString, getTradeTypeString } from "./fetchMethods";


export const fetchPropertyGroups = async (
  map: kakao.maps.Map | null,
  setPropertyGroups: (properties: PropertyGroup[]) => void,
  propertyOption: PropertyOption,
) => {
  if (!map) return;

  const bounds = map.getBounds();
  const swLatLng = bounds.getSouthWest();
  const neLatLng = bounds.getNorthEast();

  const realEstateType = getRealEstateTypeString(propertyOption.SelectedBuildingCategory);
  const tradeType = getTradeTypeString(propertyOption.SelectedTradeCategory);

  const params = {
    realEstateType,
    tradeType,
    priceMin: propertyOption.priceMin,
    priceMax: propertyOption.priceMax,
    leftLon: swLatLng.getLng(),
    rightLon: neLatLng.getLng(),
    topLat: neLatLng.getLat(),
    bottomLat: swLatLng.getLat(),
    zoom: map.getLevel(),
  };

  try {
    const response = await getPropertyGroups(params);
    if (response.data.success) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setPropertyGroups(response.data.response.map((item: any) => ({
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
