"use client";

import CartItem from "./cart-item";
import CartListSkeleton from "./cart-list-skeleton";
import style from "./cart-list.module.css";
import { CartItemType } from "@/types/cart";
import Image from "next/image";

export default function CartList({
  cartList,
}: {
  cartList: CartItemType[] | null;
}) {
  return (
    <div className={style.cart_list}>
      {cartList === null ? (
        <CartListSkeleton />
      ) : cartList.length > 0 ? (
        <ul>
          {cartList.map((cartItem, index) => (
            <li key={`cart-item-${index}`}>
              <CartItem {...cartItem} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={style.empty}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/assets/mobile/img/empty_img/img-empty-cart-new.svg`}
            alt={"카트가 비어있어요"}
            width={270}
            height={88}
          />
          <p>카트가 비어있어요.</p>
          <p className={style.test_helper}>
            하단의 상품목록에서 퀵카트 버튼을 클릭하여 상품을 담아주세요.
          </p>
        </div>
      )}
    </div>
  );
}
