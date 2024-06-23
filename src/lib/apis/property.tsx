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
  zoom: number;
}

interface GetPropertyDetailsParams {
  realEstateType: string;
  tradeType: string;
  priceMin: number;
  priceMax: number;
  latitude: number;
  longitude: number;
  size: number;
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
    zoom,
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
      zoom,
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
    size,
  } = params;

  return propertyInstance.get('/details', {
    params: {
      realEstateType,
      tradeType,
      priceMin,
      priceMax,
      latitude,
      longitude,
      size,
    },
  });
}

export async function likeProperty(propertyId: number) {
  return await propertyInstance.post('/stars', { propertyId: propertyId });
}

export async function deleteProperty(propertyId: number) {
  return await propertyInstance.delete(`/stars?loanId=${propertyId}`);
}
