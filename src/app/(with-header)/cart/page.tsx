import style from "./page.module.css";
import BlankLine from "@/components/ui/blank-line";
import { CartItemType } from "@/types/cart";
import ProductCarousel from "@/components/product/product-carousel";
import Information from "@/components/ui/information";
import { Suspense } from "react";
import PurchasePossibleCartList from "./purchase-possible-cart-list";
import CartReceipt from "./cart-receipt";

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
    <div>
      <div className={style.delivery_wrap}>
        <div className={style.delivery}>
          <div className={style.receiver}>집 / 테스트</div>
          <div className={style.place}>[13595] 경기 성남시 분당구</div>
        </div>
      </div>

      <PurchasePossibleCartList />

      <BlankLine />

      <div id={style.best_products}>
        <Suspense fallback={<ProductCarousel title={"실시간 베스트 상품"} />}>
          <RecommendedBestProducts />
        </Suspense>
      </div>

      <BlankLine />

      <CartReceipt />

      <div id={style.cart_information}>
        <Information
          contents={[
            `카트에 최대 100개의 상품(옵션 기준)을 담을 수 있습니다.`,
            `카트에 담긴 상품은 최대 90일 동안 보관됩니다.`,
            `관심상품으로 등록하면 더 오래 보관할 수 있어요.`,
          ]}
        />
      </div>
    </div>
  );
}
