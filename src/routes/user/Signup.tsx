import React, {useEffect} from 'react';
import { useOutletContext } from 'react-router-dom';

export default function SignUp() {
  const { setTitle } = useOutletContext<{ setTitle: (title: string) => void }>();

  useEffect(() => {
    setTitle('회원가입');
  }, [setTitle]);

  return (
    <div>
      <div>SignUp</div>
    </div>
  );
}
