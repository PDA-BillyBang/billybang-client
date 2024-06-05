import "./App.css";
import LargeButton from "./components/common/button/LargeButton";
import NavigateButton from "./components/common/button/NavigateButton";

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
      <NavigateButton
        text="나에게 맞는 대출 상품이 궁금하다면 로그인하기"
        customWidth="w-[80vw]"
      />
    </>
  );
}

export default App;
