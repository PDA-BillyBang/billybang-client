import React, { useEffect, useState } from 'react';

type Props = {
  message: string;
  duration?: number;
  onClose: () => void;
};

export default function BottomAlert({
  message,
  duration = 2000,
  onClose,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-0  px-4 py-2 mb-8 transform -translate-x-1/2 text-[0.9rem] rounded-md shadow-lg text-black-1 opacity-90 bg-blue-4 z-50 left-1/2 transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-75'
      }`}
    >
      {message}
    </div>
  );
}
