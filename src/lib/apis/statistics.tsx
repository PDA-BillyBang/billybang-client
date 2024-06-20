import { statisticsInstance } from './api';

export async function getNewsByDistrictId(districtId: number) {
  return statisticsInstance.get(`/news?districtId=${districtId}`);
}
