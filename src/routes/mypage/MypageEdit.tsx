import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import profileTest from '../../assets/image/test/profile-test.svg';
import editGrey from '../../assets/image/icons/editGrey.svg';
import rightArrowGrey from '../../assets/image/icons/rightArrowGrey.svg';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, logout } from '@/lib/apis/user';
import { ErrorResponseI } from '@/utils/errorTypes';
import { AxiosError } from 'axios';

export default function MypageEdit() {
  const navigate = useNavigate();

  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle('설정');
  }, [setTitle]);

  const handleClickedUserInfoButton = async () => {
    const resp = await getUserInfo();
    if (resp.data.response.userInfo) navigate('/user/info/1');
    else navigate('/user/info/2');
  };

  const handleClickedUserLogoutButton = async () => {
    try {
      const resp = await logout();
      console.log(resp);
      navigate('/');
    } catch (error: unknown) {
      const errorResponse = error as AxiosError<ErrorResponseI>;
      if (errorResponse.response) {
        console.error(errorResponse.response.data.response);
      }
    }
  };

  return (
    <div className="pt-[80px] w-[100%] flex flex-col items-center">
      <div className=" w-customWidthPercent">
        <div className="flex flex-col items-center">
          <img
            src={profileTest}
            alt="profile"
            className="w-[100px] h-[100px]"
          />

          <div className="font-bold text-[1rem] pt-[0.3rem]">영석몬</div>
          <div className="text-grey-1 text-[0.9rem]">
            kimyoungseok15@gmail.com
          </div>
        </div>
      </div>
      <div className="w-[100%] bg-grey-5 h-[10px] my-[1rem]" />
      <div className="flex flex-col items-center w-customWidthPercent">
        <div className="w-[100%] text-grey-1 flex flex-row justify-between">
          <div className="w-[20%]">닉네임</div>
          <div className="flex flex-row w-[30%] justify-between">
            <div>영석몬</div>
            <img
              src={editGrey}
              className="h-[1rem] w-[1rem] cursor-pointer"
              onClick={() => navigate('/my/edit/name')}
              alt="edit"
            />
          </div>
        </div>
        <div className="py-[0.8rem]" />
        <div className="w-[100%] text-grey-1 flex flex-row justify-between">
          <div className="w-[20%]">비밀번호</div>
          <div className="flex flex-row w-[30%] justify-between">
            <div>000000</div>
            <img
              src={editGrey}
              className="h-[1rem] w-[1rem] cursor-pointer"
              alt="edit"
              onClick={() => navigate('/my/edit/password')}
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] bg-grey-5 h-[10px] my-[1rem]" />

      <div className="flex flex-col items-center w-customWidthPercent">
        <div
          onClick={handleClickedUserInfoButton}
          className="w-[100%] text-grey-1 flex flex-row justify-between"
        >
          <div className="w-[20%]">정보수정</div>
          <img
            src={rightArrowGrey}
            className="h-[1.5rem] w-[1.5rem] cursor-pointer"
            alt="edit"
          />
        </div>
        <div className="py-[0.8rem]" />
        <div
          className="w-[100%] text-grey-1 flex flex-row justify-between"
          onClick={handleClickedUserLogoutButton}
        >
          <div className="w-[20%]">로그아웃</div>
          <img
            src={rightArrowGrey}
            className="h-[1.5rem] w-[1.5rem] cursor-pointer"
            alt="edit"
          />
        </div>
        <div className="py-[0.8rem]" />
        <div className="w-[100%] text-grey-1 flex flex-row justify-between">
          <div className="w-[20%]">회원탈퇴</div>
          <img
            src={rightArrowGrey}
            className="h-[1.5rem] w-[1.5rem] cursor-pointer"
            alt="edit"
          />
        </div>
      </div>
    </div>
  );
}
