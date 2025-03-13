import style from "./page.module.css";
import BlankLine from "@/components/ui/blank-line";
import { CartItemType } from "@/types/cart";
import ProductCarousel from "@/components/product/product-carousel";
import { Suspense } from "react";
import PurchasePossibleCartList from "./purchase-possible-cart-list";
import CartReceipt from "./cart-receipt";
import CartInformation from "./cart-Infromation";

async function fetchBestProducts(): Promise<CartItemType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bestProductsDataNow`,
    {
      method: "GET",
      cache: "force-cache",
    }
  );

  if (!response.ok) return [];

  return response.json();
}

export default async function Page() {
  async function RecommendedBestProducts() {
    const bestProducts = await fetchBestProducts();

    return (
      <ProductCarousel title={"실시간 베스트 상품"} products={bestProducts} />
    );
  }

  return (
    <>
      <div className={style.delivery_wrap}>
        <div className={style.delivery}>
          <div className={style.receiver}>집 / 테스트</div>
          <div className={style.place}>[13595] 경기 성남시 분당구</div>
        </div>
      </div>

      <div id="PurchasePossibleCartList">
        <PurchasePossibleCartList />
      </div>

      <BlankLine />

      <div id={style.best_products}>
        <Suspense fallback={<ProductCarousel title={"실시간 베스트 상품"} />}>
          <RecommendedBestProducts />
        </Suspense>
      </div>

      <BlankLine />

      <CartReceipt />

      <CartInformation />
    </>
  );
}
