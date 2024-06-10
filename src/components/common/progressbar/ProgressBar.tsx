// src/components/common/progressbar/ProgressBar.tsx
import React from "react";

type Props = {
  color?: number;
};

export default function ProgressBar({ color }: Props) {
  let progressBarStyles;

  switch (color) {
    case 0:
      progressBarStyles = `h-1.5 w-1/3 mx-2 bg-blue-1`;
      break;
    case 1:
      progressBarStyles = `h-1.5 w-1/3 mx-2 bg-grey-2`;
      break;
    default:
      progressBarStyles = `h-1.5 w-1/3 mx-2 bg-[black]`;
      break;
  }

  return <div className={progressBarStyles} />;
}
