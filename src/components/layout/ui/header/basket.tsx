import React, { FC } from "react";
import { BasketIcon } from "@/components/icons";
import Link from "next/link";
import { useBasket } from "@/hooks/use-basket";

export interface BasketProps {}

const Basket: FC<BasketProps> = () => {
  const { itemsCount } = useBasket();
  return (
    <Link
      href={"/basket"}
      className={
        "flex flex-col items-center justify-center gap-1 cursor-pointer group transition-all ease-in-out relative"
      }
    >
      <BasketIcon
        className={
          "fill-[#5A5A5A] group-hover:fill-primaryGold transition-all ease-in-out"
        }
      />
      <p
        className={
          "text-12 font-medium group-hover:text-primaryGold transition-all ease-in-out"
        }
      >
        Səbət
      </p>
      <div
        className={
          "absolute text-12 -top-2 -right-1 bg-red-500 rounded-full p-0.5 font-medium text-white"
        }
      >
        {itemsCount}
      </div>
    </Link>
  );
};

export default Basket;
