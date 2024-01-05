import { gql } from "@apollo/client";
import { ImageProps, ProductProps } from "@/types";

export interface GetCategoryWithProductsResponse {
  category: {
    data: {
      id: string;
      attributes: {
        name: string;
        icon: string;
        background: ImageProps;
        products: {
          data: ProductProps[];
        };
      };
    };
  };
}
const GET_CATEGORY_WITH_PRODUCTS = gql`
  query ($locale: I18NLocaleCode!, $id: ID!) {
    category(id: $id, locale: $locale) {
      data {
        attributes {
          name
          icon
          background {
            data {
              id
              attributes {
                url
                width
                height
                name
              }
            }
          }
          products {
            data {
              id
              attributes {
                name
                description
                image {
                  data {
                    id
                    attributes {
                      url
                      width
                      height
                      name
                    }
                  }
                }
                price
                promotion
                category {
                  data {
                    id
                    attributes {
                      name
                      icon
                      position
                    }
                  }
                }
              }
            }
          }
        }
        id
      }
    }
  }
`;

export default GET_CATEGORY_WITH_PRODUCTS;
