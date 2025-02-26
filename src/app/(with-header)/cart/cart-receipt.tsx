"use client";

import Button from "@/components/ui/button";
import style from "./page.module.css";
import { useCartStore } from "@/store/cartStore";

export default function CartReceipt() {
  const { getCartCost, getCheckedCount } = useCartStore();
  const { totalCost, deliveryCost } = getCartCost();

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };
  const checkedCount = getCheckedCount();

  return (
    <section className={style.receipt}>
      <ul className={style.receipt_detail}>
        <li>
          <div className={style.depth}>
            <div>총 상품금액</div>
            <div>{formatPrice(totalCost)}원</div>
          </div>
        </li>
        <li>
          <div className={style.depth}>
            <div>총 배송비</div>
            <div>{formatPrice(deliveryCost)}원</div>
          </div>
          <div className={style.depth_2}>
            <div>업체 배송비</div>
            <div>0원</div>
          </div>
        </li>
      </ul>
      <div className={style.receipt_total}>
        <div>결제예정금액</div>
        <div>{formatPrice(totalCost + deliveryCost)}원</div>
      </div>

      <div className={style.purchase_btn_wrap}>
        <Button>{checkedCount > 0 ? `${checkedCount}건 ` : ""}주문하기</Button>
      </div>
    </section>
  );
}
