interface Props {
  text: string;
  customWidth: string;
  isActive: number;
  handleClick?: () => void;
  image?: string;
}

export default function LargeButton({
  text,
  customWidth,
  isActive,
  handleClick,
  image,
}: Props) {
  let buttonStyles;

  switch (isActive) {
    case 0:
      buttonStyles = `bg-blue-1 text-white-1 text-[18px] rounded-[5px] h-[52px] ${customWidth} hover:bg-dark-blue-1`;
      break;
    case 1:
      buttonStyles = `bg-grey-3 text-grey-1 border-[1px] border-grey-1 text-[18px] rounded-[5px] h-[52px] ${customWidth} hover:bg-grey-2`;
      break;
    case 2:
      buttonStyles = `text-[rgb(107 114 128)] bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-[18px] rounded-[5px] h-[52px] ${customWidth} hover:bg-grey-2`;
      break;
    case 3:
      buttonStyles = `bg-blue-1 text-white-1 text-[18px] rounded-[5px] h-[52px] ${customWidth} hover:bg-dark-blue-1 relative`;
      break;
    default:
      buttonStyles = `bg-white-1 text-blue-3 border-[1px] border-blue-3 text-[18px] rounded-[5px] h-[52px] ${customWidth} hover:bg-blue-4`;
      break;
  }

  return (
    <button className={buttonStyles} onClick={handleClick}>
      {isActive === 3 && image ? (
        <div className="flex items-center justify-center w-full">
          <span>{text}</span>
          <img src={image} alt="" className="absolute right-4" />
        </div>
      ) : (
        text
      )}
    </button>
  );
}
