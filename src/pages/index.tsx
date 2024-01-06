import { GetServerSideProps } from "next";
import { initializeApollo } from "@/lib/apollo-client";

import Config from "@/lib/config";
import GET_HOME, { GetHomeResponse } from "@/lib/queries/home.query";
import ProductCarousel from "@/components/ui/carousels/product-carousel";
import ProductCard from "@/components/ui/cards/product-card";
import { Constants } from "@/lib/constants";

function Home({ data }: { data: GetHomeResponse }) {
  console.log(data);
  return (
    <main>
      <div className={"box mb-8"}>
        <div className={"mt-8"}>
          <h2 className={"text-32 text-[#2B2B2B] font-semibold mb-5"}>
            Xüsusi təkliflər
          </h2>
          <ProductCarousel
            data={data.collection.data.attributes.specialOffers.data}
          />
        </div>
        <div>
          <h2 className={"text-32 text-[#2B2B2B] font-semibold mb-5"}>
            Yeniliklər
          </h2>
          <ProductCarousel
            data={data.collection.data.attributes.newProducts.data}
          />
        </div>
        <div className={"mt-8"}>
          <h2 className={"text-32 text-[#2B2B2B] font-semibold mb-5"}>
            Təklif olunan məhsullar
          </h2>
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 min-[800px]:grid-cols-3 tb:grid-cols-4 gap-5"
            }
          >
            {data.products.data.map((product) => (
              <ProductCard data={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_HOME,
    variables: {
      locale: Config.multiLanguage ? locale : Constants.defaultLocale,
    },
  });

  return {
    props: { data },
  };
};
export default Home;
