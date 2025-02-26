"use client";

import Link from "next/link";
import Checkbox from "../ui/checkbox";
import style from "./cart-item.module.css";
import Image from "next/image";
import NumberStepper from "./number-stepper";
import { CartItemType, OptionType } from "@/types/cart";
import { useCartStore } from "@/store/cartStore";
import { getCustomerId } from "@/util/common";

export default function CartItem({
  productId,
  productName,
  productThumbnail,
  options,
}: CartItemType) {
  const { checkList, check } = useCartStore();

  const isChecked = (productId: number): boolean => {
    return checkList.some(
      (item) => item.productId === productId && item.isChecked
    );
  };

  const handleCheckCart = (productId: number) => {
    check(productId);
  };

  return (
    <div className={style.product}>
      <div>
        <Checkbox
          id={`check_${productId}`}
          onChange={() => {
            handleCheckCart(productId);
          }}
          isChecked={isChecked(productId)}
        />
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

function Option({
  optionId,
  optionName,
  min,
  current,
  max,
  price,
}: OptionType) {
  const { fetchCartData } = useCartStore();

  // 옵션 삭제 처리 함수
  const handleRemoveOption = async (optionId: OptionType["optionId"]) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cartData/${getCustomerId()}`,
      {
        method: "DELETE",
        body: JSON.stringify({ optionIds: [optionId] }),
      }
    );

    fetchCartData();
  };

  const handleOptionCount = async (
    count: number,
    optionId: OptionType["optionId"]
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cartData/${getCustomerId()}`,
        {
          method: "POST",
          body: JSON.stringify({ optionId, count }),
        }
      );

      if (response.ok) {
        fetchCartData();
      }
    } catch (error) {
      console.error("Error in handleOptionCount:", error);
    }
  };

  return (
    <div className={style.option}>
      <div>
        <div className={style.option_name}>{optionName}</div>
        <button
          className={style.remove}
          onClick={() => handleRemoveOption(optionId)}
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
        <NumberStepper
          defaultValue={current}
          min={min}
          max={max}
          onChange={(count) => handleOptionCount(count, optionId)}
        />
        <div className={style.price}>
          {new Intl.NumberFormat().format(current * price)}원
        </div>
      </div>
    </div>
  );
}
