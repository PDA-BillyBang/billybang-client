import FloatingInputForm1 from '@components/common/form/FloatingInputForm1';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  Params,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { Dropdown } from 'flowbite-react';
import LargeButton from '@components/common/button/LargeButton';
import { signUp } from '@/lib/apis/user';
import { AxiosError } from 'axios';
import { ErrorResponseI } from '@/utils/errorTypes';

export default function SignUp() {
  const { email } = useParams<Params>();
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [isActive, setIsActive] = useState<number>(3); // 기본값은 3으로 설정
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  const years = Array.from({ length: 2024 - 1900 + 1 }, (_, i) => 1900 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const navigate = useNavigate();

  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle('회원가입');
  }, [setTitle]);

  useEffect(() => {
    const newDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    setBirthDate(newDate);
    console.log(birthDate);
  }, [selectedYear, selectedMonth, selectedDay]);

  const handleClickedRegisterUserButton = async () => {
    if (email === undefined) {
      navigate(-1);
    }

    try {
      if (email !== undefined && birthDate !== undefined) {
        await signUp({ email, password, birthDate, nickname });

        Swal.fire({
          title: '회원가입 성공',
          text: '회원가입이 완료 되었습니다.',
          confirmButtonColor: '#004CC7',
          confirmButtonText: '확인',
        });

        navigate('/');
        console.log(1);
      }
      console.log(2);
    } catch (error: unknown) {
      const errorResponse = error as AxiosError<ErrorResponseI>;
      if (errorResponse.response && errorResponse.response.status === 400) {
        setError('모든 정보를 기입해주세요.');
        console.log(3);
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
        console.error('회원가입 에러:', error);
        console.log(4);
      }
      console.error(error);
      console.log(5);
    }
  };

  // 모든 입력 값이 유효한지 확인하는 함수
  const checkValidity = () => {
    const isPasswordValid = password.length >= 8;
    const isNicknameValid = nickname.length >= 2;
    const isCheckPasswordValid =
      checkPassword.length >= 8 && checkPassword === password;
    const isDateValid = birthDate !== null; // 생년월일이 선택되었는지 확인

    if (
      isPasswordValid &&
      isNicknameValid &&
      isCheckPasswordValid &&
      isDateValid
    ) {
      setIsActive(0); // 모든 조건이 충족되면 isActive를 0으로 설정
    } else {
      setIsActive(1); // 조건이 충족되지 않으면 isActive를 3으로 설정
    }
  };

  useEffect(() => {
    checkValidity(); // 컴포넌트가 렌더링될 때마다 유효성을 확인합니다.
  }, [password, nickname, checkPassword, birthDate]); // password, nickname, checkPassword, selectedDate가 변경될 때마다 유효성을 다시 확인합니다.

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

  // const handleDateChange = (date: Date) => {
  //   console.log(birthDate);
  //   setBirthDate(date);
  // };

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
          text="2자리 이상 입력해주세요"
          value={nickname}
          onChange={handleCheckNicnameChange}
          validate={(value) => typeof value === 'string' && value.length >= 2}
          errorMessage="닉네임은 2자리 이상이어야 합니다."
        />
      </div>

      <div className="w-customWidthPercent text-grey-2 hover:text-[black] relative bg-[white]">
        <div className={`text-[1.5rem] font-bold mb-2`}>생년월일</div>
        <div className="flex items-center">
          <Dropdown
            label={selectedYear}
            placement="bottom"
            className="bg-[white]"
          >
            <div className="overflow-y-auto max-h-[50vh]">
              {years.map((year) => (
                <Dropdown.Item key={year} onClick={() => setSelectedYear(year)}>
                  {year}
                </Dropdown.Item>
              ))}
            </div>
          </Dropdown>
          <div className="ml-1 mr-3">년</div>

          <Dropdown
            label={selectedMonth}
            placement="bottom"
            className="bg-[white]"
          >
            <div className="overflow-y-auto max-h-[50vh]">
              {months.map((month) => (
                <Dropdown.Item
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                >
                  {month}
                </Dropdown.Item>
              ))}
            </div>
          </Dropdown>
          <div className="ml-1 mr-3">월</div>

          <Dropdown
            label={selectedDay}
            placement="bottom"
            className="bg-[white]"
          >
            <div className="overflow-y-auto max-h-[50vh]">
              {days.map((day) => (
                <Dropdown.Item key={day} onClick={() => setSelectedDay(day)}>
                  {day}
                </Dropdown.Item>
              ))}
            </div>
          </Dropdown>
          <div className="ml-1 mr-3">일</div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-auto mb-4 w-customWidthPercent">
        {error !== null ? <div className="text-blue-1">{error}</div> : <></>}

        <LargeButton
          text="계속하기"
          customWidth="w-full"
          isActive={isActive}
          handleClick={
            isActive === 0 ? handleClickedRegisterUserButton : undefined
          }
        ></LargeButton>
      </div>
    </div>
  );
}
