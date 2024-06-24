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

export async function deleteLikeLoan(loanId: number) {
  return await loanInstance.delete(`/stars?loanId=${loanId}`);
}

export async function getLikeLoans() {
  return await loanInstance.get('/stars');
}

export async function getBestLoans(data: {
  propertyId: number;
  tradeType: string;
  area2: number;
  price: number;
}) {
  console.log(data);
  const s = await loanInstance.post('/best', {
    properties: [data],
  });
  console.log(s);
  return s;
}
