import React, { FC } from "react";
import { ProductProps } from "@/types";
import { cn, imageLoader } from "@/lib/utils";
import Image from "next/image";
import { Constants } from "@/lib/constants";
import { useBasket } from "@/hooks/use-basket";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import slugify from "slugify";

export interface ProductCardProps {
  data: ProductProps;
}

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  const { addToBasket } = useBasket();
  const swiperRef = React.useRef<null | SwiperRef>(null);
  const nextSlide = () => {
    swiperRef.current!.swiper.slideNext();
  };
  const prevSlide = () => {
    swiperRef.current!.swiper.slidePrev();
  };
  return (
    <Link
      href={`/product/${slugify(data.attributes.name) + "-" + data.id}`}
      className={cn(" rounded-[8px] relative h-[430px] group trans ")}
    >
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        pagination={true}
        slidesPerView={1}
        loop={true}
      >
        {data.attributes.images.data.map((image) => (
          <SwiperSlide key={image.id}>
            <Image
              loader={imageLoader}
              src={image.attributes.url}
              alt={data.attributes.name}
              width={300}
              height={295}
              className={
                "w-full h-[295px] object-cover rounded-[8px] z-[50] relative before:absolute before:w-full before:top-0 before:left-0 before:block  before:h-full before:bg-black before:bg-opacity-40 before:z-[100]"
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>

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
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addToBasket(data, 1);
          }}
          className={
            "hidden group-hover:block  bg-primaryGold text-white mt-3 px-3 py-2 rounded-[12px]"
          }
        >
          Səbətə at
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
