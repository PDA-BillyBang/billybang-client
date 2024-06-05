import "./App.css";
import LargeButton from "./components/common/button/LargeButton";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="text-3xl underline bg-blue-2">hi</div>
      <LargeButton text="eeß" customWidth="w-[80vw]" isActive={1} />
    </>
  );
}

export default App;
