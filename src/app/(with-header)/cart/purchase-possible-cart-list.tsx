"use client";

import { useCartStore } from "@/store/cartStore";
import CartList from "@/components/cart/cart-list";
import { CartItemType } from "@/types/cart";
import { useEffect } from "react";

interface PurchasePossibleCartListProps {
  cartList: CartItemType[];
}

export default function PurchasePossibleCartList({
  cartList,
}: PurchasePossibleCartListProps) {
  const { setCheckList } = useCartStore();

  useEffect(() => {
    setCheckList(cartList);
  }, [cartList, setCheckList]);

  return <CartList cartList={cartList} />;
}
