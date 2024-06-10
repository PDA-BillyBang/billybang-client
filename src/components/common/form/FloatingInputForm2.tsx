import { FloatingLabel } from "flowbite-react";
import React from "react";

type Props = {
  text: string;
};

export default function InputForm({ text }: Props) {
  return (
    <div className="w-full">
      <FloatingLabel
        variant="standard"
        label={text}
        className="text-grey-2 bg-[transparent]"
      />
    </div>
  );
}
