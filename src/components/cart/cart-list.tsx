import Checkbox from "../ui/checkbox";
import CartItem from "./cart-item";
import style from "./cart-list.module.css";

export default function CartList() {
  return (
    <div id={style.cart_list}>
      <div className={style.manage_all}>
        <Checkbox id="select_all" label="전체 선택" />
      </div>
      <ul>
        <li>
          <CartItem />
        </li>
      </ul>
    </div>
  );
}
