import { useState } from 'react';
import FloatingInputForm1 from '../../components/common/form/FloatingInputForm1'; // 경로를 프로젝트 구조에 맞게 조정합니다.
import KaKaoBtn from 'images/kakao.png';
import LargeButton from '@components/common/button/LargeButton';
import { isEmailRegistered } from '@/lib/apis/user';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const isExistedUser = async () => {
    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: '이메일을 입력해주세요',
        confirmButtonColor: '#004CC7',
        confirmButtonText: '확인',
      });
      return;
    }
    try {
      const response = await isEmailRegistered(email);
      console.log(response.data.response);
      if (response.data.response.existsByEmail) {
        navigate(`pw/${email}`);
      } else {
        navigate(`/user/signup/${email}`);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(
          'Error checking email registration:',
          error.response?.data
        );
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  // 상태 업데이트 헬퍼 함수
  const handleEmailChange = (value: string | number) => {
    if (typeof value === 'string') {
      setEmail(value);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-customWidthPercent font-bold text-[1.5rem] my-[7rem]">
        <div>원하는 매물을 찾고</div>
        <div>나에게 맞는 대출 상품을</div>
        <div>추천받아 볼까요?</div>
      </div>
      <div className="flex-grow w-customWidthPercent">
        <div className="bg-white-1 text-grey-2 text-[0.8rem]">
          먼저 로그인, 회원가입이 필요해요!
        </div>
        <FloatingInputForm1
          text="이메일 주소를 입력해주세요"
          value={email}
          onChange={handleEmailChange}
        ></FloatingInputForm1>
        <div className="my-4">
          <LargeButton
            text="계속하기"
            customWidth="w-full"
            isActive={0}
            handleClick={isExistedUser}
          ></LargeButton>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-auto">
        <div className="flex items-center mt-1 w-customWidthPercent">
          <div className="h-[1px] flex-1 mx-2 bg-grey-2"></div>
          <div className="mx-2 text-center text-grey-2 text-[0.8rem] p-2">
            간편 로그인
          </div>
          <div className="h-[1px] flex-1 mx-2 bg-grey-2"></div>
        </div>

        <div className="flex flex-col mb-4 w-customWidthPercent">
           <a href="http://3.39.52.110:3000/api/oauth2/authorization/kakao">
          <button
            className=" w-full flex items-center justify-between h-[57px] bg-[#FEE500] border-none rounded-[5px] px-4"
          >
            <img src={KaKaoBtn} alt="kakao" className="h-6" />
            <div className="w-full text-center">카카오로 시작하기</div>
          </button>
           </a>
        </div>
      </div>
    </div>
  );
}
