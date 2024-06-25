import { useEffect, useState } from 'react';
import shin from '../../assets/image/test/shin.svg';
import NavigateButton from '@components/common/button/NavigateButton';
import LikeButton from '@components/common/button/LikeButton';
import { useNavigate } from 'react-router-dom';
import { Property } from '@/utils/types';
import { getBestLoans } from '@/lib/apis/loan';
// import MySkeleton from '@/routes/mypage/MySkeleton';
import LoanSkeleton from '@/routes/loan/LoanSkeleton';
// import { getLikeProperties } from '@/lib/apis/property';

type Props = {
  bottomButton?: boolean;
  property: Property;
};

interface BestLoan {
  loanId: number;
  loanLimit: number;
  ltv: number;
  maxInterestRate: number;
  minInterestRate: number;
  productName: string;
  providerImgUrl: string;
  providerName: string;
}

export default function PropertyLoan({ bottomButton, property }: Props) {
  const [likeButtonActive, setLikeButtonActive] = useState<boolean>(
    property.isStarred ?? false
  );

  const [bestLoan, setBestLoan] = useState<BestLoan>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleClickToLoans = async () => {
    navigate(`/loan/recommend/${property.propertyId}`);
  };

  useEffect(() => {
    async function fetchBestLoan() {
      try {
        const result = await getBestLoans({
          propertyId: property.propertyId,
          tradeType: property.tradeType,
          area2: property.area2,
          price: property.price,
        });

        setBestLoan(result.data.response[0].loan);
        console.log('Best loan:', result.data.response[0]);
      } catch (error) {
        console.error('Error fetching best loan:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBestLoan();
  }, [property]);

  const handleLikeClick = () => {
    setLikeButtonActive((prev) => !prev);
  };

  const priceFormatter = (price: number): string => {
    const 억 = Math.floor(price / 100);
    const 천만 = Math.floor((price % 100) / 10);
    const 백만 = price % 10;

    if (억 === 0) {
      return `${천만},${백만}00만`;
    }
    if (천만 === 0) {
      if (백만 === 0) {
        return `${억}억`;
      }
      return `${억}억 ${백만}00만`;
    }

    return `${억}억 ${천만},${백만}00만`;
  };

  useEffect(() => {
    console.log('[property]', property);
  }, []);

  if (loading) {
    return (
      <div className="pb-[10rem] w-full flex items-center justify-center flex-col">
        <LoanSkeleton />
      </div>
    );
  }

  return (
    <div
      className={`w-[100%] flex flex-col ${bottomButton ? 'h-[50vh]' : 'h-[310px]'}  justify-between`}
    >
      <div className="flex flex-col">
        <div className="font-bold text-[1.2rem] justify-between flex flex-row">
          <div>{property.articleName}</div>
          <LikeButton
            isActive={likeButtonActive}
            handleClick={handleLikeClick}
            isLoan={false}
            propertyId={property.propertyId}
          />
        </div>

        <div className="text-[0.8rem]">
          {property.roadAddress}
          {/* {property.jibeonAddress} */}
        </div>

        <div className="text-[0.8rem]">
          {getRealEstateTypeString(property.realEstateType)} |{' '}
          {property.floorInfo}층 | 공급 {property.area1}㎡ / 전용{' '}
          {property.area2}㎡
        </div>
        <div className="py-[0.2rem]" />
        <div className="bg-grey-5 h-[5rem] flex flex-row rounded-[10px] items-center shadow-md">
          <div className="flex flex-col w-[50%] items-center">
            <div className="font-bold text-blue-2 text-[0.9rem]">매매가</div>
            <div className="font-bold">
              {property.tradeType === 'DEAL'
                ? priceFormatter(property.price)
                : '-'}
            </div>
          </div>
          <div className="bg-grey-1 w-[0.01rem] h-[3.5rem]" />
          <div className="flex flex-col w-[50%] items-center">
            <div className="font-bold text-red-1 text-[0.9rem]">전세가</div>
            <div className="font-bold">
              {property.tradeType === 'LEASE'
                ? priceFormatter(property.price)
                : '-'}
            </div>
          </div>
        </div>
        <div className="pb-[0.6rem]" />
        <div className="bg-grey-5 flex flex-col py-[0.4rem] px-[0.8rem] h-[7.5rem] rounded-[10px] shadow-md">
          <div className="flex flex-row">
            <img
              src={shin}
              className="w-[20px] h-[20px] mr-[0.1rem] mt-[0.2rem]"
            />
            <div className="ml-[0.4rem] flex flex-col w-[100%]">
              <div className="font-bold text-[1rem]">
                {bestLoan?.providerName}
              </div>
              <div className="text-[1rem]">{bestLoan?.productName}</div>
              <div className="flex flex-row justify-between">
                <div className="text-[0.8rem]">
                  {bestLoan?.loanLimit ? priceFormatter(bestLoan.loanLimit) : 0}
                  , LTV {bestLoan?.ltv}%이내
                </div>
                <div className="text-[0.8rem] font-bold">
                  {bestLoan?.minInterestRate}~{bestLoan?.maxInterestRate}%
                </div>
              </div>
            </div>
          </div>
          <div className="pt-[0.5rem]" />
          <NavigateButton
            text={`${property.buildingName}의 추천 대출 상품 더 보기`}
            customWidth="w-[100%]"
            handleClick={handleClickToLoans}
          />
        </div>
      </div>
    </div>
  );
}

const getRealEstateTypeString = (realEstateType: string): string => {
  switch (realEstateType) {
    case 'APT':
      return '아파트';
    case 'VL':
      return '빌라';
    case 'DDDGG':
      return '단독주택';
    case 'SGJT':
      return '상가주택';
    case 'OPST':
      return '오피스텔';
    case 'OR':
      return '원룸';
    case 'HOJT':
      return '한옥주택';
    case 'JWJT':
      return '전원주택';
    default:
      return realEstateType;
  }
};
