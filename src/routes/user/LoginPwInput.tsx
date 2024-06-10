import React, {useEffect} from 'react';
import { useOutletContext } from 'react-router-dom';

export default function LoginPwInput() {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('로그인');
  }, [setTitle]);

  return (
    <div>
      <div>LoginPwInput</div>
    </div>
  );
}
