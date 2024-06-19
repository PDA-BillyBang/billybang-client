import React, { ReactNode } from 'react';
import { Button, Drawer, DrawerProps } from 'flowbite-react';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  isBackDropped? : boolean;
  position? : DrawerProps["position"];
};

export default function BottomDrawer({ isOpen, handleClose, children, isBackDropped, position }: Props) {
  const positionClass = position ? position : 'bottom';
  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      backdrop={isBackDropped}
      position={positionClass}
      className="flex flex-col items-center bg-white-1 border-t-[0.05rem] border-t-grey-1 mt-16"
    >
    {positionClass==='bottom' &&
        <button
      className="w-[100px] h-[3px] bg-grey-2 rounded-[10px] mb-[10px]"
      onClick={handleClose}
    ></button>
    }
      <Drawer.Items className="h-[50vh] w-full">{children}</Drawer.Items>
    </Drawer>
  );
}
