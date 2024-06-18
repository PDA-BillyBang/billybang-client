import { userInstance } from './api';

export async function signUp(data: {
  signUptype: string;
  email: string;
  password: string;
  birthDate: string;
  nickname: string;
}) {
  return await userInstance.post('/sign-up', data);
}

export async function test() {
  return await userInstance.get('/test');
}
