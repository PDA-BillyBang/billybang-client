import { userInstance } from './api';

export async function signUp(data: {
  signUptype?: string;
  email: string;
  password: string;
  birthDate: string;
  nickname: string;
}) {
  return await userInstance.post('/sign-up', data);
}

// export async function kakaoLogin() {
//   return await userInstance.get('/oauth2/authroization/kakao');
// }

export async function test() {
  return await userInstance.get('/test');
}
export async function login(data: { email: string; password: string }) {
  const s = await userInstance.post('/login', data);
  console.log(s);
  return s;
}

export async function isEmailRegistered(email: string) {
  return await userInstance.get(`/validate-email?email=${email}`);
}
