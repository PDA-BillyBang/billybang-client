import React from 'react';
type Props = {};

export default function FavoriteLoanCard({}: Props) {
  return (
    <div className="w-[150px] h-[110px] pl-[0.3rem] pt-[0.3rem] cursor-pointer flex flex-col hover:bg-grey-6 ">
      <div className="text-[0.9rem] font-bold">전세자금대출 신한..</div>
      <div className="flex flex-row items-center pt-[0.3rem]">
        <img
          className="w-[15px] h-[15px]"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAn1BMVEVHcEwARv8ARv8ARv8ARv8ARv8ARv8ARv8ARv8ARv8AQ/8AQP8ARv81Yf9ohv8HTv8DRv8AO/8ARv8ARv+Ppf/K1v+ovP9rkP+uvf+Vqf97lP9cf//Bzf/9///////m7f/U3P8pZP/+/v/r8P82Z/8bUP/k7P/////3+v8ANP8BVP/09/+Bo/+Yrv8pV//C0P+Blv9LeP8AQ/9Abf8lXP+Wl8LwAAAANXRSTlMADD2Mxu3/Fmna//+59un3+/9f4uro09rw9+fo7Oz05/Hk+/Xr+tn/4//r9s/c+9343/Ln7Z7gKkYAAAGsSURBVHgBZJIHlsIwDESDIbMgpZneUjALDmnU+59tHSfb51W/b7WRnE8NxHDkAu5oKAbOb72NJ8SETpPx208mPLAf+IQwkpIZnvhm0xlF88XSJ16tN/PtLqTZ9Iu5kPt4YQJ5FydxnGYHcnsqZpBLdXxngE5nrXWcny+YCduLBypKnV3wCZMqlIDXdjUGZK162MRalUonKwbGZr4J2qy6S9skOn3fa32VwGTgCHRQLRo2MNfJ7ZDmAQMQzhAA35WpdPUZUZ0kc7mzDENnhJZetaHZTlJzu/nElmHkuLBd5tqovD4kf7kI14FV5FuqyurC+FIPweFV6VbpLqIv6H7SaJtanFyfPXVtQ2xf8rVOu+Ct7BsaAlHQEEKA5H1tS8fPfhQBhIua/f2LAI6CRWLowoaK1j65T+5XYydLg5u1oaoga58xnlelUkl9uS9PAEV7pdXBwHG3sot56zjW5xO1Xh51yXZldtnkZnaIHcPA51HV0i67OxMqMlMp34aGUp1fJdzpjwML54tcxfstI5zPo68D606T+BXcNpvAwJDgiX9HzdTZ+jF4osabHQCxgjC9leDtjgAAAABJRU5ErkJggg=="
        />
        <div className="pl-[0.2rem] text-[0.8rem] text-grey-1">신한은행</div>
      </div>
      <div className="py-[0.4rem] text-[0.8rem] font-bold text-blue-1">
        이자율 : 2.4~3.4%
      </div>
      <div className="flex flex-row">
        <div className="bg-grey-5 rounded-[10px] text-[0.7rem] w-[40px] h-[20px] leading-[20px] items-center justify-center text-center">
          2.0억
        </div>
        <div className="pr-[0.2rem]" />
        <div className="bg-grey-5 rounded-[10px] text-[0.7rem] w-[80px] h-[20px] leading-[20px] items-center justify-center text-center">
          LTV 70% 이내
        </div>
      </div>
    </div>
  );
}
