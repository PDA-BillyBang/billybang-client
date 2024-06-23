import { Root } from "react-dom/client";

export type PropertyGroup = {
    representativeId : number,
    cnt: number,
    price : number,
    area : number,
    latitude : number,
    longitude : number,
}

export type Property = {
  propertyId: number;
  articleName: string;
  buildingName: string;
  realEstateType: string;
  tradeType: string;
  articleFeatureDesc: string;
  articleConfirmYmd: string;
  areaName: string;
  area1: number;
  area2: number;
  floorInfo: string;
  price: number;
  jibeonAddress: string | null;
  roadAddress: string | null;
  latitude: number;
  longitude: number;
  articleUrl: string;
  representativeImgUrl: string;
  sameAddrCnt: number;
  realtorName: string;
  cpName: string;
  tags: string;
  direction: string;
  isStarred: boolean | null;
};

  
export type OverlayData = {
    root: Root;
    overlay: kakao.maps.CustomOverlay;
};

export type CategoryCode = "CS2" | "HP8" | "BK9" | "SC4" | "CE7";

export type SelectedBuildingCategory = {
  원룸 : boolean,
  오피스텔 : boolean,
  아파트 : boolean,
  빌라 : boolean,
  주택 : boolean
}

export const initialBuildingCategory: SelectedBuildingCategory = {
  원룸 : true,
  오피스텔 : false,
  아파트 : false,
  빌라 : false,
  주택 : false
};

export type SelectedTradeCategory = {
  전세 : boolean,
  매매 : boolean
}

export const initialTradeCategory: SelectedTradeCategory = {
  전세 : true,
  매매 : false,
};
