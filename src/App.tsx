import "./App.css";
import LargeButton from "./components/common/button/LargeButton";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <LargeButton text="확인" customWidth="w-[80vw]" isActive={0} />
      <div className="my-2" />
      <LargeButton text="확인" customWidth="w-[80vw]" isActive={1} />
      <div className="my-2" />
      <LargeButton text="확인" customWidth="w-[80vw]" isActive={2} />
    </>
  );
}

export default App;
