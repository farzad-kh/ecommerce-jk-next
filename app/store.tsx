import { create } from "zustand";
import { persist } from "zustand/middleware";

 

export interface CartItem {
  id: string;
  name: string;
  image?: string | undefined;
  descriptions?: string;
  unit_amount: number | undefined | null;
  quantity: number | 1;
  size: string;
}
interface CartState {
  cart: CartItem[];
  totalPrice: number;
  paymentIntent: string;
  isLoading: boolean;

}
interface CartStateActions {
  addToProduct: (item: CartItem) => void;
  decreaseProduct: (item: CartItem) => void;
removeProduct:(item: CartItem) => void;
  setPaymentIntent: (value: string) => void;
  resetCartStore: () => void;
  cartStoreLoading: () => void;

}

interface DrawCart {
  isOpen: boolean;
  isToggleHandler: () => void;
  isCloseHandler: () => void;
}
interface SearchLoad {
  isSearch: boolean;
  isSearchHandler: () => void;
 
}

interface CheckOut {
  isCheckOut: boolean;
  isCheckOutLoad: boolean;
  checkOutClick: () => void;
  checkOutLoadHandler: () => void;
}

 
interface ClientSecret {
  clientSecret?:string
  setClientSecret: (value: string) => void;

}

 
interface resetCartStore {
  (partial: object, replace?: boolean): void;
}

export const useDrawCart = create<DrawCart>((set) => ({
  isOpen: false,
  isToggleHandler: () => set((state) => ({ isOpen: !state.isOpen })),
  isCloseHandler: () => set((state) => ({ isOpen: false })),
}));
export const useSearchLoad = create<SearchLoad>((set) => ({
  isSearch: false,
  isSearchHandler: () => set((state) => ({ isSearch: !state.isSearch })),
 
}));

export const useCheckOut = create<CheckOut>((set) => ({
  isCheckOut: false,
  isCheckOutLoad: false,
  checkOutClick: () => set(() => ({ isCheckOut: true })),
  checkOutLoadHandler: () =>
    set((state) => ({ isCheckOutLoad: !state.isCheckOutLoad })),
}));
 
export const useClientSecret = create<ClientSecret>((set) => ({
  ClientSecret: "",
  setClientSecret: (value) => set(() => ({ clientSecret: value })),
}));

 
const resetCartStore = (set: resetCartStore) => {
  set({
    cart: [],
    totalPrice: 0,
    paymentIntent: "",
   
  });
};






export const useCartStore = create<CartState & CartStateActions>()(
  persist(
    (set, get) => ({
      cart: [],
      totalPrice: 0,
      paymentIntent: "",
      isLoading: false,
 
      resetCartStore: () => resetCartStore(set),
      setPaymentIntent: (value) => set((state) => ({ paymentIntent: value })),
      cartStoreLoading: () => set((state) => ({ isLoading: !state.isLoading })),
      addToProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) =>
              cartItem?.id === item?.id && cartItem.size === item.size
          );

          if (!!existingItem) {
            const updateCart = state.cart.map((cardItem) => {
              if (cardItem.id === item.id && cardItem.size === item.size) {
                return { ...cardItem, quantity: cardItem?.quantity + 1 };
              }
              return cardItem;
            });

            const totalSum = updateCart.reduce(
              (acc, cur) => acc + cur.quantity * cur.unit_amount!,
              0
            );

            return {
              ...state,
              cart: [...updateCart],
              totalPrice: totalSum,
            };
          }

          const sum = 1 * item.unit_amount! + state.totalPrice!;

          return {
            ...state,
            cart: [
              ...state.cart,
              { ...item, quantity: item.quantity, size: item.size },
            ],
            totalPrice: sum,
          };
        }),
      decreaseProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) =>
              cartItem?.id === item?.id && cartItem.size === item.size
          );
          if (!!existingItem && existingItem.quantity > 1) {
            const updateCart = state.cart.map((cardItem) => {
              if (cardItem.id === item.id && cardItem.size === item.size) {
                return { ...cardItem, quantity: cardItem?.quantity - 1 };
              }
              return cardItem;
            });
            const totalDec = updateCart.reduce(
              (acc, cur) => acc + cur.quantity * cur.unit_amount!,
              0
            );

            return {
              ...state,
              cart: [...updateCart],
              totalPrice: totalDec,
            };
          } else {
            const filter = state.cart.filter(
              (cardItem) =>
                cardItem.id !== item.id || cardItem.size !== item.size
            );

            const totalAmount = filter.reduce(
              (acc, cur) => acc + cur.quantity * cur.unit_amount!,
              0
            );

            return {
              ...state,
              cart: [...filter],
              totalPrice: totalAmount,
            };
          }
        }),
        removeProduct: (item) =>
        set((state) => {
          const filter = state.cart.filter(
            (cardItem) =>
              cardItem.id !== item.id || cardItem.size !== item.size
          );

          const totalAmount = filter.reduce(
            (acc, cur) => acc + cur.quantity * cur.unit_amount!,
            0
          );

          return {
            ...state,
            cart: [...filter],
            totalPrice: totalAmount,
          };
        }),
     
        
    }),
    {
      name: "cart-store",
    }
  )
);

// const total = updateCart.reduce(
//   (accumulator, currentItem) =>
//     accumulator + currentItem.quantity * currentItem?.unit_amount,
//   0
// );

// let sum = 0;

// const isFree = sum > 6000;
// if (isFree === false)  sum = (1 * item.unit_amount!)+2000;
