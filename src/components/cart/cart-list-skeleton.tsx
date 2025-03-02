import Skeleton from "../ui/skeleton";
import style from "./cart-list.module.css";

export default function CartListSkeleton() {
  return (
    <div className={style.cart_list}>
      <ul>
        <li>
          <div className={style.skeleton_item}>
            <div className={style.skeleton_head}>
              <div>
                <Skeleton />
              </div>
              <div>
                <Skeleton />
              </div>
            </div>
            <div className={style.skeleton_body}>
              <Skeleton />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
