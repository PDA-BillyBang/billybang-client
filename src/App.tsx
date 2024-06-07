import "./App.css";
import LargeButton from "./components/common/button/LargeButton";
import NavigateButton from "./components/common/button/NavigateButton";
import SmallButton from "./components/common/button/SmallButton";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <LargeButton text="확인" customWidth="w-[80vw]" isActive={0} />
      <div className="my-2" />
      <LargeButton text="확인" customWidth="w-[80vw]" isActive={1} />
      <div className="my-2" />
      <LargeButton text="확인" customWidth="w-[80vw]" isActive={2} />
      <div className="my-2" />
      <LargeButton text="확인" customWidth="w-[80vw]" isActive={3} />
      <div className="my-2" />
      <NavigateButton
        text="나에게 맞는 대출 상품이 궁금하다면 로그인하기"
        customWidth="w-[80vw]"
      />
      <div className="my-2" />
      <SmallButton text="매매" isActive={true} />
      <div className="my-2" />
      <SmallButton text="매매" isActive={false} />
      <div className="text-3xl font-CWDangamAsac-Bold text-dark-blue-1">
        빌려방
      </div>
      <div className="text-3xl font-CWDangamAsac-Bold text-blue-1">빌려방</div>
    </>
  );
}

export default App;
