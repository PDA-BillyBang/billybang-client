import { useEffect, useState } from 'react';
import profileTest from '../../assets/image/test/profile-test.svg';
import FavoriteRooms from '../../components/mypage/FavoriteRooms';
import PlusButton from '../../components/common/button/PlusButton';
import FavoriteLoans from '../../components/mypage/FavoriteLoans';
import home from '../../assets/image/icons/home.svg';
import loan from '../../assets/image/icons/loan.svg';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, isvalidateToken } from '@/lib/apis/user';
import { AxiosError } from 'axios';
import { ErrorResponseI } from '@/utils/errorTypes';
import { getLikeLoans } from '@/lib/apis/loan';
import { loanI } from '../loan/Loan';
import EmptyFavorite from '@components/mypage/EmptyFavorite';

interface UserInfo {
  birthDate: string;
  email: string;
  nickname: string;
  userId: number;
  userInfo: any;
}

export interface LikeLoansI {
  loanType: string;
  loans: loanI[];
}

export default function Mypage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [likeLoans, setLikeLoans] = useState<LikeLoansI[]>([]);

  const navigate = useNavigate();
  const handleToMyLoan = () => navigate('/my/loan');
  const handleToMyProperties = () => navigate('/my/properties');

  const handleGetLikeLoans = async () => {
    try {
      const result = await getLikeLoans();
      console.log('LIKE LOANS', result.data.response);
      setLikeLoans(result.data.response);
    } catch (error) {
      console.log('[ERROR]', error);
    }
  };

  useEffect(() => {
    handleGetLikeLoans();
  }, []);

  useEffect(() => {
    const validateAndFetchUserInfo = async () => {
      try {
        await isvalidateToken();
        const userInfo = await getUserInfo();
        setUser(userInfo.data.response);
      } catch (error: unknown) {
        const errorResponse = error as AxiosError<ErrorResponseI>;
        if (errorResponse.response) {
          console.log(errorResponse.response.data.response);
        }
        navigate('/user/login');
      }
    };

    validateAndFetchUserInfo();
  }, [navigate]);

  return (
    <div className="w-customWidthPercent">
      <div className="flex flex-row items-center">
        <div className="w-[20%] mr-3">
          <img
            src={profileTest}
            alt="profile-test"
            className="h-[4.5rem] w-[4.5rem]"
          />
        </div>
        <div className="flex flex-col w-[80%]">
          <div className="font-bold text-[1.2rem]">{user?.nickname}</div>
          <div className="text-[1rem] text-grey-1">{user?.email}</div>
        </div>
      </div>
      <div className="py-[1rem]" />
      <div className="font-bold flex items-center flex-row text-[1.2rem] pb-[0.4rem]">
        <img
          src={home}
          alt="home"
          className="w-[1.2rem] mr-[0.1rem] text-center leading-[1.2rem] h-[1.2rem]"
        />
        찜한 방
      </div>
      <FavoriteRooms />
      <div className="pb-[1rem]" />
      <PlusButton handleClick={handleToMyProperties} />
      <div className="py-[2rem]" />
      <div className="font-bold flex items-center flex-row text-[1.2rem] pb-[0.4rem]">
        <img
          src={loan}
          alt="loan"
          className="w-[1.2rem] mr-[0.1rem] text-center leading-[1.2rem] h-[1.2rem]"
        />
        찜한 대출상품
      </div>
      {likeLoans.length > 0 ? (
        <FavoriteLoans likeLoans={likeLoans[0]} />
      ) : (
        <div className="w-[100%] ">
          <EmptyFavorite />
        </div>
      )}
      <div className="pb-[1rem]" />
      <PlusButton handleClick={handleToMyLoan} />
      <div className="py-[1rem]" />
    </div>
  );
}
