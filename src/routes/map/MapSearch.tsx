import { Navbar } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import search from 'images/search.svg';
import pin from 'images/pin.svg';

type Props = {};

export default function MapSearch({}: Props) {
  const navigate = useNavigate();
  const [array, setArray] = useState<string[]>([
    '서울특별시 성동구 성수동1가',
    '서울특별시 성동구 성수동2가',
    '서울특별시 성동구 성수동3가',
    '서울특별시 성동구 성수동4가',
    '서울특별시 성동구 성수동5가',
  ]);

  return (
    <div>
      <Navbar className="flex h-16">
        <div className="flex w-full">
          <input
            className="flex-grow ml-2 text-[1.2rem] px-2 py-1"
            type="search"
            placeholder="자치구 or 행정동을 입력하세요"
            required
            style={{ minWidth: '200px' }}
          />
          <div className="flex items-center px-2">
            <img className="h-6" src={search} alt="Search Icon" />
          </div>
        </div>
      </Navbar>
      <div>
        <ul>
          {array.map((element, index) => (
            <li key={index} className="h-12 flex flex-col justify-center">
              <div className="flex text-[1.2rem] pl-3 items-center">
                <img className="mr-2" src={pin} alt="Pin Icon" />
                <div>{element}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
