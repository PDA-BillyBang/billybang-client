type Props = {
  text: string;
  customWidth?: string;
  onClick: () => void;
  isActive: boolean;
};

export default function ConvenientButton({
  text,
  isActive,
  customWidth,
  onClick,
}: Props) {
  let buttonStyles;

  switch (isActive) {
    case true:
      buttonStyles = `text-center leading-[30px] text-black-1 bg-grey-8 border-[0.5px] border-grey-2 ${customWidth ? customWidth : 'w-[46px]'} h-[30px] rounded-[20px] text-[12px]`;
      break;
    default:
      buttonStyles = `text-center leading-[30px] text-black-1 bg-grey-7 border-[0.5px] border-grey-2 ${customWidth ? customWidth : 'w-[46px]'} h-[30px] rounded-[20px] text-[12px]`;
      break;
  }

  return (
    <div onClick={onClick}>
      <button className={buttonStyles}>{text}</button>
    </div>
  );
}
