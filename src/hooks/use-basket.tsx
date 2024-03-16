import { useContext } from "react";
import {
  BasketContext,
  type BasketProps,
} from "@/components/providers/basket-provider";
import { ProductProps } from "@/types";
import toast from "react-hot-toast";

export function useBasket() {
  const { basketData, setBasketData, itemsCount, priceInfo } =
    useContext(BasketContext);
  function addToBasket(data: ProductProps, count: number) {
    const clonedData =
      (JSON.parse(JSON.stringify(basketData)) as BasketProps) || [];
    const possibleExistedProduct = clonedData?.find(
      (basketItem) => basketItem.data.id === data.id,
    );
    if (possibleExistedProduct) {
      if (possibleExistedProduct.count === 1 && count === -1) {
        const indexOfProduct = clonedData.indexOf(possibleExistedProduct);
        clonedData.splice(indexOfProduct, 1);
      } else {
        possibleExistedProduct.count += count;
      }
    } else {
      clonedData.push({
        count,
        data,
      });
    }
    if (count > 0) {
      toast.success("Məhsul uğurla əlavə olundu!");
    } else {
      toast.success("Məhsul uğurla silindi!");
    }
    setBasketData(clonedData);
    localStorage.setItem("basket", JSON.stringify(clonedData));
  }
  return {
    basketData,
    setBasketData,
    addToBasket,
    itemsCount,
    priceInfo,
  };
}
