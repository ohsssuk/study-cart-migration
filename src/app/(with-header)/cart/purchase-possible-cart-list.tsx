"use client";

import Progress from "@/components/cart/progress";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";
import style from "./page.module.css";
import CartList from "@/components/cart/cart-list";
import Checkbox from "@/components/ui/checkbox";
import { getCustomerId } from "@/util/common";

export default function PurchasePossibleCartList() {
  const { checkList, fetchCartData, cartList, getCartCost } = useCartStore();

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const { getIsCheckedAll, checkAll } = useCartStore();

  const handleCheckCartAll = (status: boolean) => {
    checkAll(status);
  };

  const deleteChekedProduct = async () => {
    const checkedProductIds = checkList
      .filter((item) => item.isChecked)
      .map((item) => item.productId);

    if (checkedProductIds.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cartData/${getCustomerId()}`,
        {
          method: "DELETE",
          body: JSON.stringify({ productIds: checkedProductIds }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "상품 삭제에 실패했습니다.");
      }

      fetchCartData();
    } catch (error) {
      console.error("상품 삭제 오류:", error);
    }

    fetchCartData();
  };

  return (
    <>
      <Progress cost={getCartCost().totalCost} />
      <div id={style.possible_purchase_products}>
        <CheckManageSection />
        <CartList cartList={cartList} />
      </div>
    </>
  );

  function CheckManageSection() {
    return (
      <section className={style.select_manage}>
        <Checkbox
          id="check_all"
          label="전체 선택"
          isChecked={getIsCheckedAll()}
          onChange={(status) => handleCheckCartAll(status)}
        />
        <button onClick={deleteChekedProduct} className={style.select_delete}>
          선택삭제
        </button>
      </section>
    );
  }
}
