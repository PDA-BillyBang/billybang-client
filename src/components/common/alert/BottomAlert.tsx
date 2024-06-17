import React, { useEffect, useState } from 'react';

type Props = {
  message: string;
  duration?: number;
  onClose: () => void;
};

export default function BottomAlert({
  message,
  duration = 3000,
  onClose,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`z-10 fixed bottom-0 px-8 py-2 mb-8 transform -translate-x-1/2 rounded-[20px] shadow-md text-white-1 bg-grey-1 left-1/2 transition-opacity transition-transform duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {message}
    </div>
  );
}
