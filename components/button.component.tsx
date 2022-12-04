"use client";
import { useEffect, useState } from "react";

type Props = {
  children: JSX.Element[] | string;
  className?: string;
  [x: string]: any;
};

export default function Button({ children, className, ...otherProps }: Props) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    console.log(isClicked);
  });

  return (
    <button
      {...otherProps}
      className={`${
        isClicked ? "scale-90" : ""
      } flex justify-evenly gap-2 text-white bg-secondary rounded-lg w-max px-4 py-2 h-max transition ease-out hover:bg-blue-500 ${className}`}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onMouseOut={() => setIsClicked(false)}
    >
      {children}
    </button>
  );
}
