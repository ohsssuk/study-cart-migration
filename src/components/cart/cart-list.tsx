"use client";

import Checkbox from "../ui/checkbox";
import CartItem from "./cart-item";
import style from "./cart-list.module.css";
import { CartItemType } from "@/types/cart";

export default function CartList({ cartList }: { cartList: CartItemType[] }) {
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
        {cartList.map((cartItem, index) => (
          <li
            className={style[`cart_item_${index}`]}
            key={`cart-item-${index}`}
          >
            <CartItem {...cartItem} />
          </li>
        ))}
      </ul>
    </div>
  );
}
