"use client";

import { useEffect, useState } from "react";
import Checkbox from "../ui/checkbox";
import CartItem from "./cart-item";
import style from "./cart-list.module.css";
import { CartItemType } from "@/types/cart";

export default function CartList() {
  const [cartData, setCartData] = useState<CartItemType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getCartData");

        if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다.");

        const data: CartItemType[] = await response.json();

        setCartData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
            <CartItem {...cartItem} />
          </li>
        ))}
      </ul>
    </div>
  );
}
