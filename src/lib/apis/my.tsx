import { myInstance } from './api';

export async function test() {
  return myInstance.get('/');
}
