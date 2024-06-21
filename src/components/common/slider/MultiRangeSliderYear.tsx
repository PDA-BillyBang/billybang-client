import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import styles from './multiRangeSlider.module.css';

interface MultiRangeSliderProps {
  min: number;
  max: number;
}

const MultiRangeSliderYear: FC<MultiRangeSliderProps> = ({ min, max }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  const formatCurrency = (value: number): string => {
    const year = Math.floor(value / 12);
    const month = value % 12;
    if (month == 0) {
      return `${year}년`;
    } else if (year == 0) {
      return `${month}개월`;
    } else {
      return `${year}년 ${month}개월`;
    }
  };

  const roundToNearest10M = (value: number): number => {
    return value;
  };

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="flex flex-col">
      <div className="py-[1rem] text-blue-1 font-bold">
        {minVal === min && maxVal === max ? (
          <span>전체</span>
        ) : (
          <span>
            {formatCurrency(minVal)} ~{' '}
            {maxVal === max
              ? `${formatCurrency(maxVal)}+`
              : formatCurrency(maxVal)}
          </span>
        )}
      </div>
      <div>
        <div className={styles.slider}>
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = roundToNearest10M(Number(event.target.value));
              setMinVal(value);
              minValRef.current = value;
            }}
            className={`${styles.thumb} ${styles.thumbLeft} `}
            style={{ zIndex: minVal > max - 10 ? 5 : 3 }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const value = roundToNearest10M(Number(event.target.value));
              setMaxVal(value);
              maxValRef.current = value;
            }}
            className={`${styles.thumb} ${styles.thumbRight}`}
          />
          <div className={`${styles.slider__track} bg-grey-4 h-[0.2rem]`}></div>
          <div
            ref={range}
            className={`${styles.slider__range} bg-blue-1 h-[0.2rem]`}
          ></div>
          <div className={styles.slider__left_value}>
            {formatCurrency(minVal)}
          </div>
          <div className={styles.slider__right_value}>
            {maxVal === max
              ? `${formatCurrency(maxVal)}+`
              : formatCurrency(maxVal)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSliderYear;
