"use client";

import StickyDynamic from "@/components/ui/sticky-dynamic";
import Information from "@/components/ui/information";
import style from "./page.module.css";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function CartInformation() {
  const [reRender, setReRender] = useState<boolean>(true);
  const [options, setOptions] = useState<string>("");
  const { cartList } = useCartStore();

  useEffect(() => {
    const newOptions =
      cartList?.map((item) => item.options.length).join(",") ?? "";

    setOptions(newOptions);
  }, [cartList]);

  useEffect(() => {
    setReRender((prev) => !prev);
  }, [options]);

  return (
    <StickyDynamic reRender={reRender}>
      <div id={style.cart_information}>
        <Information
          contents={[
            `카트에 최대 100개의 상품(옵션 기준)을 담을 수 있습니다.`,
            `카트에 담긴 상품은 최대 90일 동안 보관됩니다.`,
            `관심상품으로 등록하면 더 오래 보관할 수 있어요.`,
          ]}
        />
      </div>
    </StickyDynamic>
  );
}
