import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FavoriteDetailRoomCard from '../../components/mypage/FavoriteDetailRoomCard';
import { getLikeProperties } from '@/lib/apis/property';
import { PropertyI } from './Mypage';

export default function MypageProperties() {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  const [likeProperties, setLikeProperties] = useState<PropertyI[]>([]);

  useEffect(() => {
    setTitle('찜한 방');
  }, [setTitle]);

  const handleGetLikeProperties = async () => {
    try {
      const result = await getLikeProperties();
      setLikeProperties(result.data.response);
    } catch (error) {
      console.log('[ERROR]:', error);
    }
  };

  useEffect(() => {
    handleGetLikeProperties();
  }, []);

  return (
    <div className="pt-[80px] flex flex-col items-center">
      <div className=" w-customWidthPercent">
        {likeProperties.length > 0 &&
          likeProperties.map((property: PropertyI, index) => {
            return (
              <div key={property.id} className="mb-[0.7rem]">
                <FavoriteDetailRoomCard property={property} />
              </div>
            );
          })}
        <div className="py-[1rem]" />
      </div>
    </div>
  );
}
