import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import LargeButton from '../../components/common/button/LargeButton';
import Swal from 'sweetalert2';
import { updatePassword } from '@/lib/apis/user';
import { ErrorResponseI } from '@/utils/errorTypes';
import { AxiosError } from 'axios';

type Props = {};

export default function MypageEditPW({}: Props) {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setPasswordConfirm] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // 비밀번호 일치 여부 상태
  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(true); // 비밀번호 길이 상태

  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle('비밀번호');
  }, [setTitle]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value);
  };

  const handleSave = async () => {
    // 비밀번호 길이 확인
    if (newPassword.length < 8) {
      setIsPasswordLongEnough(false); // 비밀번호가 8자리 미만이면 경고 메시지 표시
      return;
    } else {
      setIsPasswordLongEnough(true); // 비밀번호가 8자리 이상이면 경고 메시지 숨김
    }

    // 비밀번호와 비밀번호 확인 값이 일치하는지 확인
    if (newPassword !== newPasswordConfirm) {
      setPasswordsMatch(false); // 일치하지 않으면 경고 메시지 표시
      return;
    } else {
      setPasswordsMatch(true); // 일치하면 경고 메시지 숨김
    }

    console.log('password saved:', newPassword);
    console.log('password saved:', newPasswordConfirm);

    try {
      await updatePassword({ password: newPassword });

      Swal.fire({
        html: '<b>비밀번호 수정 완료!</b>',
        confirmButtonColor: '#004CC7',
        confirmButtonText: '확인',
      });

      navigate('../');
    } catch (error: unknown) {
      const errorResponse = error as AxiosError<ErrorResponseI>;
      if (errorResponse.response && errorResponse.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: '오류',
          text: '비밀번호 변경 중 오류가 발생했습니다.',
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
        <div className="font-bold text-[1rem]">새 비밀번호</div>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => handleInputChange(e, setNewPassword)}
          placeholder="새 비밀번호를 입력해주세요"
          className="w-full p-2 border-b-[0.1rem] text-[1rem] focus:border-b-black-1 focus:border-b-[0.1rem] focus:outline-none border-grey-2"
        />
        <div className="my-[20px]" />
        <div className="font-bold text-[1rem]">비밀번호 확인</div>
        <input
          type="password"
          value={newPasswordConfirm}
          onChange={(e) => handleInputChange(e, setPasswordConfirm)}
          placeholder="비밀번호를 다시 입력해주세요"
          className="w-full p-2 border-b-[0.1rem] text-[1rem] focus:border-b-black-1 focus:border-b-[0.1rem] focus:outline-none border-grey-2"
        />
        {!passwordsMatch && (
          <div className="text-blue-1">비밀번호가 일치하지 않습니다</div>
        )}
        {!isPasswordLongEnough && (
          <div className="text-blue-1">비밀번호는 8자리 이상이어야 합니다</div>
        )}
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
