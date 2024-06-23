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
  
export const getRealEstateTypeString = (selectedBuildingCategory: { [key: string]: boolean }) => {
const types = Object.keys(selectedBuildingCategory)
    .filter((key) => selectedBuildingCategory[key])
    .map((key) => realEstateTypeMap[key]);
return types.join(':');
};

export const getTradeTypeString = (selectedTradeCategory: { [key: string]: boolean }) => {
const types = Object.keys(selectedTradeCategory)
    .filter((key) => selectedTradeCategory[key])
    .map((key) => tradeTypeMap[key]);
return types.join(':');
};
