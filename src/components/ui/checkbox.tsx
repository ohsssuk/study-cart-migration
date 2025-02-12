"use client";

import Image from "next/image";
import { useState } from "react";
import style from "./ui.module.css";

interface CheckboxProps {
  label?: string;
  id: string;
}
export default function Checkbox({ label = "", id }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  return (
    <div className={style.checkbox}>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className={style.checkbox_input}
      />
      <label htmlFor={id} className={style.checkbox_label}>
        <Image
          src={
            isChecked
              ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/using_guide/ic-checkbox-checked.svg`
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/using_guide/ic-checkbox.svg`
          }
          alt={isChecked ? "체크" : "체크 안함"}
          width={20}
          height={20}
        />
        <span className={isChecked ? style.checked : ""}>{label}</span>
      </label>
    </div>
  );
}
