import React, { FC } from "react";
import Head from "next/head";
import Config from "@/lib/config";
import GET_CATEGORY_WITH_PRODUCTS, {
  GetCategoryWithProductsResponse,
} from "@/lib/queries/category-with-products.query";
import Image from "next/image";
import { Constants } from "@/lib/constants";
import ProductCard from "@/components/ui/cards/product-card";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { imageLoader } from "@/lib/utils";

export interface CategoryItemPageProps {}

const CategoryItemPage: FC<CategoryItemPageProps> = () => {
  const { locale, query } = useRouter();
  const { data, loading } = useQuery<GetCategoryWithProductsResponse>(
    GET_CATEGORY_WITH_PRODUCTS,
    {
      variables: {
        locale: Config.multiLanguage ? locale : Constants.defaultLocale,
        id: query.id,
      },
    },
  );
  if (loading) {
    return <></>;
  }
  return (
    <>
      <Head>
        <title>{data?.category.data.attributes.name}</title>
      </Head>
      <main>
        <div
          className={
            "h-[300px] relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-black before:bg-opacity-30 "
          }
        >
          {data?.category.data.attributes.background.data && (
            <Image
              loader={imageLoader}
              src={
                data?.category.data.attributes.background.data.attributes.url
              }
              alt={data?.category.data.attributes.name}
              width={1920}
              height={300}
              className={"w-full h-[300px] object-cover"}
            />
          )}

          <div
            className={
              "absolute w-full h-full left-0 top-0 flex items-center justify-center"
            }
          >
            <p className={"text-[64px] text-white font-semibold"}>
              {data?.category.data.attributes.name}
            </p>
          </div>
        </div>
        <div className={"box my-8"}>
          <div className={"grid grid-cols-4 gap-5"}>
            {data?.category.data.attributes.products.data.map((product) => (
              <ProductCard data={product} key={product.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default CategoryItemPage;
