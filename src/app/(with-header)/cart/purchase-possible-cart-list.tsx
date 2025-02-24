"use client";

import Progress from "@/components/cart/progress";
import { useCartStore } from "@/store/cartStore";
import CartListSkeleton from "@/components/cart/cart-list-skeleton";
import { useEffect } from "react";
import style from "./page.module.css";
import CartList from "@/components/cart/cart-list";

export default function PurchasePossibleCartList() {
  const { setCheckList, fetchCartData, cartList, cartCost } = useCartStore();

  useEffect(() => {
    if (cartList === null) {
      return;
    }

    setCheckList(cartList);
  }, [cartList, setCheckList]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  return (
    <>
      <Progress cost={cartCost.totalCost} />
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
