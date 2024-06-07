import "./App.css";
import MainHeader from "./components/common/header/MainHeader";

import SubHeader from "./components/common/header/SubHeader";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <div className="text-3xl underline bg-blue-2">hi</div> */}
      <SubHeader title="상품상세정보"></SubHeader>
      <MainHeader></MainHeader>
      {/* <LargeButton text="eeß" customWidth="w-[80vw]" isActive={1} /> */}
    </>
  );
}

export default App;
