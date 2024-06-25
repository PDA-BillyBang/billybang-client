import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

export default function GetViewportSize() {
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = debounce(() => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 1000, {trailing: true, leading: false}); // 1000ms 디바운스 설정

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel(); // 컴포넌트 언마운트 시 디바운스 취소
    };
  }, []);

  return viewportSize;
}
