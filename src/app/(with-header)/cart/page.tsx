import Progress from "@/components/cart/progress";
import style from "./page.module.css";
import CartList from "@/components/cart/cart-list";

export default function Page() {
  return (
    <div>
      <Progress cost={5000} />
      <CartList />
    </div>
  );
}
