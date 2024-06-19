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

export async function login() {
  const response = await userInstance.get('/login'); // 수정된 URL로 요청을 보냅니다.
  console.log(response);
}

export async function test() {
  return await userInstance.get('/test');
}
