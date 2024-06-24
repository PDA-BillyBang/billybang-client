type Props = {
  customWidth: string;
  selectActive?: number;
  handleClick?: (index: number) => void;
  leftText?: string;
  rightText?: string;
};

export default function SelectHeader({
  customWidth,
  selectActive,
  handleClick,
  leftText,
  rightText,
}: Props) {
  let buttonLeftStyles;
  let buttonRightStyles;

  switch (selectActive) {
    case 0:
      buttonRightStyles = `border-grey-2 text-grey-2`;
      buttonLeftStyles = `border-black-1 text-black-1`;
      break;
    default:
      buttonLeftStyles = `border-grey-2 text-grey-2`;
      buttonRightStyles = `border-black-1 text-black-1`;
      break;
  }

  return (
    <div className={`${customWidth} flex flex-row `}>
      <div
        className={`w-[50%] text-center border-b-[0.1rem] cursor-pointer ${buttonLeftStyles}`}
        onClick={() => handleClick && handleClick(0)}
      >
        {leftText}
      </div>
      <div
        className={`w-[50%] text-center border-b-[0.1rem] cursor-pointer ${buttonRightStyles}`}
        onClick={() => handleClick && handleClick(1)}
      >
        {rightText}
      </div>
    </div>
  );
}
