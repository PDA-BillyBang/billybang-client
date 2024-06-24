import { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { getNewsByDistrictId } from '@/lib/apis/statistics';
import NewsCardSkeleton from './NewsCardSkeleton';

type Props = { districtId: string };
export interface newsDataI {
  company: string;
  date: string;
  id: number;
  imgUrl: string;
  newsSummary: string;
  newsTitle: string;
  newsUrl: string;
}

export default function AreaNews({ districtId }: Props) {
  const [newsData, setNewsData] = useState<newsDataI[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const handleNewByDistrictId = async (districtNum: number) => {
    try {
      const result = await getNewsByDistrictId(districtNum);
      console.log(result.data.response);
      setNewsData(result.data.response);
    } catch (error: any) {
      console.log('??', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleNewByDistrictId(Number(districtId));
  }, []);
  if (newsData?.length == 0) {
    return (
      <div className="mt-[10rem] text-center text-red-500 flex flex-col justify-center items-center">
        <div className="text-[1.3rem] pb-[0.3rem]">✔️</div>
        뉴스 제공 지역이 아닙니다
      </div>
    );
  }
  return (
    <div className="pt-[1rem]">
      <div className="flex flex-row items-center justify-between">
        <div className="text-[1rem] font-bold">뉴스</div>
        <div className="flex flex-row">
          {/* <SmallButton
            isActive={true}
            text="사건 사고"
            customWidth="min-w-[60px]"
          />
          <div className="px-[0.1rem]" />
          <SmallButton text="부동산" customWidth="w-[50px]" /> */}
        </div>
      </div>
      {loading ? (
        <>
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
        </>
      ) : (
        newsData &&
        newsData.map((news: newsDataI) => (
          <div key={news.id} className="py-[0.3rem]">
            <NewsCard
              id={news.id}
              company={news.company}
              newsUrl={news.newsUrl}
              date={news.date}
              imgUrl={news.imgUrl}
              newsSummary={news.newsSummary}
              newsTitle={news.newsTitle}
            />
          </div>
        ))
      )}
    </div>
  );
}
