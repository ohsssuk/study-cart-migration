"use client";

import Image from "next/image";
import style from "./ui.module.css";

interface CheckboxProps {
  id: string;
  label?: string;
  width?: number;
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
}
export default function Checkbox({
  id,
  label = "",
  width = 20,
  isChecked = false,
  onChange = () => {},
}: CheckboxProps) {
  const handleChange = () => {
    onChange(!isChecked);
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
              ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/assets/mobile/img/using_guide/ic-checkbox-checked.svg`
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/assets/mobile/img/using_guide/ic-checkbox.svg`
          }
          alt={isChecked ? "체크" : "체크 안함"}
          width={width}
          height={width}
        />
        {label ? (
          <span className={isChecked ? style.checked : ""}>{label}</span>
        ) : null}
      </label>
    </div>
  );
}
