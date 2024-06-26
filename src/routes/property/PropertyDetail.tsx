import SmallButton from '@components/common/button/SmallButton';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import pin from 'images/pin.svg';
import LikeButton from '@components/common/button/LikeButton';
import { getPropertyDetailInfo } from '@/lib/apis/property';
import { useParams } from 'react-router-dom';
import home from '@/assets/image/my/home.svg';
import PropertyDetailSkeleton from './PropertyDetailSkeleton';

type Props = {};

interface PropertyDetailI {
  area1: number;
  area2: number;
  areaName: string | null;
  articleConfirmYmd: string;
  articleFeatureDesc: string;
  articleName: string;
  articleUrl: string;
  buildingName: string;
  cpName: string;
  direction: string;
  floorInfo: string;
  isStarred: boolean;
  jibeonAddress: string;
  latitude: number;
  longitude: number;
  price: number;
  propertyId: number;
  realEstateType: string;
  realtorName: string;
  representativeImgUrl: string;
  roadAddress: string;
  sameAddrCnt: number;
  tags: string;
  tradeType: string;
}

export default function PropertyDetail({}: Props) {
  const [likeButtonActive, setLikeButtonActive] = useState<boolean>(true);
  const [propertyDetail, setPropertyDetail] = useState<PropertyDetailI>();
  // const navigate= useNavigate()
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const transformTags = (tags: string): string[] => {
    return tags.split(',').map((tag) => tag.trim());
  };

  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  const { id } = useParams<{ id: string }>();
  const handleGetDetail = async () => {
    try {
      const result = await getPropertyDetailInfo(Number(id));
      console.log(result.data.response);
      setPropertyDetail(result.data.response);
      setLikeButtonActive(result.data.response.isStarred);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
    setTitle('매물상세');
    handleGetDetail();
  }, []);

  const handleLikeClick = () => {
    console.log('like loan card');
    setLikeButtonActive((prev) => !prev);
  };

  const handleRealEstateClick = () => {
    if (propertyDetail?.articleUrl) {
      window.open(propertyDetail.articleUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col mt-[5rem] items-center w-full">
        <div className=" w-customWidthPercent">
          <PropertyDetailSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="w-[100%] flex flex-col items-center">
      <div className="mt-[4rem] w-customWidthPercent">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="font-bold text-[1.5rem]">
              {propertyDetail?.articleName}
            </div>
            <LikeButton
              isActive={likeButtonActive}
              handleClick={handleLikeClick}
              isLoan={false}
              propertyId={propertyDetail?.propertyId}
            />
          </div>
          <div className="flex items-center font-thin text-black-3 ">
            <div className="mr-2">{propertyDetail?.jibeonAddress}</div>
            <div
              className="flex cursor-pointer"
              onClick={() => {
                navigate(
                  `/map/roadview?latitude=${propertyDetail?.latitude}&longitude=${propertyDetail?.longitude}&buildingname=${propertyDetail?.buildingName}`
                );
              }}
            >
              <img src={pin} className="w-6"></img>
              <div className="min-w-[3rem]">로드뷰</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            <SmallButton
              text="전세"
              isActive={true}
              customWidth="min-w-12"
            ></SmallButton>
            {propertyDetail &&
              transformTags(propertyDetail?.tags).map((data) => {
                return (
                  <div>
                    <SmallButton
                      text={data}
                      isActive={false}
                      customWidth="min-w-12"
                    ></SmallButton>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="my-3 border-b border-solid border-grey-2"></div>
        <div className="flex-col">
          {propertyDetail?.representativeImgUrl == null ? (
            <div className="flex items-center justify-center w-full h-full rounded-lg bg-grey-5">
              <img
                src={home}
                alt="roomTest"
                className="w-full rounded-[5px] h-[450px] "
              />
            </div>
          ) : (
            <img
              src={
                'https://landthumb-phinf.pstatic.net/' +
                propertyDetail?.representativeImgUrl
              }
              alt="roomTest"
              className="w-full rounded-[5px] h-[450px] "
            />
          )}
        </div>

        <div className="flex flex-col bg-grey-5 my-3 gap-y-4 items-center py-5 rounded-[5px] ">
          <div className="flex h-6 w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">
              {propertyDetail?.tradeType === 'LEASE' ? '전세' : '매매'}가
            </div>
            <div className="w-[80%]">
              {propertyDetail && priceFormatter(propertyDetail?.price)}
            </div>
          </div>
          <div className="flex h-6 w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">방향</div>
            <div className="w-[80%]">{propertyDetail?.direction}</div>
          </div>
          {/* <div className="flex h-8 w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">동호수</div>
            <div className="w-[80%]">102동</div>
          </div> */}
          <div className="flex h-6 w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">면적</div>
            <div className="w-[80%]">
              {propertyDetail?.area2} / {propertyDetail?.area1} ㎡
            </div>
          </div>
          <div className="flex h-6 w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">해당층</div>
            <div className="w-[80%]">{propertyDetail?.floorInfo}층</div>
          </div>
          <div className="flex items-center w-customWidthPercent">
            <div className="w-[20%] text-grey-1">소개</div>
            <div className="w-[80%]">{propertyDetail?.articleFeatureDesc}</div>
          </div>
          <div className="flex items-center w-customWidthPercent">
            <div className="w-[20%] text-grey-1 ">부동산</div>
            <div
              onClick={handleRealEstateClick}
              className="flex flex-col w-[80%] underline decoration-blue-2"
            >
              <div className="flex-col text-blue-2">
                {propertyDetail?.cpName}
              </div>
              <div className="flex-col text-blue-2">
                {propertyDetail?.realtorName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
