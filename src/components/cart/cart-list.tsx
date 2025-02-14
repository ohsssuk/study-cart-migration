"use client";

import Checkbox from "../ui/checkbox";
import CartItem from "./cart-item";
import style from "./cart-list.module.css";
import { CartItemType, OptionType } from "@/types/cart";

export default function CartList({
  cartData,
  onCartDataUpdate = () => {},
}: {
  cartData: CartItemType[];
  onCartDataUpdate?: () => void;
}) {
  // 옵션 삭제 처리 함수
  const handleRemoveOption = async (optionId: OptionType["optionId"]) => {
    await fetch(`/api/cartData`, {
      method: "DELETE",
      body: JSON.stringify({ optionIds: [optionId] }),
    });

    onCartDataUpdate();
  };

  return (
    <div className={style.cart_list}>
      <div className={style.select_manage}>
        <Checkbox
          id="check_all"
          label="전체 선택"
          onChange={(isChecked) => console.log(isChecked)}
        />
        <button className={style.select_delete}>선택삭제</button>
      </div>
      <ul>
        {cartData.map((cartItem, index) => (
          <li
            className={style[`cart_item_${index}`]}
            key={`cart-item-${index}`}
          >
            <CartItem {...cartItem} onRemoveOption={handleRemoveOption} />
          </li>
        ))}
      </ul>
    </div>
  );
}
