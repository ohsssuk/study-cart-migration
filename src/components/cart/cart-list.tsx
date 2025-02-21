"use client";

import { useCartStore } from "@/store/cartStore";
import Checkbox from "../ui/checkbox";
import CartItem from "./cart-item";
import style from "./cart-list.module.css";
import { CartItemType } from "@/types/cart";

export default function CartList({ cartList }: { cartList: CartItemType[] }) {
  const { isCheckedAll, checkAll } = useCartStore();

  const handleCheckCartAll = (status: boolean) => {
    checkAll(status);
  };

  return (
    <div className={style.cart_list}>
      <div className={style.select_manage}>
        <Checkbox
          id="check_all"
          label="전체 선택"
          isChecked={isCheckedAll()}
          onChange={(status) => handleCheckCartAll(status)}
        />
        <button className={style.select_delete}>선택삭제</button>
      </div>
      <ul>
        {cartList.map((cartItem, index) => (
          <li key={`cart-item-${index}`}>
            <CartItem {...cartItem} />
          </li>
        ))}
      </ul>
    </div>
  );
}
