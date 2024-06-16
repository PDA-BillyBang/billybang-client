import { Root } from "react-dom/client";

export type Property = {
    propertyId: number;
    articleName: string;
    latitude: number;
    longitude: number;
    buildingName: string;
    realEstateType: string;
    area1: number;
    area2: number;
    count: number;
    price: number;
  };
  
export type OverlayData = {
    root: Root;
    overlay: kakao.maps.CustomOverlay;
};