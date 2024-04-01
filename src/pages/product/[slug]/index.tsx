import React, { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import GET_PRODUCT, { GetProductResponse } from "@/lib/queries/product.query";
import Config from "@/lib/config";
import ReactMarkdown from "react-markdown";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { imageLoader } from "@/lib/utils";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useBasket } from "@/hooks/use-basket";
import { ProductProps } from "@/types";
export interface ProductPageProps {}
const MdxComponents = {
  h2: ({ node, ...props }: { node: unknown }) => (
    <h3 className={"text-24 font-bold mb-3 "} {...props} />
  ),
  p: ({ node, ...props }: { node: unknown }) => (
    <p
      className={"mb-2"}
      style={{
        marginBottom: "20px",
        color: "#424242",
        lineHeight: "32px",
        fontWeight: 500,
      }}
      {...props}
    />
  ),
  li: ({ node, ...props }: { node: unknown }) => (
    <li className={"ml-4 mb-1 list-disc"} {...props} />
  ),
};
const ProductPage: FC<ProductPageProps> = () => {
  const { query, locale } = useRouter();
  const { data, loading } = useQuery<GetProductResponse>(GET_PRODUCT, {
    variables: {
      locale: Config.multiLanguage ? locale : Config.defaultLanguage,
      id: (query.slug as string).split("-").at(-1),
    },
  });
  const swiperRef = React.useRef<null | SwiperRef>(null);
  const nextSlide = () => {
    swiperRef.current!.swiper.slideNext();
  };
  const prevSlide = () => {
    swiperRef.current!.swiper.slidePrev();
  };
  const { addToBasket } = useBasket();

  if (loading) {
    return <></>;
  }
  return (
    <>
      <Head>
        <title>{data?.product.data.attributes.name || "VN Bookhouse"}</title>
      </Head>
      <main className={"box "}>
        <div className={"w-full flex gap-8 mt-10"}>
          <div className={"w-[500px] h-[420px] bg-white border"}>
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              pagination={true}
              slidesPerView={1}
              loop={true}
            >
              {data?.product.data.attributes.images.data.map((image) => (
                <SwiperSlide key={image.id}>
                  <Image
                    loader={imageLoader}
                    src={image.attributes.url}
                    alt={data?.product.data.attributes.name}
                    width={300}
                    height={295}
                    className={
                      "w-full h-[400px] p-3 object-contain rounded-[8px] z-[50] relative before:absolute before:w-full before:top-0 before:left-0 before:block  before:h-full before:bg-black before:bg-opacity-40 before:z-[100]"
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>
            <h1 className={"text-32 font-semibold"}>
              {data?.product.data.attributes.name}
            </h1>
            <p className={"text-20 font-medium"}>
              {" "}
              {data?.product.data.attributes.description}
            </p>
            <div className={"flex gap-2 mt-3 mb-1 "}>
              <p className={"text-18 leading-[24px] font-semibold"}>
                {(data?.product.data.attributes.price || 0) -
                  (data?.product.data.attributes.promotion || 0)}{" "}
                AZN
              </p>
              <p
                className={
                  "text-14 leading-[20px] text-[#868695] self-end line-through mb-[1px] font-medium"
                }
              >
                {data?.product.data.attributes.price} AZN
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addToBasket(data?.product.data as ProductProps, 1);
              }}
              className={
                " group-hover:block  bg-primaryGold text-white mt-3 px-3 py-2 rounded-[12px]"
              }
            >
              Səbətə at
            </button>
          </div>
        </div>
        <div className={"mt-5"}>
          {/*@ts-ignore */}
          <ReactMarkdown components={MdxComponents}>
            {data?.product.data.attributes.content || ""}
          </ReactMarkdown>
          <div className={"mt-4 flex flex-col gap-3"}>
            {data?.product.data.attributes.details.map((detail) => (
              <div
                className={"flex justify-between items-center text-18"}
                key={detail.id}
              >
                <p className={"font-medium"}>{detail.name}</p>
                <p>{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductPage;
