import React, { ReactNode, useEffect, useState } from 'react';
import { Drawer } from 'flowbite-react';
import drawerUpDown from '@/assets/image/drawer/drawerUpDown.svg';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
};

export default function BottomDrawerUp({
  isOpen,
  handleClose,
  children,
}: Props) {
  const [height, setHeight] = useState<string>('h-[50vh]');

  const handleClickHeight = () => {
    setHeight(height === 'h-[50vh]' ? 'h-[90vh]' : 'h-[50vh]');
  };

  useEffect(() => {
    setHeight('h-[50vh]');
  }, [isOpen]);

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="bottom"
      className="flex flex-col z-50 items-center bg-white-1 rounded-t-[20px] border-t-[0.05rem] border-t-grey-1 transition-all duration-300"
    >
      <div className="relative w-full">
        <img
          src={drawerUpDown}
          alt="drawerUp"
          className="h-[2rem] rounded-full border-[0.1rem] border-grey-1 bg-white-1 w-[2rem] cursor-pointer absolute top-2 left-1/2 transform -translate-x-1/2"
          onClick={handleClickHeight}
        />
        <div
          className={`transition-all duration-300 ${height} w-full pt-[3rem] overflow-y-auto`}
        >
          {children}
        </div>
      </div>
    </Drawer>
  );
}
