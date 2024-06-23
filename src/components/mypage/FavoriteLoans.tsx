import FavoriteLoanCard from './FavoriteLoanCard';
type Props = {};

const data = [1, 2, 3, 4, 5];

export default function FavoriteLoans({}: Props) {
  return (
    <div className="w-[100%]">
      <div className="flex flex-row overflow-auto scroll-hidden">
        {data.map((value: number, index) => {
          return (
            <div key={index} className="mr-[0.4rem]">
              <FavoriteLoanCard />
            </div>
          );
        })}
      </div>
    </div>
  );
}
