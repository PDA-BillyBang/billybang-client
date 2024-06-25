import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import search from 'images/search.svg';
import pin from 'images/pin.svg';
import jsonData from '../../assets/json/output.json'; // JSON 파일 경로에 맞게 수정하십시오.

interface Location {
  code: string;
  attempt: string;
  city: string;
  district: string;
  sub_district: string;
  latitude: string;
  longitude: string;
  code_type: string;
}

export default function MapSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [filteredArray, setFilteredArray] = useState<Location[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = jsonData.filter((item: Location) =>
        `${item.attempt} ${item.city} ${item.district} ${item.sub_district}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setFilteredArray(filtered);
    } else {
      setFilteredArray([]);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // MapSearch 컴포넌트 내에 highlightSearchText 함수 정의
  const highlightSearchText = (text: string, query: string) => {
    // 검색어가 없으면 그냥 반환
    if (!query || query.length === 0) {
      return text;
    }

    // 검색어와 일치하는 부분을 파란색으로 하이라이트 처리
    const lowerCaseQuery = query.toLowerCase();
    // const lowerCaseText = text.toLowerCase();

    // 정규식을 사용하여 모든 일치하는 부분을 파란색으로 하이라이트 처리
    const regex = new RegExp(`(${lowerCaseQuery})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part.toLowerCase()) ? (
        <span key={index} className="text-blue-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleClickedSearchButtion = (lat: string, lon: string) => {
    const state = {
      lat: Number(lat),
      lon: Number(lon),
      level: 3,
    };

    navigate('/', { state });
  };

  return (
    <div className="font-NanumSquareRound">
      <div className="flex h-16">
        <div className="flex w-full">
          <input
            className="flex-grow text-[1.2rem] px-2 py-1"
            type="search"
            placeholder="자치구 or 행정동을 입력하세요"
            value={query}
            onChange={handleInputChange}
            required
            style={{ minWidth: '200px' }}
          />
          <div className="flex md:order-2 items-center px-2">
            <img
              className="flex h-[2rem] cursor-pointer"
              src={search}
              alt="Search Icon"
            />
          </div>
        </div>
      </div>
      <div>
        <ul>
          {filteredArray.map((element, index) => (
            <li
              key={index}
              className="h-12 flex flex-col justify-center hover:bg-grey-4 cursor-pointer"
              onClick={() =>
                handleClickedSearchButtion(element.latitude, element.longitude)
              }
            >
              <div className="flex text-[1.2rem] pl-3 items-center ">
                <img className="mr-2" src={pin} alt="Pin Icon" />
                <div>
                  {/* 검색어와 일치하는 부분을 파란색으로 하이라이트 처리 */}
                  {highlightSearchText(
                    `${element.attempt} ${element.city} ${element.district} ${element.sub_district}`,
                    query
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
