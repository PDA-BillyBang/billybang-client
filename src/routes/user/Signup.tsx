import ProgressBar from "../../components/common/progressbar/ProgressBar";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function SignUp() {
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();

  useEffect(() => {
    setTitle("회원가입");
  }, [setTitle]);

  return (
    <>
      <div className="flex flex-nowrap">
        <ProgressBar color={0} /> {/* Tailwind의 blue-900 컬러 */}
        <ProgressBar color={1} /> {/* Tailwind의 gray-200 컬러 */}
        <ProgressBar color={2} /> {/* Tailwind의 gray-200 컬러 */}
      </div>
    </>
  );
}
