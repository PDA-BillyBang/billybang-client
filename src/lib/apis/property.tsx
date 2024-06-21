import { propertyInstance } from './api';

interface GetPropertiesParams {
  realEstateType: string;
  tradeType: string;
  priceMin: number;
  priceMax: number;
  leftLon: number;
  rightLon: number;
  topLat: number;
  bottomLat: number;
}

interface GetPropertyDetailsParams {
  realEstateType: string;
  tradeType: string;
  priceMin: number;
  priceMax: number;
  latitude: number;
  longitude: number;
}

export async function getPropertyGroups(params: GetPropertiesParams) {
  const {
    realEstateType,
    tradeType,
    priceMin,
    priceMax,
    leftLon,
    rightLon,
    topLat,
    bottomLat,
  } = params;

  return propertyInstance.get('', {
    params: {
      realEstateType,
      tradeType,
      priceMin,
      priceMax,
      leftLon,
      rightLon,
      topLat,
      bottomLat,
    },
  });
}

export async function getPropertyDetails(params: GetPropertyDetailsParams) {
  const {
    realEstateType,
    tradeType,
    priceMin,
    priceMax,
    latitude,
    longitude,
  } = params;

  return propertyInstance.get('/details', {
    params: {
      realEstateType,
      tradeType,
      priceMin,
      priceMax,
      latitude,
      longitude,
    },
  });
}
