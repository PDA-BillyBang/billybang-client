import React from 'react';
import s from './ConvenientInfo.module.css';

export interface CustomOverlayProps {
  place: {
    place_name: string;
    place_url: string;
    road_address_name?: string;
    address_name: string;
    phone: string;
    x: number;
    y: number;
  };
  onClose: () => void;
}

const CustomOverlay: React.FC<CustomOverlayProps> = ({ place, onClose }) => {
  return (
    <div className={s.placeinfo_wrap} onClick={onClose}>
      <div className={s.placeinfo}>
        <a className={s.title} href={place.place_url} target="_blank" rel="noopener noreferrer" title={place.place_name}>
          {place.place_name}
        </a>
        {place.road_address_name ? (
          <>
            <span className={s.road_address} title={place.road_address_name}>{place.road_address_name}</span>
            <span className={s.jibun} title={place.address_name}>(지번 : {place.address_name})</span>
          </>
        ) : (
          <span className={s.address} title={place.address_name}>{place.address_name}</span>
        )}
        <span className={s.tel}>{place.phone}</span>
      </div>
      <div className={s.after}></div>
    </div>
  );
};

export default CustomOverlay;
