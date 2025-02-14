import Link from "next/link";
import Checkbox from "../ui/checkbox";
import style from "./cart-item.module.css";
import Image from "next/image";
import NumberStepper from "./number-stepper";
import { CartItemType } from "@/types/cart";

export default function CartItem({
  productId,
  productName,
  productThumbnail,
  productStatus = 1,
  options,
}: CartItemType) {
  return (
    <div className={style.product}>
      <div>
        <Checkbox id={`check_${productId}`} />
      </div>

      <div className={style.inner}>
        <Link href="" className={style.head}>
          <Image
            className={style.product_thumbnail}
            width={64}
            height={64}
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}${productThumbnail}`}
            alt={productName}
          />
          <p className={style.product_name}>{productName}</p>
        </Link>

        <div className={style.option_wrapper}>
          {options.map((option) => (
            <div key={`option_${option.optionId}`} className={style.option}>
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
                <NumberStepper defaultValue={1} />
                <div className={style.price}>
                  {new Intl.NumberFormat().format(option.price)}원
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
