import { gql } from "@apollo/client";
import { ProductProps } from "@/types";

export interface GetProductsResponse {
  products: {
    data: ProductProps[];
  };
}
const GET_PRODUCTS = gql`
  query ($locale: I18NLocaleCode!) {
    products(locale: $locale) {
      data {
        attributes {
          name
          description
          category {
            data {
              id
              attributes {
                name
                position
              }
            }
          }
          image {
            data {
              id
              attributes {
                width
                height
                url
                name
              }
            }
          }
          price
          promotion
        }
        id
      }
    }
  }
`;

export default GET_PRODUCTS;
