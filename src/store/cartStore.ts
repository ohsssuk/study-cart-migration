import { create } from "zustand";

interface CartStore {
  selectedItems: Set<number>;
  toggleItem: (id: number) => void;
  selectAll: (isChecked: boolean, ids: number[]) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  selectedItems: new Set(),

  toggleItem: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedItems);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return { selectedItems: newSet };
    }),

  selectAll: (isChecked, ids) =>
    set({ selectedItems: isChecked ? new Set(ids) : new Set() }),
}));
