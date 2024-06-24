import { PropertyI } from '@/routes/mypage/Mypage';
import home from '@/assets/image/my/home.svg';
import { useNavigate } from 'react-router-dom';
type Props = { property: PropertyI };

export default function FavoriteRoomCard({ property }: Props) {
  const navigate = useNavigate();
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
      className="w-[150px] h-[170px] cursor-pointer flex flex-col hover:bg-grey-6 "
    >
      <div className="w-[150px] h-[100px]">
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
      <div className="text-[0.9rem] pt-[0.5rem] ml-[0.3rem]">
        {property.buildingName}
      </div>
      <div className="text-[0.7rem] pt-[0.2rem] ml-[0.3rem] text-grey-1">
        {' '}
        {property.tradeType === 'LEASE' ? '전세' : '매매'}{' '}
        {priceFormatter(property.price)} <div>{property.articleName}</div>
      </div>
    </div>
  );
}
