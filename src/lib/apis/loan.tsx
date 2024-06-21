import { loanInstance, baseInstance } from './api';

export async function getLoansByPropertyId(propertyId: number) {
  return await baseInstance.get(`/loans?propertyId=${propertyId}`);
}

export async function getLoanProviderById(providerId: number) {
  return await loanInstance.get(`/providers/${providerId}`);
}

export async function getLoanDetailByLoanId(loanId: number) {
  return await loanInstance.get('/' + loanId);
}

export async function likeLoan(loanId: number) {
  return await loanInstance.post('/stars', { loanId: loanId });
}
