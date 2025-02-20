import { CartItemType } from "@/types/cart";
import { create } from "zustand";

interface CheckListType {
  productId: number;
  isChecked: boolean;
}

interface CartStore {
  checkList: CheckListType[];
  check: (productId: number) => void;
  checkAll: (isChecked: boolean) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  checkList: [],

  init: (cartList: CartItemType[]) =>
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
}));
