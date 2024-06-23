import FavoriteRoomCard from './FavoriteRoomCard';
type Props = {};

const data = [1, 2, 3, 4, 5];

export default function FavoriteRooms({}: Props) {
  return (
    <div className="w-[100%]">
      <div className="flex flex-row overflow-auto scroll-hidden">
        {data.map((value, index) => {
          return (
            <div key={index} className="mr-[0.4rem]">
              <FavoriteRoomCard />
            </div>
          );
        })}
      </div>
    </div>
  );
}
