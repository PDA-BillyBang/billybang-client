import { propertyInstance } from './api';

interface GetPropertiesParams {
  realEstateType: string;
  tradeType: string;
  dealPriceMin: number,
  dealPriceMax: number,
  leasePriceMin: number,
  leasePriceMax: number,
  leftLon: number;
  rightLon: number;
  topLat: number;
  bottomLat: number;
  zoom: number;
}

interface GetPropertyDetailsParams {
  realEstateType: string;
  tradeType: string;
  dealPriceMin: number,
  dealPriceMax: number,
  leasePriceMin: number,
  leasePriceMax: number,
  latitude: number;
  longitude: number;
  size: number;
}

export async function getPropertyGroups(params: GetPropertiesParams) {
  const {
    realEstateType,
    tradeType,
    dealPriceMin,
    dealPriceMax,
    leasePriceMin,
    leasePriceMax,
    leftLon,
    rightLon,
    topLat,
    bottomLat,
    zoom,
  } = params;

  return propertyInstance.get('', {
    params: {
      realEstateType,
      tradeType,
      dealPriceMin,
      dealPriceMax,
      leasePriceMin,
      leasePriceMax,
      leftLon,
      rightLon,
      topLat,
      bottomLat,
      zoom,
    },
  });
}

export async function getPropertyDetails(params: GetPropertyDetailsParams) {
  const {
    realEstateType,
    tradeType,
    dealPriceMin,
    dealPriceMax,
    leasePriceMin,
    leasePriceMax,
    latitude,
    longitude,
    size,
  } = params;

  return propertyInstance.get('/details', {
    params: {
      realEstateType,
      tradeType,
      dealPriceMin,
      dealPriceMax,
      leasePriceMin,
      leasePriceMax,
      latitude,
      longitude,
      size,
    },
  });
}
