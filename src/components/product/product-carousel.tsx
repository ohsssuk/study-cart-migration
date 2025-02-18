"use client";

import Link from "next/link";
import Image from "next/image";
import { CartItemType } from "@/types/cart";
import { Swiper, SwiperSlide } from "swiper/react";

import style from "./prdouct-carousel.module.css";
import "swiper/css";
import { useEffect, useState } from "react";

interface ProductCarouselProps {
  title: string;
  products: CartItemType[];
}

export default function ProductCarousel({
  title,
  products,
}: ProductCarouselProps) {
  const [swiperInitialized, setSwiperInitialized] = useState(false);

  useEffect(() => {
    setSwiperInitialized(true);
  }, []);

  return (
    <div className={style.container}>
      <p className={style.title}>{title}</p>
      {swiperInitialized ? (
        <Swiper
          spaceBetween={12}
          slidesPerView={3.7}
          slidesOffsetBefore={18}
          slidesOffsetAfter={18}
          className={style.swiper}
        >
          {products.map((product, index) => (
            <SwiperSlide key={`carousel_item_${index}`}>
              <div className={style.item}>
                <div className={style.head}>
                  <Link href="">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}${product.productThumbnail}`}
                      width={320}
                      height={320}
                      className={style.thumbnail}
                      alt={product.productName}
                    />
                  </Link>
                  <button className={style.quick_cart_btn}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/assets/mobile/img/using_guide/button-2-icon-3-cart-bg.svg`}
                      width={36}
                      height={36}
                      alt={`카트 담기`}
                    />
                  </button>
                </div>
                <div className={style.body}>
                  <p className={style.name}>{product.productName}</p>
                  <div className={style.cost}>
                    {product.options[0]?.discountRate && (
                      <p className={style.rate}>
                        {product.options[0]?.discountRate}%
                      </p>
                    )}
                    <p className={style.price}>
                      {new Intl.NumberFormat().format(
                        product.options[0]?.price
                      )}
                      원
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
}
