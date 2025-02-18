import Progress from "@/components/cart/progress";
import style from "./page.module.css";
import CartList from "@/components/cart/cart-list";
import BlankLine from "@/components/ui/blank-line";
import { CartCostType, CartItemType } from "@/types/cart";
import ProductCarousel from "@/components/product/product-carousel";
import Information from "@/components/ui/information";

export default async function Page() {
  async function fetchCartData(): Promise<{
    cartList: CartItemType[];
    cartCost: CartCostType;
  }> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cartData`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    if (!response.ok)
      throw new Error("장바구니 데이터를 불러오는 데 실패했습니다.");

    return response.json();
  }

  async function fetchBestProducts(): Promise<CartItemType[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bestProductsDataNow`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    if (!response.ok) return [];

    return response.json();
  }

  const { cartList, cartCost } = await fetchCartData();
  const bestProducts = await fetchBestProducts();

  const infomationContent = [
    `카트에 최대 100개의 상품(옵션 기준)을 담을 수 있습니다.`,
    `카트에 담긴 상품은 최대 90일 동안 보관됩니다.`,
    `관심상품으로 등록하면 더 오래 보관할 수 있어요.`,
  ];

  return (
    <div>
      <Progress cost={cartCost.totalCost} />
      <div id={style.possible_purchase_products}>
        <CartList cartList={cartList} />
      </div>
      <BlankLine />
      <div id={style.best_products}>
        <ProductCarousel title={"실시간 베스트 상품"} products={bestProducts} />
      </div>
      <div id={style.cart_information}>
        <Information contents={infomationContent} />
      </div>
    </div>
  );
}
