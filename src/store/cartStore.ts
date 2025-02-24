import { CartCostType, CartItemType } from "@/types/cart";
import { getCustomerId } from "@/util/common";
import { create } from "zustand";

interface CheckListType {
  productId: number;
  isChecked: boolean;
}

interface CartStore {
  cartList: CartItemType[];
  cartCost: CartCostType;
  checkList: CheckListType[];
  fetchCartData: () => void;
  setCheckList: (cartList: CartItemType[]) => void;
  check: (productId: number) => void;
  checkAll: (isChecked: boolean) => void;
  isCheckedAll: () => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
  checkList: [],
  cartList: [],
  cartCost: {
    totalCost: 0,
    deiveryCost: 0,
  },

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
        const { cartList, cartCost } = await response.json();
        set({ cartList, cartCost });
      }
    } catch (error) {
      console.error("카트 데이터를 불러오는 데 실패했습니다.", error);
    }
  },

  setCheckList: (cartList: CartItemType[]) =>
    set({
      checkList: cartList.map((item) => ({
        productId: item.productId,
        isChecked: true,
      })),
    }),

  check: (productId) =>
    set((state) => {
      const newCheckList = state.checkList.map((item) =>
        item.productId === productId
          ? { ...item, isChecked: !item.isChecked }
          : item
      );
      return { checkList: newCheckList };
    }),

  checkAll: (isChecked) =>
    set((state) => {
      const newCheckList = state.checkList.map((item) => ({
        ...item,
        isChecked,
      }));
      return { checkList: newCheckList };
    }),

  isCheckedAll: () => {
    const { checkList } = get();
    return checkList.length > 0 && checkList.every((item) => item.isChecked);
  },
}));
