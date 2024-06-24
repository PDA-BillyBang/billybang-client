import React from 'react';
import FavoriteRoomCard from './FavoriteRoomCard';
import { PropertyI } from '@/routes/mypage/Mypage';
type Props = { likeProperties: PropertyI[] };

const data = [1, 2, 3, 4, 5];

export default function FavoriteRooms({ likeProperties }: Props) {
  return (
    <div className="w-[100%]">
      <div className="flex flex-row overflow-auto scroll-hidden">
        {likeProperties.map((property: PropertyI, index: number) => {
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
