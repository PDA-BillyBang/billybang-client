import { PropertyGroup, PropertyOption } from "@/utils/types";
import { getPropertyGroups } from '@/lib/apis/property';

const realEstateTypeMap: { [key: string]: string } = {
  원룸: 'OR',
  오피스텔: 'OPST',
  아파트: 'APT',
  빌라: 'VL',
  주택: 'DDDGG:SGJT:HOJT:JWJT',
};

const tradeTypeMap: { [key: string]: string } = {
  전세: 'LEASE',
  매매: 'DEAL',
};

const getRealEstateTypeString = (selectedBuildingCategory: { [key: string]: boolean }) => {
  const types = Object.keys(selectedBuildingCategory)
    .filter((key) => selectedBuildingCategory[key])
    .map((key) => realEstateTypeMap[key]);
  return types.join(':');
};

const getTradeTypeString = (selectedTradeCategory: { [key: string]: boolean }) => {
  const types = Object.keys(selectedTradeCategory)
    .filter((key) => selectedTradeCategory[key])
    .map((key) => tradeTypeMap[key]);
  return types.join(':');
};

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
