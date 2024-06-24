import React, { useState, useEffect } from 'react';
import { newsDataI } from './AreaNews';

export default function NewsCard({
  company,
  date,
  id,
  imgUrl,
  newsSummary,
  newsTitle,
  newsUrl,
}: newsDataI) {
  const [truncatedTitle, setTruncatedTitle] = useState(newsTitle);
  const [truncatedSummary, setTruncatedSummary] = useState(newsSummary);

  const handleToNewsUrl = () => {
    window.open(newsUrl);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const updateTextLengths = () => {
    const width = window.innerWidth;
    if (width < 400) {
      setTruncatedTitle(truncateText(newsTitle, 15));
      setTruncatedSummary(truncateText(newsSummary, 35));
    } else if (width < 600) {
      setTruncatedTitle(truncateText(newsTitle, 20));
      setTruncatedSummary(truncateText(newsSummary, 40));
    } else if (width < 900) {
      setTruncatedTitle(truncateText(newsTitle, 30));
      setTruncatedSummary(truncateText(newsSummary, 100));
    } else {
      setTruncatedTitle(truncateText(newsTitle, 40));
      setTruncatedSummary(truncateText(newsSummary, 100));
    }
  };

  useEffect(() => {
    updateTextLengths();
    window.addEventListener('resize', updateTextLengths);
    return () => {
      window.removeEventListener('resize', updateTextLengths);
    };
  }, [newsTitle, newsSummary]);

  return (
    <div
      onClick={handleToNewsUrl}
      className="w-full hover:bg-grey-5 cursor-pointer bg-grey-6 rounded-[5px] h-[140px] px-[0.8rem] items-center justify-between flex"
    >
      <img className="w-[25%] h-[120px]" src={imgUrl} />
      <div className="flex flex-col w-[70%] h-[120px] justify-between">
        <div className="flex flex-col w-[100%] items-start justify-start h-[80px]">
          <div className="pb-[0.2rem]">{truncatedTitle}</div>
          <div className="text-[0.8rem] text-grey-1">{truncatedSummary}</div>
        </div>
        <div className="text-[0.8rem] text-grey-1">
          {date} | {company}
        </div>
      </div>
    </div>
  );
}
