import React from 'react';
import { Radio, Label } from 'flowbite-react';

interface RadioOptionProps {
  id: string;
  name: string;
  value: string | boolean;
  selectedOption: string | boolean | undefined;
  onChange: (value: string | boolean | undefined) => void;
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
  // Convert boolean to string for the Radio component
  const stringValue = value.toString();
  const selectedStringValue = selectedOption?.toString();

  return (
    <div className="flex items-center w-full gap-2">
      <Radio
        className="h-[2.5rem]"
        id={id}
        name={name}
        value={stringValue}
        checked={selectedStringValue === stringValue}
        onChange={() => onChange(value)}
      />
      <Label className="text-[1.2rem]" htmlFor={id}>
        {label}
      </Label>
    </div>
  );
};

export default RadioOption;
