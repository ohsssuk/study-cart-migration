import Link from "next/link";
import Checkbox from "../ui/checkbox";
import style from "./cart-item.module.css";
import Image from "next/image";
import NumberStepper from "./number-stepper";
import { CartItemType, OptionType } from "@/types/cart";
import { FC } from "react";

export default function CartItem({
  productId,
  productName,
  productThumbnail,
  productStatus = 1,
  options,
  onRemoveOption,
}: CartItemType & { onRemoveOption: (optionId: number) => void }) {
  const Option: FC<OptionType> = ({
    optionId,
    optionName,
    min,
    current,
    max,
    price,
  }: OptionType) => {
    return (
      <div className={style.option}>
        <div>
          <div className={style.option_name}>{optionName}</div>
          <button
            className={style.remove}
            onClick={() => onRemoveOption(optionId)}
          >
            <Image
              width={12}
              height={12}
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/assets/mobile/img/using_guide/ic-24-close-bold.svg`}
              alt={"삭제"}
            />
          </button>
        </div>

        <div>
          <NumberStepper defaultValue={current} min={min} max={max} />
          <div className={style.price}>
            {new Intl.NumberFormat().format(price)}원
          </div>
        </div>
      </div>
    );
  };

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
            <Option key={`option_${option.optionId}`} {...option} />
          ))}
        </div>
      </div>
    </div>
  );
}
