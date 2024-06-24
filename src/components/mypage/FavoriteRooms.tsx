import FavoriteRoomCard from './FavoriteRoomCard';
import { PropertyI } from '@/routes/mypage/Mypage';
type Props = { likeProperties: PropertyI[] };

export default function FavoriteRooms({ likeProperties }: Props) {
  return (
    <div className="w-[100%]">
      <div className="flex flex-row overflow-auto scroll-hidden">
        {likeProperties.map((property: PropertyI) => {
          return (
            <div key={property.id} className="mr-[0.4rem]">
              <FavoriteRoomCard property={property} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
