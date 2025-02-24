"use client";

import Progress from "@/components/cart/progress";
import { useCartStore } from "@/store/cartStore";
import { CartItemType } from "@/types/cart";
import CartListSkeleton from "@/components/cart/cart-list-skeleton";
import { useEffect, useState } from "react";
import style from "./page.module.css";
import CartList from "@/components/cart/cart-list";
import { getCustomerId } from "@/util/common";

export default function PurchasePossibleCartList() {
  const { setCheckList, fetchCartData } = useCartStore();
  const [cartList, setCartList] = useState<CartItemType[] | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [customerId, setCustomerId] = useState<string | null>(null);

  useEffect(() => {
    const storedCustomerId = getCustomerId();

    setCustomerId(storedCustomerId);
  }, []);

  useEffect(() => {
    if (cartList === null) {
      return;
    }

    setCheckList(cartList);
  }, [cartList, setCheckList]);

  useEffect(() => {
    if (!customerId) return;

    fetchCartData();
  }, [customerId, fetchCartData]);

  return (
    <>
      <Progress cost={totalCost} />
      <div id={style.possible_purchase_products}>
        {cartList === null ? (
          <CartListSkeleton />
        ) : (
          <CartList cartList={cartList} />
        )}
      </div>
    </>
  );
}
