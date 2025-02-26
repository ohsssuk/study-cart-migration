import { CartCostType, CartItemType } from "@/types/cart";
import { getCustomerId } from "@/util/common";
import { create } from "zustand";

interface CheckListType {
  productId: number;
  isChecked: boolean;
}

interface CartStore {
  cartList: CartItemType[] | null;
  checkList: CheckListType[];
  fetchCartData: () => void;
  check: (productId: number) => void;
  checkAll: (isChecked: boolean) => void;
  getCartCost: () => CartCostType;
  getIsCheckedAll: () => boolean;
  getCheckedCount: () => number;
}

function getTotalCost(
  cartList: CartItemType[],
  checkList: CheckListType[]
): number {
  let total = 0;

  cartList.forEach((product) => {
    const isChecked = checkList.find(
      (item) => item.productId === product.productId
    )?.isChecked;
    if (isChecked) {
      product.options.forEach((option) => {
        total += option.price * option.current;
      });
    }
  });

  return total;
}

export const useCartStore = create<CartStore>((set, get) => ({
  checkList: [],
  cartList: null,

  fetchCartData: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cartData/${getCustomerId()}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (response.ok) {
        const { cartList } = await response.json();

        const { checkList } = get();

        // 1. cartList에 없는 상품은 checkList에서 제거
        const filteredCheckList = checkList.filter((checkItem) =>
          cartList.some(
            (cartItem: CheckListType) =>
              cartItem.productId === checkItem.productId
          )
        );

        // 2. cartList에 있는 상품 중 checkList에 없는 상품은 추가 (isChecked: true로 설정)
        const updatedCheckList = [
          ...filteredCheckList,
          ...cartList
            .filter(
              (cartItem: CartItemType) =>
                !checkList.some(
                  (checkItem) => checkItem.productId === cartItem.productId
                )
            )
            .map((cartItem: CartItemType) => ({
              productId: cartItem.productId,
              isChecked: true,
            })),
        ];

        // 3. 체크리스트 업데이트
        set({ cartList, checkList: updatedCheckList });
      }
    } catch (error) {
      console.error("카트 데이터를 불러오는 데 실패했습니다.", error);
    }
  },

  getCartCost: () => {
    const { cartList, checkList } = get();

    if (cartList === null) {
      return {
        totalCost: 0,
        deliveryCost: 0,
      };
    }

    const totalCost = getTotalCost(cartList, checkList);

    return {
      totalCost,
      deliveryCost: totalCost < 40000 ? 4000 : 0,
    };
  },

  check: (productId) => {
    set((state) => {
      const newCheckList = state.checkList.map((item) =>
        item.productId === productId
          ? { ...item, isChecked: !item.isChecked }
          : item
      );
      return { checkList: newCheckList };
    });
  },

  checkAll: (isChecked) => {
    set((state) => {
      const newCheckList = state.checkList.map((item) => ({
        ...item,
        isChecked,
      }));
      return { checkList: newCheckList };
    });
  },

  getIsCheckedAll: () => {
    const { checkList } = get();
    return checkList.length > 0 && checkList.every((item) => item.isChecked);
  },

  getCheckedCount: () => {
    const { checkList } = get();
    return checkList.filter((item) => item.isChecked).length;
  },
}));
