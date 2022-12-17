"use client";
import { useEffect, useState } from "react";

type Props = {
  children?: JSX.Element[] | string;
  className?: string;
  [x: string]: any;
};

export default function Button({ children, className, ...otherProps }: Props) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  return (
    <button
      {...otherProps}
      className={`${
        isClicked ? "scale-90" : ""
      } flex justify-evenly gap-2 text-white bg-secondary rounded-lg w-max px-4 py-2 h-max transition ease-out hover:bg-blue-500 ${
        className ? className : ""
      }`}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onMouseOut={() => setIsClicked(false)}
    >
      {children}
    </button>
  );
}

export const SubmitBtn = (props: Props) => (
  <Button {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
    </svg>
    <p>Submit</p>
  </Button>
);
