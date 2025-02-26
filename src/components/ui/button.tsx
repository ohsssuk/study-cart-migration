"use client";

import { ReactNode } from "react";
import style from "./ui.module.css";

interface ButtonProps {
  width?: number;
  disabled?: false;
  onCick?: () => void;
  children: ReactNode;
}
export default function Button({
  width,
  disabled = false,
  onCick = () => {},
  children,
}: ButtonProps) {
  const handleCick = () => {
    onCick();
  };

  return (
    <button
      style={{ width: width ?? "100%" }}
      disabled={disabled}
      className={style.button}
      onClick={handleCick}
    >
      {children}
    </button>
  );
}
