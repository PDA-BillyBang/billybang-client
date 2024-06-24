import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import styles from './multiRangeSlider.module.css';

interface MultiRangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  onChange,
}) => {
  const [minVal, setMinVal] = useState(minValue);
  const [maxVal, setMaxVal] = useState(maxValue);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  // Function to convert number to currency format (e.g., 1천만원)
  const formatCurrency = useCallback((value: number): string => {
    if (value >= 100) {
      const 억 = Math.floor(value / 100);
      const 천만원 = value % 100;
      if (천만원 === 0) {
        return `${억}억`;
      } else {
        return `${억}억 ${Math.floor(천만원 / 10)}천만원`;
      }
    } else if (value >= 10) {
      const 천만원 = value / 10;
      return `${Math.floor(천만원)}천만원`;
    } else {
      return `${value}원`;
    }
  },[]);

  // Convert to nearest 1000만원 (10,000,000)
  const roundToNearest10M = useCallback((value: number): number => {
    return Math.round(value / 10) * 10;
  },[])

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
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

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

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

export default MultiRangeSlider;
