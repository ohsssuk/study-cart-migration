import { CartItemType } from "@/types/cart";
import { create } from "zustand";

interface CheckListType {
  productId: number;
  isChecked: boolean;
}

interface CartStore {
  checkList: CheckListType[];
  setCheckList: (cartList: CartItemType[]) => void;
  check: (productId: number) => void;
  checkAll: (isChecked: boolean) => void;
  isCheckedAll: () => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
  checkList: [],

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
