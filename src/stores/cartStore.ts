import { CartItem, Product } from '@/types/cart.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  items: CartItem[];
  selectedItems: Set<number>;
  isHydrated: boolean;

  // Actions
  addItemOptimistic: (item: CartItem) => void;
  updateQuantityOptimistic: (itemId: number, quantity: number) => void;
  removeItemOptimistic: (id: number) => void;
  getTotalPrice: () => number;

  // Selected items actions
  setSelectedItems: (items: Set<number>) => void;
  toggleSelectItem: (id: number) => void;
  selectAll: (checked: boolean, itemIds: number[]) => void;
  clearSelectedItems: () => void;
  clearCart: () => void;

  // Getters
  isSelectAll: () => boolean;
  getSelectedTotal: () => number;
  getItemCount: () => number;
}

const createEmptyProduct = (): Product => ({
  id: 0,
  tenantId: 0,
  name: 'Sản phẩm không xác định',
  slug: '',
  description: '',
  basePrice: 0,
  thumb: '',
  images: [],
  status: 'ACTIVE',
  isPublished: false,
  isFeatured: false,
  totalRatings: 0,
  totalReviews: 0,
  numberSold: 0,
  categoryId: 0,
  brandId: 0,
  createdById: 0,
  weight: 0,
  length: 0,
  width: 0,
  height: 0,
  createdAt: '',
  updatedAt: '',
  promotionProducts: [],
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
});

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedItems: new Set<number>(),
      isHydrated: false,

      addItemOptimistic: (newItem: CartItem) =>
        set((state) => {
          // Kiểm tra xem sản phẩm đã có trong giỏ chưa (theo productId)
          const existingItemIndex = state.items.findIndex(
            item => item.productId === newItem.productId
          );

          if (existingItemIndex !== -1) {
            // Nếu đã có, tăng số lượng
            const updatedItems = [...state.items];
            const existingItem = updatedItems[existingItemIndex];
            updatedItems[existingItemIndex] = {
              ...existingItem,
              quantity: existingItem.quantity + newItem.quantity,
              finalPrice: existingItem.priceAtAdd * (existingItem.quantity + newItem.quantity)
            };
            
            const newSelected = new Set(state.selectedItems);
            newSelected.add(existingItem.id);
            
            return { 
              items: updatedItems, 
              selectedItems: newSelected 
            };
          } else {
            // Nếu chưa có, thêm mới
            const newSelected = new Set(state.selectedItems);
            newSelected.add(newItem.id);
            return { 
              items: [...state.items, newItem], 
              selectedItems: newSelected 
            };
          }
        }),

      updateQuantityOptimistic: (itemId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId
              ? { ...i, quantity, finalPrice: i.priceAtAdd * quantity }
              : i
          ),
        })),

      removeItemOptimistic: (id) =>
        set((state) => {
          const newSelected = new Set(state.selectedItems);
          newSelected.delete(id);
          return {
            items: state.items.filter((i) => i.id !== id),
            selectedItems: newSelected,
          };
        }),

      getTotalPrice: () =>
        get().items.reduce((sum, i) => sum + i.finalPrice * i.quantity, 0),

      setSelectedItems: (items) => set({ selectedItems: items }),

      toggleSelectItem: (id) =>
        set((state) => {
          const newSelected = new Set(state.selectedItems);
          if (newSelected.has(id)) newSelected.delete(id);
          else newSelected.add(id);
          return { selectedItems: newSelected };
        }),

      selectAll: (checked, itemIds) =>
        set({ selectedItems: checked ? new Set(itemIds) : new Set() }),

      clearSelectedItems: () => set({ selectedItems: new Set() }),

      clearCart: () => {
        set({ items: [], selectedItems: new Set() });
      },

      isSelectAll: () => {
        const { items, selectedItems } = get();
        return items.length > 0 && items.every((item) => selectedItems.has(item.id));
      },

      getSelectedTotal: () => {
        const { items, selectedItems } = get();
        return items
          .filter((item) => selectedItems.has(item.id))
          .reduce((total, item) => total + item.finalPrice * item.quantity, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
      partialize: (state) => ({
        items: state.items.map(item => ({
          ...item,
          variant: {
            ...item.variant,
            product: item.variant?.product ? { ...item.variant.product } : createEmptyProduct(),
          }
        })),
        selectedItems: Array.from(state.selectedItems),
      }),
      merge: (persistedState: any, currentState: CartStore): CartStore => {
        if (!persistedState) {
          return { ...currentState, isHydrated: true };
        }

        const selectedItems = persistedState?.selectedItems
          ? new Set<number>(persistedState.selectedItems)
          : new Set<number>();

        const items = persistedState?.items || [];

        // Ensure product exists in each item variant
        const validatedItems: CartItem[] = items.map((item: any) => ({
          ...item,
          variant: {
            ...item.variant,
            product: item.variant?.product || createEmptyProduct(),
          },
          productId: item.productId || (item.variant?.product?.id || 0),
        }));

        return {
          ...currentState,
          items: validatedItems,
          selectedItems,
          isHydrated: true,
        };
      },
    }
  )
);