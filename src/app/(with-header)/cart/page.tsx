import Progress from "@/components/cart/progress";
import style from "./page.module.css";
import CartList from "@/components/cart/cart-list";
import BlankLine from "@/components/ui/blank-line";
import { CartCostType, CartItemType } from "@/types/cart";
import ProductCarousel from "@/components/product/product-carousel";
import Information from "@/components/ui/information";
import { Suspense } from "react";
import CartListSkeleton from "@/components/cart/cart-list-skeleton";

async function fetchCartData(): Promise<{
  cartList: CartItemType[];
  cartCost: CartCostType;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cartData`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("카트 데이터를 불러오는 데 실패했습니다.");

  return response.json();
}

async function fetchBestProducts(): Promise<CartItemType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bestProductsDataNow`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) return [];

  return response.json();
}

export default async function Page() {
  async function CartProgressForDeliveryCostCheck() {
    const { cartCost } = await fetchCartData();

    return <Progress cost={cartCost.totalCost} />;
  }

  async function PurchasePossibleCartList() {
    const { cartList } = await fetchCartData();

    return <CartList cartList={cartList} />;
  }

  async function RecommendedBestProducts() {
    const bestProducts = await fetchBestProducts();

    return (
      <ProductCarousel title={"실시간 베스트 상품"} products={bestProducts} />
    );
  }

  return (
    <div>
      <Suspense fallback={<Progress />}>
        <CartProgressForDeliveryCostCheck />
      </Suspense>

      <div id={style.possible_purchase_products}>
        <Suspense fallback={<CartListSkeleton />}>
          <PurchasePossibleCartList />
        </Suspense>
      </div>

      <BlankLine />

      <div id={style.best_products}>
        <Suspense fallback={<ProductCarousel title={"실시간 베스트 상품"} />}>
          <RecommendedBestProducts />
        </Suspense>
      </div>

      <BlankLine />

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
