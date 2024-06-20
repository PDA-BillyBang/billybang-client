import { loanInstance } from './api';

export async function getLoansByPropertyId(propertyId: number) {
  return await loanInstance.get(`/loans?propertyId=${propertyId}`);
}

export async function getLoanProviderById(providerId: number) {
  return await loanInstance.get(`/providers/${providerId}`);
}
