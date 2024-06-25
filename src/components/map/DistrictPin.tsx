type Props = {
  price: number; // 가격 (100만원 단위)
  handleClick: (latitude: number, longitude: number) => void // 클릭시 해당 구로 이동
  count: number; // 개수
  name: string;
  latitude: number;
  longitude: number;
  isGu?: boolean;
};

export default function DistrictPin({
  price,
  handleClick,
  count,
  name,
  latitude,
  longitude,
  isGu
}: Props) {
  return (
    <div
      className="flex flex-col items-start justify-end cursor-pointer bg-transparent absolute select-none bottom-2 min-w-14"
      onClick={() => handleClick(latitude, longitude)}
    >
      <div
        className={`${isGu?'bg-yellow-1':'bg-red-1'} ${name.length>=5?'text-xs':'text-sm'} min-w-full h-7 rounded-tl-2xl rounded-tr-2xl text-sm flex items-center justify-center text-white-1 font-semibold relative shadow-lg`}
      >
        {name}
        {count >= 2 && (
          <div
            className='w-4 h-4 -top-1 -right-2 text-xs absolute flex items-center justify-center bg-grey-3 rounded-full text-black-1 font-semibold z-20 shadow-lg'
          >
            {count}
          </div>
        )}
      </div>
      <div
        className='min-w-full h-7 rounded-br-xl text-sm bg-white-1 flex items-center justify-center text-black-1 font-semibold border border-grey-3 shadow-lg'
      >
        {price / 100}억
      </div>
    </div>
  );
}
