import { getPropertyDetails } from '@/lib/apis/property';
import { Property, PropertyGroup, PropertyOption } from '@/utils/types';
import { getRealEstateTypeString, getTradeTypeString } from './fetchMethods';

export const fetchPropertyDetail = async (
  group: PropertyGroup,
  propertyOption: PropertyOption,
  page: number
): Promise<Property[]> => {
  const realEstateType = getRealEstateTypeString(
    propertyOption.SelectedBuildingCategory
  );
  const tradeType = getTradeTypeString(propertyOption.SelectedTradeCategory);

  const params = {
    realEstateType: realEstateType,
    tradeType: tradeType,
    dealPriceMin: propertyOption.dealPriceMin,
    dealPriceMax: propertyOption.dealPriceMax,
    leasePriceMin: propertyOption.leasePriceMin,
    leasePriceMax: propertyOption.leasePriceMax,
    latitude: group.latitude,
    longitude: group.longitude,
    size: 2,
    page: page, // 페이지 번호 반영
  };

  try {
    const response = await getPropertyDetails(params);
    if (response.data.success) {
      return response.data.response.content;
    } else {
      console.error('Failed to fetch detailed properties');
      return [];
    }
  } catch (error) {
    console.error('Error fetching detailed properties', error);
    return [];
  }
};
