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

export async function getProperties(params: GetPropertiesParams) {
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

  return propertyInstance.get(``, {
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
