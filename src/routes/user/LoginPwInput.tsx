import React, { useEffect, useState } from 'react';
import {
  Params,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import FloatingInputForm1 from '@components/common/form/FloatingInputForm1';
import LargeButton from '@components/common/button/LargeButton';
import { login } from '@/lib/apis/user';
import { AxiosError } from 'axios';
import { ErrorResponseI } from '@/utils/errorTypes';
import Swal from 'sweetalert2';

export default function LoginPwInput() {
  const [password, setPassword] = useState<string>('');
  const { email } = useParams<Params>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle('로그인');
  }, [setTitle]);

  const handlePasswordChange = (value: string | number) => {
    if (typeof value === 'string') {
      setPassword(value);
    }
  };

  const handleLoginButtonClicked = async () => {
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: '오류',
        text: '이메일이 필요합니다.',
        confirmButtonColor: '#004CC7',
        confirmButtonText: '확인',
      });
      return false;
    }
    try {
      await login({ email, password });
      navigate('/'); // 로그인 성공 후 이동할 경로
    } catch (error: unknown) {
      const errorResponse = error as AxiosError<ErrorResponseI>;

      if (errorResponse.response && errorResponse.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: '일치하는 유저 정보가 없습니다.',
          confirmButtonColor: '#004CC7',
          confirmButtonText: '확인',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '오류',
          text: '로그인 중 오류가 발생했습니다.',
          confirmButtonColor: '#004CC7',
          confirmButtonText: '확인',
        });
        console.error('로그인 에러:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-customWidthPercent my-[7rem]">
        <FloatingInputForm1
          type="password"
          title="비밀번호 입력"
          text="8자리 이상 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
          validate={(value) => typeof value === 'string' && value.length >= 8}
          errorMessage="비밀번호는 8자리 이상이어야 합니다."
        />
      </div>
      <div className="mt-auto w-customWidthPercent flex flex-col items-center mb-4">
        {error !== null ? <div className="text-blue-1">{error}</div> : <></>}
        {password.length >= 8 ? (
          <LargeButton
            text="계속하기"
            customWidth="w-full"
            isActive={0}
            handleClick={handleLoginButtonClicked}
          />
        ) : (
          <LargeButton text="계속하기" customWidth="w-full" isActive={3} />
        )}
      </div>
    </div>
  );
}
