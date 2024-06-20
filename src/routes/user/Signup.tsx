import FloatingInputForm1 from '@components/common/form/FloatingInputForm1';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Datepicker } from 'flowbite-react';
import LargeButton from '@components/common/button/LargeButton';
import { signUp } from '@/lib/apis/user';

export default function SignUp() {
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isActive, setIsActive] = useState(3); // 기본값은 3으로 설정

  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle('회원가입');
  }, [setTitle]);

  useEffect(() => {
    handleSignUp();
  }, []);

  const handleSignUp = async () => {
    try {
      const response = await signUp({
        email: 's@gmail.com',
        password: '12345678',
        birthDate: '2024-06-18',
        nickname: 'nickname',
      });
      console.log('회원가입 성공:', response.data);
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  // 모든 입력 값이 유효한지 확인하는 함수
  const checkValidity = () => {
    const isPasswordValid = password.length >= 8;
    const isNicknameValid = nickname.length >= 4;
    const isCheckPasswordValid =
      checkPassword.length >= 8 && checkPassword === password;
    const isDateValid = selectedDate !== null; // 생년월일이 선택되었는지 확인

    if (
      isPasswordValid &&
      isNicknameValid &&
      isCheckPasswordValid &&
      isDateValid
    ) {
      setIsActive(0); // 모든 조건이 충족되면 isActive를 0으로 설정
    } else {
      setIsActive(3); // 조건이 충족되지 않으면 isActive를 3으로 설정
    }
  };

  useEffect(() => {
    checkValidity(); // 컴포넌트가 렌더링될 때마다 유효성을 확인합니다.
  }, [password, nickname, checkPassword, selectedDate]); // password, nickname, checkPassword, selectedDate가 변경될 때마다 유효성을 다시 확인합니다.

  // 상태 업데이트 헬퍼 함수
  const handlePasswordChange = (value: string | number) => {
    if (typeof value === 'string') {
      setPassword(value);
    }
  };

  const handleCheckPasswordChange = (value: string | number) => {
    if (typeof value === 'string') {
      setCheckPassword(value);
    }
  };

  const handleCheckNicnameChange = (value: string | number) => {
    if (typeof value === 'string') {
      setNickname(value);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-customWidthPercent mt-[4rem] my-[3rem]">
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
      <div className="w-customWidthPercent mb-[3rem]">
        <FloatingInputForm1
          type="password"
          title="비밀번호 확인"
          text="8자리 이상 입력해주세요"
          value={checkPassword}
          onChange={handleCheckPasswordChange}
          validate={(value) => typeof value === 'string' && value === password}
          errorMessage="비밀번호가 일치하지 않습니다."
        />
      </div>
      <div className="w-customWidthPercent mb-[3rem]">
        <FloatingInputForm1
          type="text"
          title="닉네임"
          text="4자리 이상 입력해주세요"
          value={nickname}
          onChange={handleCheckNicnameChange}
          validate={(value) => typeof value === 'string' && value.length >= 4}
          errorMessage="닉네임은 4자리 이상이어야 합니다."
        />
      </div>
      <div className="w-customWidthPercent text-grey-2 hover:text-[black] ">
        <div className={`text-[1.5rem] font-bold mb-2`}>생년월일</div>

        <Datepicker
          onClick={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          language="ko"
          className="hover:text-[black] text-grey-2 bg-white-1 z-20"
          style={{ backgroundColor: 'white' }}
        />
      </div>

      <div className="flex flex-col items-center mt-auto mb-4 w-customWidthPercent">
        <LargeButton
          text="계속하기"
          customWidth="w-full"
          isActive={isActive}
        ></LargeButton>
      </div>
    </div>
  );
}
