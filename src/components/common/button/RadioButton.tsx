import React from "react";
import { Radio, Label } from "flowbite-react";

interface RadioOptionProps {
  id: string;
  name: string;
  value: string;
  selectedOption: string | undefined;
  onChange: (value: string) => void;
  label: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  id,
  name,
  value,
  selectedOption,
  onChange,
  label,
}) => {
  return (
    <div className="flex w-full items-center gap-2">
      <Radio
        className="h-[2.5rem]"
        id={id}
        name={name}
        value={value}
        checked={selectedOption === value}
        onChange={() => onChange(value)}
      />
      <Label className="text-[1.2rem]" htmlFor={id}>
        {label}
      </Label>
    </div>
  );
};

export default RadioOption;
