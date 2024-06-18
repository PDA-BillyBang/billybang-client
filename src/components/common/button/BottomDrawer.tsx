import React, { ReactNode } from 'react';
import { Button, Drawer } from 'flowbite-react';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
};

export default function BottomDrawer({ isOpen, handleClose, children }: Props) {
  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="bottom"
      className="flex flex-col items-center bg-white-1 rounded-t-[20px] border-t-[0.05rem] border-t-grey-1"
    >
      <button
        className="w-[100px] h-[3px] bg-grey-2 rounded-[10px] mb-[10px]"
        onClick={handleClose}
      ></button>
      <Drawer.Items className="h-[50vh] w-full">{children}</Drawer.Items>
    </Drawer>
  );
}
