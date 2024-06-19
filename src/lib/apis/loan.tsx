import { loanInstance } from './api';

export async function getLoansByPropertyId() {
  return await loanInstance.get('/');
}

export async function getLoanProviderById(providerId: number) {
  return await loanInstance.get(`/providers/${providerId}`);
}
