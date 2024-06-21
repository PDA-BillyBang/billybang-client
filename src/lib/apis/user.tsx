import { userInstance } from './api';

interface User {
  password: string;
  birthDate: string;
  nickname: string;
  userinfo: UserInfo[];
}

interface UserInfo {
  occupation: string | undefined;
  companySize?: string;
  employmentDuration?: number;
  individualIncome: number | undefined;
  individualAssets: number | undefined;
  totalMarriedIncome?: number | undefined;
  totalMarriedAssets?: number | undefined;
  childrenCount?: number;
  isForeign: boolean;
  isFirstHouseBuyer: boolean;
  isMarried: boolean;
  yearsOfMarriage?: number | undefined;
  hasOtherLoans: boolean;
}

export async function signUp(data: {
  signUptype?: string;
  email: string;
  password: string;
  birthDate: Date;
  nickname: string;
}) {
  console.log(data);
  return await userInstance.post('/sign-up', data);
}

// export async function kakaoLogin() {
//   return await userInstance.get('/oauth2/authroization/kakao');
// }

export async function test() {
  return await userInstance.get('/test');
}

//로그인(POST)
export async function login(data: { email: string; password: string }) {
  return await userInstance.post('/login', data);
}

//로그아웃(POST)
export async function logout() {
  return await userInstance.post('/logout');
}

//이메일 중복 확인(GET)
export async function isEmailRegistered(email: string) {
  return await userInstance.get(`/validate-email?email=${email}`);
}

//회원정보 조회(GET)
export async function getUserInfo() {
  const s = await userInstance.get('/user-info');
  console.log(s);
  return s;
}

//회원정보 수정(PUT)
export async function updateUserInfo(data: User) {
  return await userInstance.put('/user-info', data);
}

//회원 추가 정보 등록(POST)
export async function registerAdditionalUserInfo(data: UserInfo) {
  console.log(data);
  return await userInstance.post('/user-info', data);
}

export async function isvalidateToken() {
  const s = await userInstance.get('/validate-token');
  console.log(s);
  return s;
}
