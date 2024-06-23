import { getPropertyDetails } from "@/lib/apis/property";
import { Property, PropertyGroup } from "@/utils/types";

export const fetchPropertyDetail = async (group : PropertyGroup, setProperties: React.Dispatch<React.SetStateAction<Property[]>>) => {
    const params = {
      realEstateType : "APT",
      tradeType: "DEAL",
      priceMin : 0,
      priceMax : 3000,
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