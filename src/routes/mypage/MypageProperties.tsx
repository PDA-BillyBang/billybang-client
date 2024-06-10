import React, {useEffect} from 'react';
import { useOutletContext } from 'react-router-dom';

export default function MypageProperties() {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('찜한 방');
  }, [setTitle]);

  return (
    <div>
      <div>MypageProperties</div>
    </div>
  );
}
