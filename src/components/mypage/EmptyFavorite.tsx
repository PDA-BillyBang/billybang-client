import { useNavigate } from 'react-router-dom';
type Props = {};

export default function EmptyFavorite({}: Props) {
  const navigate = useNavigate();
  return (
    <div className="w-[100%] h-[110px]  rounded-md flex flex-col items-center justify-center bg-gradient-to-b to-blue-4 from-white-1">
      <div className="text-[1.1rem]">💙</div>
      <div className="mb-[0.3rem] text-[0.9rem]">찜한 상품이 없어요</div>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-1 hover:bg-dark-blue-1 px-[0.4rem] text-[0.8rem] rounded-[0.2rem] py-[0.2rem] text-white-1"
      >
        찜하러 가기
      </button>
    </div>
  );
}
