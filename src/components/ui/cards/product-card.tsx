import React, { FC } from "react";
import { ProductProps } from "@/types";
import { cn, imageLoader } from "@/lib/utils";
import Image from "next/image";
import { Constants } from "@/lib/constants";
import { useBasket } from "@/hooks/use-basket";

export interface ProductCardProps {
  data: ProductProps;
}

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  const { addToBasket } = useBasket();
  return (
    <div className={cn(" rounded-[8px] relative h-[430px] group trans ")}>
      <Image
        loader={imageLoader}
        src={data.attributes.image.data.attributes.url}
        alt={data.attributes.name}
        width={300}
        height={295}
        className={"w-full h-[295px] object-cover rounded-[8px] z-[50]"}
      />
      <div>
        <div className={"flex gap-2 mt-3 mb-1 "}>
          <p className={"text-18 leading-[24px] font-semibold"}>
            {data.attributes.price - data.attributes.promotion} AZN
          </p>
          <p
            className={
              "text-14 leading-[20px] text-[#868695] self-end line-through mb-[1px] font-medium"
            }
          >
            {data.attributes.price} AZN
          </p>
        </div>
        <p className={"text-14 text-[#242424] mt-1"}>{data.attributes.name}</p>{" "}
        <p className={"text-[#9d9da5] text-12 mt-1.5 "}>
          {data.attributes.description}
        </p>
        <button
          onClick={() => {
            addToBasket(data, 1);
          }}
          className={
            "hidden group-hover:block  bg-primaryGold text-white mt-3 px-3 py-2 rounded-[12px]"
          }
        >
          Səbətə at
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
// <div
//     className={"group-hover:absolute w-full  z-[5000] group-hover:bg-white"}
// >
//   <div className={"flex gap-2 mt-3 mb-1 "}>
//     <p className={"text-18 leading-[24px] font-semibold"}>
//       {data.attributes.price - data.attributes.promotion} AZN
//     </p>
//     <p
//         className={
//           "text-14 leading-[20px] text-[#868695] self-end line-through mb-[1px] font-medium"
//         }
//     >
//       {data.attributes.price} AZN
//     </p>
//   </div>
//   <p className={"text-14 text-[#242424] mt-1"}>{data.attributes.name}</p>{" "}
//   <p className={"text-[#9d9da5] text-12 mt-1.5 "}>
//     {data.attributes.description}
//   </p>
//   <button
//       className={
//         "hidden group-hover:block bg-primaryGold text-white mt-3 px-3 py-2 rounded-[12px]"
//       }
//   >
//     Səbətə at
//   </button>
// </div>
