import { ReactNode, useEffect, useState } from 'react';
import { Drawer, DrawerProps } from 'flowbite-react';
import drawerUp from '@/assets/image/drawer/drawerUp.svg';
import drawerDown from '@/assets/image/drawer/drawerDown.svg';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  isBackDropped?: boolean;
  position?: DrawerProps['position'];
};

export default function BottomDrawer({
  isOpen,
  handleClose,
  children,
  isBackDropped,
  position,
}: Props) {
  const positionClass = position ? position : 'bottom';
  const isBackDropClass = isBackDropped === false ? isBackDropped : true;
  const [height, setHeight] = useState<string>('h-[50vh]');

  useEffect(() => {
    setHeight('h-[50vh]');
  }, [isOpen]);

  const handleClickHeight = () => {
    setHeight(height === 'h-[50vh]' ? 'h-[90vh]' : 'h-[50vh]');
  };

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      backdrop={isBackDropClass}
      position={positionClass}
      className={`${positionClass === 'left' ? 'mt-16' : 'rounded-t-[20px]'} flex flex-col z-50 items-center bg-white-1 border-t-[0.05rem] border-t-grey-1 transition-all duration-300`}
    >
      {positionClass === 'bottom' ? (
        <div className="relative w-full">
          <img
            src={height == 'h-[50vh]' ? drawerUp : drawerDown}
            alt="drawerUp"
            className="h-[2rem] rounded-lg bg-white-1 w-[3rem] cursor-pointer absolute top-2 left-1/2 transform -translate-x-1/2"
            onClick={handleClickHeight}
          />
          <div
            className={`transition-all duration-300 ${height} w-full pt-[3rem] overflow-y-auto`}
          >
            {children}
          </div>
        </div>
      ) : (
        <Drawer.Items className="h-[50vh] w-full">{children}</Drawer.Items>
      )}
    </Drawer>
  );
}
