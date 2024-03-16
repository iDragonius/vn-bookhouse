import { gql } from "@apollo/client";
import { ProductProps } from "@/types";

export interface GetProductResponse {
  product: {
    data: ProductProps;
  };
  products: {
    data: ProductProps[];
  };
}
const GET_PRODUCT = gql`
  query ($locale: I18NLocaleCode!, $id: ID!) {
    product(id: $id, locale: $locale) {
      data {
        attributes {
          images {
            data {
              id
              attributes {
                url
                name
                width
                height
              }
            }
          }
          name
          content
          category {
            data {
              id
              attributes {
                name
              }
            }
          }
          details {
            name
            value
            id
          }
          price
          promotion
          description
        }
      }
    }
    products(
      locale: $locale
      filters: { id: { ne: $id } }
      pagination: { page: 1, pageSize: 3 }
    ) {
      data {
        id
        attributes {
          name
          description
          price
          promotion
          category {
            data {
              attributes {
                name
              }
            }
          }
          images {
            data {
              id
              attributes {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_PRODUCT;
