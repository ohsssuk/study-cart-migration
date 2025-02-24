"use client";

import Image from "next/image";
import style from "./number-stepper.module.css";
import { useState } from "react";

interface NumberStepperProps {
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function NumberStepper({
  defaultValue = 1,
  min = 1,
  max = 10000,
  onChange = () => {},
}: NumberStepperProps) {
  const [count, setCount] = useState(defaultValue);

  const handleDecrease = () => {
    if (count > min) {
      const newValue = count - 1;
      setCount(newValue);
      onChange(newValue);
    }
  };

  const handleIncrease = () => {
    if (count < max) {
      const newValue = count + 1;
      setCount(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className={style.number_stepper}>
      <button
        className={style.decrease}
        onClick={handleDecrease}
        disabled={count === min}
      >
        <Image
          src={`${
            process.env.NEXT_PUBLIC_IMAGE_BASE_PATH
          }/assets/mobile/img/using_guide/${
            count <= min ? "ic-count-minus-disabled" : "ic-count-minus"
          }.svg`}
          width={18}
          height={18}
          alt={"수량 감소"}
        />
      </button>
      <div className={style.counter}>{count}</div>
      <button
        className={style.increase}
        onClick={handleIncrease}
        disabled={count === max}
      >
        <Image
          src={`${
            process.env.NEXT_PUBLIC_IMAGE_BASE_PATH
          }/assets/mobile/img/using_guide/${
            count >= max ? "ic-count-plus-disabled" : "ic-count-plus"
          }.svg`}
          width={18}
          height={18}
          alt={"수량 추가"}
        />
      </button>
    </div>
  );
}
