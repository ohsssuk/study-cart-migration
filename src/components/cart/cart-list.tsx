"use client";

import Checkbox from "../ui/checkbox";
import CartItem from "./cart-item";
import style from "./cart-list.module.css";

export default function CartList() {
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
        <li>
          {["1", 2, 3, 4].map((_data, index) => (
            <CartItem key={`cart-item-${index}`} />
          ))}
        </li>
      </ul>
    </div>
  );
}
