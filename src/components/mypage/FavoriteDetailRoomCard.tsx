import { useState, useEffect } from 'react';
import home from '@/assets/image/my/home.svg';
import LikeButton from '../common/button/LikeButton';
import { PropertyI } from '@/routes/mypage/Mypage';
import { useNavigate } from 'react-router-dom';
type Props = { property: PropertyI };

export default function FavoriteDetailRoomCard({ property }: Props) {
  const [likeActive, setLikeActive] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLikeClick = () => {
    console.log('like');
    setLikeActive((prev) => !prev);
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

  return (
    <div
      onClick={() => navigate('/property/' + property.id)}
      className="w-[100%] hover:bg-grey-5 bg-grey-6 h-[150px] cursor-pointer flex flex-row rounded-[10px]"
    >
      <div className="w-[40%] pl-[0.3rem] flex justify-center items-center">
        {property.representativeImgUrl == null ? (
          <div className="flex items-center justify-center w-full h-full rounded-lg bg-grey-5">
            <img
              src={home}
              alt="roomTest"
              className="object-cover w-[40px] h-[40px]"
            />
          </div>
        ) : (
          <img
            src={
              'https://landthumb-phinf.pstatic.net/' +
              property.representativeImgUrl
            }
            alt="roomTest"
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="w-[1%]" />
      <div className="flex flex-col justify-between w-[59%] py-[10px]">
        <div>
          <div className="font-bold w-[100%] justify-between items-center pr-[0.8rem] text-[1rem] flex flex-row">
            <div>{property.buildingName}</div>
            <LikeButton
              handleClick={handleLikeClick}
              isActive={likeActive}
              isLoan={false}
              propertyId={property.id}
            />
          </div>
          <div className="flex flex-row items-baseline">
            <div className="text-grey-1 text-[1rem] font-bold pr-[0.1rem]">
              {property.tradeType === 'LEASE' ? '전세' : '매매'}{' '}
            </div>
            <div className="text-grey-1 text-[0.9rem] font-bold text-end pl-[0.1rem]">
              {priceFormatter(property.price)}
            </div>
          </div>
        </div>
        <div>
          <div className="text-[0.9rem]">{property.articleName}</div>
          <div className="text-[0.9rem]">
            {property.area1}/{property.area2}m²
          </div>
          <div className="text-[0.9rem]">{property.floorInfo}층</div>
        </div>
      </div>
    </div>
  );
}
