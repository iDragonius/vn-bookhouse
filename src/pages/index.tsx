import { GetServerSideProps } from "next";
import { initializeApollo } from "@/lib/apollo-client";

import Config from "@/lib/config";
import GET_HOME, { GetHomeResponse } from "@/lib/queries/home.query";
import ProductCarousel from "@/components/ui/carousels/product-carousel";
import ProductCard from "@/components/ui/cards/product-card";
import { Constants } from "@/lib/constants";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";

function Home() {
  const { locale } = useRouter();
  const { data, loading } = useQuery<GetHomeResponse>(GET_HOME, {
    variables: {
      locale: Config.multiLanguage ? locale : Constants.defaultLocale,
    },
  });
  console.log(data?.collection.data.attributes.specialOffers.data);
  if (loading) {
    return <></>;
  }
  return (
    <>
      <Head>
        <title>VN Book House</title>
      </Head>
      <main>
        <div className={"box mb-8"}>
          {data?.collection.data.attributes.specialOffers.data.length > 0 && (
            <div className={"mt-8"}>
              <h2 className={"text-32 text-[#2B2B2B] font-semibold mb-5"}>
                Xüsusi təkliflər
              </h2>
              <ProductCarousel
                data={data?.collection.data.attributes.specialOffers.data || []}
              />
            </div>
          )}
          {data?.collection.data.attributes.newProducts.data.length > 0 && (
            <div className={"mt-8"}>
              <h2 className={"text-32 text-[#2B2B2B] font-semibold mb-5"}>
                Yeniliklər
              </h2>
              <ProductCarousel
                data={data?.collection.data.attributes.newProducts.data || []}
              />
            </div>
          )}

          <div className={"mt-8"}>
            <h2 className={"text-32 text-[#2B2B2B] font-semibold mb-5"}>
              Təklif olunan məhsullar
            </h2>
            <div
              className={
                "grid grid-cols-1 sm:grid-cols-2 min-[800px]:grid-cols-3 tb:grid-cols-4 gap-5"
              }
            >
              {data?.products.data.map((product) => (
                <ProductCard data={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
