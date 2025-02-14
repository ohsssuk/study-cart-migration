"use client";

import Progress from "@/components/cart/progress";
import style from "./page.module.css";
import CartList from "@/components/cart/cart-list";
import BlankLine from "@/components/ui/blank-line";
import { useEffect, useState } from "react";
import { CartItemType } from "@/types/cart";

export default function Page() {
  const [progressCost, setProgressCost] = useState<number>(0);
  const [cartData, setCartData] = useState<CartItemType[]>([]);

  const fetchCartData = async () => {
    try {
      const response = await fetch(`/api/cartData`, { method: "GET" });

      if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다.");

      const { cartCost, cartData } = await response.json();
      const { totalCost } = cartCost;

      setProgressCost(totalCost);
      setCartData(cartData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div>
      <Progress cost={progressCost} />
      <div className={style.cart_list_wrapper}>
        <CartList cartData={cartData} onCartDataUpdate={fetchCartData} />
      </div>
      <BlankLine />
    </div>
  );
}
