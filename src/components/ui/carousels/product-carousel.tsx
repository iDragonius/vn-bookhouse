import React, { FC } from "react";
import { ProductProps } from "@/types";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard from "@/components/ui/cards/product-card";
import { BackArrowIcon } from "@/components/icons";

export interface ProductCarouselProps {
  data: ProductProps[];
}

const ProductCarousel: FC<ProductCarouselProps> = ({ data }) => {
  const swiperRef = React.useRef<null | SwiperRef>(null);
  const nextSlide = () => {
    swiperRef.current!.swiper.slideNext();
  };
  const prevSlide = () => {
    swiperRef.current!.swiper.slidePrev();
  };
  return (
    <div className={"relative "}>
      <div
        onClick={prevSlide}
        className={
          "h-10 w-10 rounded-full bg-white flex items-center justify-center absolute sm:-left-5 left-1 top-[130px] z-[500]"
        }
        style={{
          boxShadow: " 0px 0px 40px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <BackArrowIcon />
      </div>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        className={"pb-4"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1100: {
            slidesPerView: 4,
          },
          800: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },
        }}
      >
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        onClick={prevSlide}
        className={
          "h-10 w-10 rounded-full bg-white flex items-center justify-center absolute sm:-right-5 right-1 top-[130px] z-[500]"
        }
        style={{
          boxShadow: " 0px 0px 40px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <BackArrowIcon className={"rotate-180"} />
      </div>
    </div>
  );
};

export default ProductCarousel;
