"use client";

import { useEffect, useState } from "react";
import Checkbox from "../ui/checkbox";
import CartItem from "./cart-item";
import style from "./cart-list.module.css";
import { CartItemType, OptionType } from "@/types/cart";

export default function CartList() {
  const [cartData, setCartData] = useState<CartItemType[]>([]);

  const fetchCartData = async () => {
    try {
      const response = await fetch("/api/cartData", { method: "GET" });

      if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다.");

      const data: CartItemType[] = await response.json();

      setCartData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 옵션 삭제 처리 함수
  const handleRemoveOption = async (optionId: OptionType["optionId"]) => {
    await fetch("/api/cartData", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ optionIds: [optionId] }),
    });

    fetchCartData(); // 데이터가 삭제된 후 다시 불러오기
  };

  useEffect(() => {
    fetchCartData();
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
            <CartItem {...cartItem} onRemoveOption={handleRemoveOption} />
          </li>
        ))}
      </ul>
    </div>
  );
}
