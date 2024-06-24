type Props = {};

export default function MySkeleton({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center w-customWidthPercent">
      <div className="pb-[1rem]" />

      <div className="w-full bg-grey-6 rounded-[5px] my-[0.4rem] h-[250px] px-[0.8rem] items-center justify-between flex animate-pulse">
        <div className="flex flex-col w-[80%] items-start justify-start h-[250px] pt-[1rem]">
          <div className="w-[80%] h-[1rem] bg-grey-3 rounded mb-[0.4rem]"></div>
          <div className="w-[100%] h-[0.8rem] bg-grey-3 rounded mb-[0.6rem]"></div>
          <div className="w-[100%] h-[0.8rem] bg-grey-3 rounded mb-[0.6rem]"></div>
          <div className="w-[100%] h-[0.8rem] bg-grey-3 rounded mb-[0.6rem]"></div>
        </div>
      </div>

      <div className="w-full bg-grey-6 rounded-[5px] my-[0.4rem] h-[350px] px-[0.8rem] items-center justify-between flex animate-pulse">
        <div className="flex flex-col w-[80%] items-start justify-start h-[250px] pt-[1rem]">
          <div className="w-[80%] h-[1rem] bg-grey-3 rounded mb-[0.4rem]"></div>
          <div className="w-[100%] h-[0.8rem] bg-grey-3 rounded mb-[0.6rem]"></div>
          <div className="w-[100%] h-[0.8rem] bg-grey-3 rounded mb-[0.6rem]"></div>
          <div className="w-[100%] h-[0.8rem] bg-grey-3 rounded mb-[0.6rem]"></div>
        </div>
      </div>
    </div>
  );
}
