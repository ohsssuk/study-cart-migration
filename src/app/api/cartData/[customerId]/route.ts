import { CartItemType, OptionType } from "@/types/cart";
import { NextResponse } from "next/server";
import { initCartList } from "../../data";

const cartDatabase: Record<string, CartItemType[]> = {};

function getTotalCost(cartList: CartItemType[]): number {
  let total = 0;

  cartList.forEach((product) => {
    product.options.forEach((option) => {
      total += option.price * option.current;
    });
  });

  return total;
}

function getCustomerCartListFromDatabase(customerId: string): CartItemType[] {
  if (!cartDatabase[customerId]) {
    cartDatabase[customerId] = [...initCartList];
  }
  return cartDatabase[customerId];
}

function mergeOptions(existingOptions: OptionType[], newOptions: OptionType[]) {
  const optionMap = new Map<number, OptionType>();

  existingOptions.forEach((option) => optionMap.set(option.optionId, option));

  newOptions.forEach((option) => {
    if (optionMap.has(option.optionId)) {
      const existingOption = optionMap.get(option.optionId)!;

      if (existingOption.max > existingOption.current) {
        existingOption.current += 1;
      }
    } else {
      optionMap.set(option.optionId, option);
    }
  });

  return Array.from(optionMap.values());
}

export async function GET(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  const { customerId } = await params;

  const cartList = getCustomerCartListFromDatabase(customerId);
  const totalCost = getTotalCost(cartList);

  return NextResponse.json({
    cartList,
    cartCost: {
      totalCost,
      deiveryCost: totalCost > 40000 ? 4000 : 0,
    },
  });
}

export async function POST(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const { customerId } = await params;
    const { productId, optionId, count } = await req.json();
    const cartList = getCustomerCartListFromDatabase(customerId);

    if (productId) {
      const newProduct = structuredClone(
        initCartList.find((item) => item.productId === productId)
      );

      if (!newProduct) {
        return NextResponse.json(
          { message: "존재하지 않는 상품입니다." },
          { status: 404 }
        );
      }

      const existingProductIndex = cartList.findIndex(
        (item) => item.productId === newProduct.productId
      );

      if (existingProductIndex !== -1) {
        mergeOptions(
          cartList[existingProductIndex].options,
          newProduct.options
        );
      } else {
        cartList.push(newProduct);
      }

      return NextResponse.json({
        message: "상품이 장바구니에 추가되었습니다.",
      });
    } else if (optionId && count) {
      const productIndex = cartList.findIndex((item) =>
        item.options.some((option) => option.optionId === optionId)
      );

      if (productIndex !== -1) {
        const product = cartList[productIndex];
        const optionIndex = product.options.findIndex(
          (option) => option.optionId === optionId
        );

        if (optionIndex !== -1) {
          const option = product.options[optionIndex];
          if (option.max >= count && option.min <= count) {
            option.current = count;
          }
        }
      }

      return NextResponse.json({});
    }
  } catch (error) {
    return NextResponse.json(
      { message: "상품 추가 실패", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  try {
    const { customerId } = await params;
    const { optionIds, productIds } = await req.json();

    const cartList = getCustomerCartListFromDatabase(customerId);
    const deletedProductIds: number[] = [];

    if (optionIds && optionIds.length > 0) {
      // 옵션 삭제 처리
      const updatedCartList = cartList
        .map((product) => {
          // 옵션 필터링
          const updatedOptions = product.options.filter(
            (option) => !optionIds.includes(option.optionId)
          );

          if (updatedOptions.length === 0) {
            deletedProductIds.push(product.productId);
          }

          return { ...product, options: updatedOptions };
        })
        .filter((product) => product.options.length > 0); // 옵션이 없는 상품은 삭제

      cartDatabase[customerId] = updatedCartList;

      return NextResponse.json({
        message: "옵션이 삭제되었습니다.",
        deletedProductIds,
      });
    } else if (productIds && productIds.length > 0) {
      // 상품 삭제 처리
      const updatedCartList = cartList.filter((product) => {
        if (productIds.includes(product.productId)) {
          deletedProductIds.push(product.productId); // 삭제된 상품 ID 기록
          return false; // 해당 상품 삭제
        }
        return true; // 해당 상품 유지
      });

      cartDatabase[customerId] = updatedCartList;

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
