import Image from "next/image";
import style from "./number-stepper.module.css";

export default function NumberStepper() {
  return (
    <div className={style.number_stepper}>
      <button className={style.decrease}>
        <Image
          src="https://crcf.cookatmarket.com/assets/mobile/img/using_guide/ic-count-minus.svg"
          width={18}
          height={18}
          alt={"수량 감소"}
        />
      </button>
      <div className={style.counter}>1</div>
      <button className={style.increase}>
        <Image
          src="https://crcf.cookatmarket.com/assets/mobile/img/using_guide/ic-count-plus.svg"
          width={18}
          height={18}
          alt={"수량 추가"}
        />
      </button>
    </div>
  );
}
