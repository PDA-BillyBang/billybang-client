import { getPropertyDetails } from "@/lib/apis/property";
import { Property, PropertyGroup, PropertyOption } from "@/utils/types";
import { getRealEstateTypeString, getTradeTypeString } from "./fetchMethods";

export const fetchPropertyDetail = async (group : PropertyGroup, setProperties: React.Dispatch<React.SetStateAction<Property[]>>, propertyOption: PropertyOption) => {
    const realEstateType = getRealEstateTypeString(propertyOption.SelectedBuildingCategory);
    const tradeType = getTradeTypeString(propertyOption.SelectedTradeCategory);

    const params = {
      realEstateType : realEstateType,
      tradeType: tradeType,
      dealPriceMin: propertyOption.dealPriceMin,
      dealPriceMax: propertyOption.dealPriceMax,
      leasePriceMin: propertyOption.leasePriceMin,
      leasePriceMax: propertyOption.leasePriceMax,
      latitude : group.latitude,
      longitude : group.longitude,
      size : group.cnt
    };
    try {
      const response = await getPropertyDetails(params);
      if (response.data.success) {
        setProperties(response.data.response.content);
      } else {
        console.error('Failed to fetch detailed properties');
      }
    } catch (error) {
      console.error('Error fetching detailed properties', error);
    }
}