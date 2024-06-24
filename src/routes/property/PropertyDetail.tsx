import SmallButton from '@components/common/button/SmallButton';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import pin from 'images/pin.svg';
import roomTest from '../../assets/image/test/room-test.svg';
import LikeButton from '@components/common/button/LikeButton';

type Props = {};

export default function PropertyDetail({}: Props) {
  const [likeButtonActive, setLikeButtonActive] = useState<boolean>(true);

  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle('매물상세');
  }, []);

  const handleLikeClick = () => {
    console.log('like loan card');
    setLikeButtonActive((prev) => !prev);
  };

  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="mt-[4rem] w-customWidthPercent">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="font-bold text-[1.5rem]">강일리버파크1단지</div>
            <LikeButton
              isActive={likeButtonActive}
              handleClick={handleLikeClick}
            />
          </div>
          <div className="flex items-center font-thin text-black-3">
            <div className="mr-2">강동구 강일동 665</div>
            <img src={pin} className="w-6"></img>
            <div>로드뷰</div>
          </div>
          <div className="flex gap-1 mt-3">
            <SmallButton
              text="전세"
              isActive={true}
              customWidth="min-w-12"
            ></SmallButton>
            <SmallButton
              text="25년 이내"
              isActive={false}
              customWidth="min-w-12"
            ></SmallButton>
            <SmallButton
              text="방세개"
              isActive={false}
              customWidth="min-w-12"
            ></SmallButton>
            <SmallButton
              text="화장실 두개"
              isActive={false}
              customWidth="min-w-11"
            ></SmallButton>
            <SmallButton
              text="세대당 1대"
              isActive={false}
              customWidth="min-w-11"
            ></SmallButton>
          </div>
        </div>
        <div className="my-3 border-b border-solid border-grey-2"></div>
        <div className="flex-col">
          <img src={roomTest} className="w-full rounded-[5px] "></img>
        </div>

        <div className="flex flex-col bg-grey-5 my-3 gap-y-4 items-center py-5 rounded-[5px] ">
          <div className="flex h-8 w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">매매가</div>
            <div className="w-[80%]">9억 3,000만원</div>
          </div>
          <div className="flex h-8 w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">방향</div>
            <div className="w-[80%]">남동향</div>
          </div>
          <div className="flex h-8 w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">동호수</div>
            <div className="w-[80%]">102동</div>
          </div>
          <div className="flex h-8 w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">면적</div>
            <div className="w-[80%]">84 / 110 m2</div>
          </div>
          <div className="flex h-8 w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">해당층</div>
            <div className="w-[80%]">3 / 12 층</div>
          </div>
          <div className="flex items-center w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">소개</div>
            <div className="w-[80%]">
              대지지분29.5 .입주가능. 관리잘된세대 깨끗합니다.
            </div>
          </div>
          <div className="flex items-center w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">부동산</div>
            <div className="flex flex-col w-[80%] underline decoration-blue-2">
              <div className="flex-col text-blue-2">
                강일탑신도시공인중개사사무소
              </div>
              <div className="flex-col text-blue-2">한경부동산</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
