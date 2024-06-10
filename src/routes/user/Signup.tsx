import ProgressBar from "../../components/common/progressbar/ProgressBar";
import React from "react";

export default function Signup() {
  return (
    <>
      <div className="flex flex-nowrap">
        <ProgressBar color="blue-1" /> {/* Tailwind의 blue-900 컬러 */}
        <ProgressBar color="grey-2" /> {/* Tailwind의 gray-200 컬러 */}
        <ProgressBar color="grey-2" /> {/* Tailwind의 gray-200 컬러 */}
      </div>
    </>
  );
}
