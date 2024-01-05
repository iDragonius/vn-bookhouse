import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ProductProps } from "@/types";
export type BasketProps = Array<{
  data: ProductProps;
  count: number;
}>;

export interface BasketProviderProps {
  children: ReactNode;
}
export interface IBasketContext {
  basketData: BasketProps | null;
  setBasketData: Dispatch<SetStateAction<BasketProps | null>>;
  itemsCount: number;
  priceInfo: {
    totalPrice: number;
    totalPromotion: number;
  };
}
export const BasketContext = createContext<IBasketContext>({
  basketData: null,
  setBasketData: () => {},
  itemsCount: 0,
  priceInfo: {
    totalPrice: 0,
    totalPromotion: 0,
  },
});
const BasketProvider: FC<BasketProviderProps> = ({ children }) => {
  const [basketData, setBasketData] = useState<null | BasketProps>(null);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [priceInfo, setPriceInfo] = useState<{
    totalPrice: number;
    totalPromotion: number;
  }>({
    totalPrice: 0,
    totalPromotion: 0,
  });
  useEffect(() => {
    const basketDataFromLocalStorage = localStorage.getItem("basket")
      ? (JSON.parse(localStorage.getItem("basket") as string) as BasketProps)
      : null;
    setBasketData(basketDataFromLocalStorage);
  }, []);
  function countItems(data: BasketProps): number {
    let count = 0;
    data.map((basketItem) => {
      count += basketItem.count;
    });
    return count;
  }
  function getPriceInfo(data: BasketProps): {
    totalPrice: number;
    totalPromotion: number;
  } {
    let priceInfoTemp: {
      totalPrice: number;
      totalPromotion: number;
    } = {
      totalPrice: 0,
      totalPromotion: 0,
    };
    data.map((basketItem) => {
      priceInfoTemp.totalPrice +=
        basketItem.count * basketItem.data.attributes.price;
      priceInfoTemp.totalPromotion +=
        basketItem.count * basketItem.data.attributes.promotion;
    });
    return priceInfoTemp;
  }
  useEffect(() => {
    let count = 0;
    let priceInfoTemp: {
      totalPrice: number;
      totalPromotion: number;
    } = {
      totalPrice: 0,
      totalPromotion: 0,
    };
    if (basketData) {
      count = countItems(basketData);
      priceInfoTemp = getPriceInfo(basketData);
    }

    setItemsCount(count);
    setPriceInfo(priceInfoTemp);
  }, [basketData]);

  return (
    <BasketContext.Provider
      value={{ setBasketData, basketData, itemsCount, priceInfo }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
