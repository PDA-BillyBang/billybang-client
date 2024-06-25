/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const zoom = map.getLevel();
  
  const params = {
    realEstateType,
    tradeType,
    dealPriceMin: propertyOption.dealPriceMin,
    dealPriceMax: propertyOption.dealPriceMax,
    leasePriceMin: propertyOption.leasePriceMin,
    leasePriceMax: propertyOption.leasePriceMax,
    leftLon: swLatLng.getLng(),
    rightLon: neLatLng.getLng(),
    topLat: neLatLng.getLat(),
    bottomLat: swLatLng.getLat(),
    zoom: zoom,
  };
  
    try {
      const response = await getPropertyGroups(params);
      if (response.data.success) {
        if (zoom <= 5) {
          setPropertyGroups(response.data.response.map((item: PropertyGroup) => ({
            representativeId: item.representativeId,
            latitude: item.latitude,
            longitude: item.longitude,
            area: item.area,
            cnt: item.cnt,
            price: item.price,
          })));
        } else {
          setPropertyGroups(response.data.response.map((item: PropertyGroup) => ({
            representativeId: item.representativeId,
            cnt: item.cnt,
            price : item.price,
            name : item.name,
            latitude : item.latitude,
            longitude : item.longitude,
          })))
        }
      } else {
        console.error('Failed to fetch properties');
      }
    } catch (error) {
      console.error('Error fetching properties', error);
    }

};
