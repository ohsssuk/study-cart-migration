import { CartItemType } from "@/types/cart";
import { NextResponse } from "next/server";
import { initCartList } from "../data";
import { delay } from "@/util/common";

let cartList = [...initCartList];

function getTotalCost(cartList: CartItemType[]): number {
  let total = 0;

  cartList.forEach((product) => {
    product.options.forEach((option) => {
      total += option.price * option.current;
    });
  });

  return total;
}

export async function GET() {
  const totalCost = getTotalCost(cartList);

  await delay(2000);

  return NextResponse.json({
    cartList,
    cartCost: {
      totalCost,
      deiveryCost: totalCost > 40000 ? 4000 : 0,
    },
  });
}

export async function DELETE(req: Request) {
  try {
    const { optionIds, productIds } = await req.json();
    const deletedProductIds: number[] = [];

    if (optionIds && optionIds.length > 0) {
      // 옵션 삭제 처리
      cartList = cartList
        .map((product) => {
          product.options = product.options.filter(
            (option) => !optionIds.includes(option.optionId)
          );

          // 옵션이 모두 삭제되었을 경우 해당 상품 삭제
          if (product.options.length === 0) {
            deletedProductIds.push(product.productId);
            return null;
          }

          return product;
        })
        .filter((product) => product !== null);

      return NextResponse.json({
        message: "옵션이 삭제되었습니다.",
        deletedProductIds,
      });
    } else if (productIds && productIds.length > 0) {
      // 상품 삭제 처리
      cartList = cartList.filter((product) => {
        if (productIds.includes(product.productId)) {
          deletedProductIds.push(product.productId); // 삭제된 상품 ID 기록
          return false; // 해당 상품 삭제
        }
        return true; // 해당 상품 유지
      });

      return NextResponse.json({
        message: "상품이 삭제되었습니다.",
        deletedProductIds,
      });
    } else {
      return NextResponse.json(
        { message: "옵션이나 상품 ID가 필요합니다." },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "삭제 실패", error }, { status: 500 });
  }
}
