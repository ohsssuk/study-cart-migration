import { CartItemType } from "@/types/cart";
import { NextResponse } from "next/server";

let cartData: CartItemType[] = [
  {
    productId: 2195,
    productName: `원팩쿠캣 스지 수육전골 600g`,
    productThumbnail: `/product/images/2024/11/coce_1732063817_5781_120.jpg`,
    productStatus: 1,
    options: [
      {
        optionId: 166906,
        optionName: `원팩쿠캣 스지 수육전골 600g`,
        price: 10700,
        min: 1,
        current: 1,
        max: 100,
      },
      {
        optionId: 166907,
        optionName: `원팩쿠캣 스지 수육전골 600gX2개 (최소 2개 구매)`,
        price: 20200,
        min: 2,
        current: 2,
        max: 100,
      },
    ],
  },
  {
    productId: 1822,
    productName: `렌지쿠캣 오븐 닭구이 3종 (오리지널/매콤/고추마요)`,
    productThumbnail: `/product/images/2024/02/poze_1708917471_4491_120.jpg`,
    productStatus: 1,
    options: [
      {
        optionId: 105988,
        optionName: `렌지쿠캣 오리지널 오븐 닭구이 200g`,
        price: 5900,
        min: 1,
        current: 1,
        max: 100,
      },
      {
        optionId: 105989,
        optionName: `렌지쿠캣 매콤 오븐 닭구이 200g (한개만 구매 가능)`,
        price: 5900,
        min: 1,
        current: 1,
        max: 1,
      },
    ],
  },
  {
    productId: 1814,
    productName: `한우이츠 1++ 한우 육회 2종 (육회/육사시미)`,
    productThumbnail: `/product/images/2024/02/kopo_1707364478_2139_120.jpg`,
    productStatus: 1,
    options: [
      {
        optionId: 103219,
        optionName: `양념 꼬막장 200g`,
        price: 9500,
        min: 1,
        current: 1,
        max: 100,
      },
    ],
  },
  {
    productId: 260,
    productName: `바로쿠캣 밥도둑 5종 (깐새우장/양념꼬막장/순살게장)`,
    productThumbnail: `/product/images/2024/10/xifi_1728290388_2661_120.jpg`,
    productStatus: 1,
    options: [
      {
        optionId: 163777,
        optionName: `1++ 한우 육사시미 150g (3개 구매 가능)`,
        price: 15900,
        min: 1,
        current: 1,
        max: 3,
      },
    ],
  },
];

function getTotalCost(cartData: CartItemType[]): number {
  let total = 0;

  cartData.forEach((product) => {
    product.options.forEach((option) => {
      total += option.price * option.current;
    });
  });

  return total;
}

export async function GET() {
  const totalCost = getTotalCost(cartData);

  return NextResponse.json({
    cartData,
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
      cartData = cartData
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
      cartData = cartData.filter((product) => {
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
    return NextResponse.json(
      { message: "삭제 실패", error: error.message },
      { status: 500 }
    );
  }
}
