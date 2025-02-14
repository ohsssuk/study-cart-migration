import style from "./prdouct-carousel.module.css";
import Link from "next/link";
import Image from "next/image";

interface ProductCarouselProps {
  title: string;
  products: unknown[];
}

export default function ProductCarousel({
  title,
  products,
}: ProductCarouselProps) {
  return (
    <div className={style.container}>
      <p className={style.title}>{title}</p>
      <ul className={style.list}>
        {products.map((product, index) => (
          <li key={`carousel_item_${index}`} className={style.item}>
            <div className={style.head}>
              <Link href="">
                <Image
                  src={product.productThumbnail}
                  width={127}
                  height={127}
                  className={style.thumbnail}
                  alt={product.productName}
                />
              </Link>
            </div>
            <div className={style.body}>
              <p className={style.name}>{product.productName}</p>
              <div className={style.cost}>
                <p className={style.rate}>3%</p>
                <p className={style.price}>13500원</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
