import Link from "next/link";
import Checkbox from "../ui/checkbox";
import style from "./cart-item.module.css";
import Image from "next/image";
import NumberStepper from "./number-stepper";

export default function CartItem() {
  return (
    <div className={style.product}>
      <div>
        <Checkbox id="25" />
      </div>

      <div className={style.inner}>
        <Link href="" className={style.head}>
          <Image
            className={style.product_thumbnail}
            width={64}
            height={64}
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/product/images/2024/10/xifi_1728290388_2661_120.jpg`}
            alt={"바로쿠캣 밥도둑 5종 (깐새우장/양념꼬막장/순살게장)"}
          />
          <p className={style.product_name}>
            바로쿠캣 밥도둑 5종 (깐새우장/양념꼬막장/순살게장)
          </p>
        </Link>

        <div className={style.option}>
          <div>
            <div className={style.option_name}>양념 꼬막장 200g</div>
            <button className={style.remove}>
              <Image
                width={12}
                height={12}
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/assets/mobile/img/using_guide/ic-24-close-bold.svg`}
                alt={"삭제"}
              />
            </button>
          </div>

          <div>
            <NumberStepper />
            <div className={style.price}>9,500원</div>
          </div>
        </div>
      </div>
    </div>
  );
}
