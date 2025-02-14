import Progress from "@/components/cart/progress";
import style from "./page.module.css";
import CartList from "@/components/cart/cart-list";
import BlankLine from "@/components/ui/blank-line";
import { CartItemType } from "@/types/cart";
import ProductCarousel from "@/components/product/product-carousel";

async function fetchCartData(): Promise<{
  cartData: CartItemType[];
  totalCost: number;
}> {
  const response = await fetch(`/api/cartData`, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok)
    throw new Error("장바구니 데이터를 불러오는 데 실패했습니다.");

  return response.json();
}

async function fetchBestProducts(): Promise<CartItemType[]> {
  const response = await fetch(`/api/cartData`, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok) return [];

  return response.json();
}

export default async function Page() {
  const { cartData, cartCost } = await fetchCartData();
  const bestProducts = await fetchBestProducts();

  return (
    <div>
      <Progress cost={cartCost.totalCost} />
      <div id={style.possible_purchase_products}>
        <CartList cartData={cartData} />
      </div>
      <BlankLine />
      <div id={style.best_products}>
        <ProductCarousel title={"실시간 베스트 상품"} products={bestProducts} />
      </div>
    </div>
  );
}
