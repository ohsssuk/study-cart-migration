"use client";

import Link from "next/link";
import Image from "next/image";
import { CartItemType } from "@/types/cart";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./prdouct-carousel.module.css";
import "swiper/css";
import Skeleton from "../ui/skeleton";
import { getCustomerId } from "@/util/common";
import { useCartStore } from "@/store/cartStore";

interface ProductCarouselProps {
  title: string;
  products?: CartItemType[];
}

export default function ProductCarousel({
  title,
  products = [],
}: ProductCarouselProps) {
  const { fetchCartData } = useCartStore();

  // 옵션 삭제 처리 함수
  const handleQuickCart = async (productId: CartItemType["productId"]) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cartData/${getCustomerId()}`,
        {
          method: "POST",
          body: JSON.stringify({ productId }),
        }
      );

      const { message } = await response.json();

      if (response.ok) {
        fetchCartData();
      }

      alert(message);
    } catch (error) {
      console.error("카트 처리 중 오류 발생:", error);
      alert("상품을 추가하는 데 실패했습니다.");
    }
  };

  return (
    <div className={style.container}>
      <p className={style.title}>{title}</p>
      {products.length > 0 ? (
        <Swiper slidesPerView={"auto"} className={style.list}>
          {products.map((product, index) => (
            <SwiperSlide key={`carousel_item_${index}`} className={style.slide}>
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
                  <button
                    className={style.quick_cart_btn}
                    onClick={() => handleQuickCart(product.productId)}
                  >
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
      ) : (
        <Swiper slidesPerView={"auto"} className={style.list}>
          {Array.from({ length: 3 }).map((_, index) => (
            <SwiperSlide
              key={`carousel_skeleton_item_${index}`}
              className={style.slide}
            >
              <div className={style.item}>
                <div className={style.skeleton_head}>
                  <Skeleton />
                </div>
                <div className={style.skeleton_body}>
                  <Skeleton height="32px" />
                  <Skeleton height="16px" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
