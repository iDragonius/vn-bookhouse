import React, { FC } from "react";
import { BasketProps } from "@/components/providers/basket-provider";
import { useBasket } from "@/hooks/use-basket";
import Link from "next/link";
import { CheckoutDtoProps } from "@/pages/checkout";
import { useMutation } from "@apollo/client";
import CREATE_ORDER from "@/lib/mutations/order.mutation";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export interface BasketViewProps {
  data: BasketProps | null;
  checkoutData?: CheckoutDtoProps;
}

const BasketView: FC<BasketViewProps> = ({ data, checkoutData }) => {
  const { itemsCount, priceInfo, clearBasket } = useBasket();
  const [createOrderMutation] = useMutation(CREATE_ORDER);
  const { push } = useRouter();
  function completeOrder() {
    let products = "";
    data?.map((product) => {
      products += ` ${product.data.attributes.name}(${product.count} ədəd)
Bir ədədin qiyməti: ${product.data.attributes.price}-${
        product.data.attributes.promotion
      }= ${(
        product.data.attributes.price - product.data.attributes.promotion
      ).toFixed(2)}  AZN 
Ümumi: ${
        +(
          product.data.attributes.price - product.data.attributes.promotion
        ).toFixed(2) * product.count
      } AZN 
      `;
    });
    createOrderMutation({
      variables: {
        ...checkoutData,
        totalPrice: +(priceInfo.totalPrice - priceInfo.totalPromotion).toFixed(
          2,
        ),
        products,
      },
    }).then((res) => {
      clearBasket();
      push("/");
      toast.success(
        "Sifarişiniz qəbul olundu! Qısa zamanda sizlə əlaqə saxlanılacaq",
        { duration: 5000 },
      );
    });
  }
  return (
    <div
      className={
        "p-5 min-w-[400px] h-max rounded-[12px] border border-[#C7C7C7]  bg-white"
      }
    >
      <div className={"flex justify-between items-center mb-2 text-18"}>
        <p className={"font-semibold"}> {itemsCount} məhsul</p>
        <p className={"font-medium"}>
          {priceInfo.totalPrice.toFixed(2) + " "} AZN
        </p>
      </div>
      <div className={"flex justify-between items-center text-18"}>
        <p className={"font-semibold"}>Endirim</p>
        <p className={"text-red-600 font-medium"}>
          {priceInfo.totalPromotion.toFixed(2) + " "} AZN
        </p>
      </div>

      <div
        className={
          "flex justify-between items-center mt-10 text-[22px] text-[#2B2B2B]"
        }
      >
        <p className={"font-semibold"}>Yekun </p>
        <p className={"font-medium"}>
          {(priceInfo.totalPrice - priceInfo.totalPromotion).toFixed(2) + " "}
          AZN
        </p>
      </div>
      {checkoutData ? (
        <button
          onClick={completeOrder}
          className={
            "w-full bg-[#EAEAEA]  flex items-center justify-center py-3 rounded-[4px] mt-5 text-20 text-[#2B2B2B] font-medium trans hover:bg-primaryGold hover:text-white"
          }
        >
          Sifarişi tamamlamaq
        </button>
      ) : (
        <Link
          href={"/checkout"}
          className={
            "w-full bg-[#EAEAEA]  flex items-center justify-center py-3 rounded-[4px] mt-5 text-20 text-[#2B2B2B] font-medium trans hover:bg-primaryGold hover:text-white"
          }
        >
          Sifarişi rəsmləşdirmək
        </Link>
      )}
    </div>
  );
};

export default BasketView;
