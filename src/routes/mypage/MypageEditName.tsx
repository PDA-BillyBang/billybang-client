import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import LargeButton from '../../components/common/button/LargeButton';
import Swal from 'sweetalert2';
import { updateNickname } from '@/lib/apis/user';
import { AxiosError } from 'axios';
import { ErrorResponseI } from '@/utils/errorTypes';
type Props = {};

export default function MypageEditName({}: Props) {
  const navigate = useNavigate();
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  const [nickname, setNickname] = useState('');

  useEffect(() => {
    setTitle('이름');
  }, [setTitle]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleSave = async () => {
    try {
      await updateNickname(nickname);
      console.log('Nickname saved:', nickname);
      navigate('../');
    } catch (error: unknown) {
      const errorResponse = error as AxiosError<ErrorResponseI>;
      if (errorResponse.response && errorResponse.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: '오류',
          text: '닉네임 변경 중 오류가 발생했습니다.',
          confirmButtonColor: '#004CC7',
          confirmButtonText: '확인',
        });
      } else if (
        errorResponse.response &&
        errorResponse.response.status === 401
      ) {
        Swal.fire({
          icon: 'error',
          title: '로그인 만료',
          text: '로그인이 만료되었습니다. 다시 로그인 해주시길 바랍니다.',
          confirmButtonColor: '#004CC7',
          confirmButtonText: '확인',
        });
        navigate('/user/login');
      }
    }
  };

  return (
    <div className="pt-[80px] w-[100%] flex flex-col items-center">
      <div className="w-customWidthPercent">
        <input
          type="text"
          value={nickname}
          onChange={handleInputChange}
          placeholder="닉네임을 입력하세요"
          className="w-full p-2 border-b-[0.1rem]  text-[1rem] focus:border-b-black-1 focus:border-b-[0.1rem] focus:outline-none border-grey-2"
        />
      </div>
      <div className="fixed bottom-0 pb-[20px] bg-white w-customWidthPercent">
        <LargeButton
          text="수정하기"
          isActive={3}
          customWidth="w-[100%]"
          handleClick={handleSave}
        />
      </div>
    </div>
  );
}
