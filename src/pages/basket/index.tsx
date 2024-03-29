import React, { FC, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import BasketView from "@/components/ui/views/basket-view";
import { useBasket } from "@/hooks/use-basket";
import { imageLoader } from "@/lib/utils";
import Link from "next/link";
import slugify from "slugify";
import { useRouter } from "next/router";

export interface BasketPageProps {}

const BasketPage: FC<BasketPageProps> = () => {
  const { basketData, setBasketData, addToBasket } = useBasket();
  const { push } = useRouter();
  useEffect(() => {
    if (basketData?.length === 0) {
      push("/");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Səbət</title>
      </Head>
      <main className={"box"}>
        <h1 className={"text-32 text-[#2B2B2B] font-semibold mt-8 mb-5 "}>
          Səbət
        </h1>
        <div className={"flex gap-10"}>
          <div
            className={
              "p-5 rounded-[12px] border border-[#C7C7C7]  w-full bg-white flex flex-col gap-5"
            }
          >
            {basketData?.map((basketItem) => (
              <div
                key={basketItem.data.id}
                className={"flex justify-between  "}
              >
                <Link
                  href={`/product/${
                    slugify(basketItem.data.attributes.name) +
                    "-" +
                    basketItem.data.id
                  }`}
                  className={" flex gap-5 w-[400px]"}
                >
                  <Image
                    loader={imageLoader}
                    src={
                      basketItem.data.attributes.images?.data[0].attributes.url
                    }
                    alt={basketItem.data.attributes.name}
                    width={120}
                    height={120}
                    className={"object-cover w-[120px] h-[120px] rounded-[8px]"}
                  />
                  <div>
                    <p
                      className={"text-18 font-semibold text-[#2B2B2B] mb-0.5"}
                    >
                      {basketItem.data.attributes.name}
                    </p>
                    <p className={"text-14 text-gray-500 "}>
                      {basketItem.data.attributes.description}
                    </p>
                  </div>
                </Link>
                <div className={"w-[150px] "}>
                  <div className={"flex items-center "}>
                    <button
                      className={
                        "text-[23px] h-8 w-8 rounded-[8px] bg-gray-200"
                      }
                      onClick={() => {
                        addToBasket(basketItem.data, -1);
                      }}
                    >
                      -
                    </button>
                    <p className={"text-18 w-[50px] text-center"}>
                      {basketItem.count}
                    </p>
                    <button
                      className={
                        "text-[23px] h-8 w-8 rounded-[8px] bg-gray-200"
                      }
                      onClick={() => {
                        addToBasket(basketItem.data, 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={"w-[150px] "}>
                  <div className={"flex items-center gap-3 justify-end"}>
                    <div>
                      <p
                        className={
                          "text-18 text-gray-900 font-semibold text-right mb-1"
                        }
                      >
                        {(
                          (basketItem.data.attributes.price -
                            basketItem.data.attributes.promotion) *
                          basketItem.count
                        ).toFixed(2) + " "}
                        AZN
                      </p>
                      <p
                        className={
                          "text-gray-400 text-16 line-through text-right"
                        }
                      >
                        {(
                          basketItem.data.attributes.price * basketItem.count
                        ).toFixed(2) + " "}
                        AZN
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <BasketView data={basketData} />
        </div>
      </main>
    </>
  );
};

export default BasketPage;
