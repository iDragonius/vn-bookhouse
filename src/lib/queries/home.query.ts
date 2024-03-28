import { gql } from "@apollo/client";
import { ProductProps } from "@/types";
export interface GetHomeResponse {
  products: {
    data: ProductProps[];
  };
  collection: {
    data: {
      attributes: {
        newProducts: {
          data: ProductProps[];
        };
        specialOffers: {
          data: ProductProps[];
        };
      };
    };
  };
}
const GET_HOME = gql`
  query ($locale: I18NLocaleCode!) {
    collection(locale: $locale) {
      data {
        id
        attributes {
          newProducts(pagination: { page: 1, pageSize: 500 }) {
            data {
              id
              attributes {
                name
                description
                category {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                images {
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
            }
          }
          specialOffers(pagination: { page: 1, pageSize: 500 }) {
            data {
              id
              attributes {
                name
                description
                category {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                images {
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
            }
          }
        }
      }
    }
    products(locale: $locale, pagination: { page: 1, pageSize: 500 }) {
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
          images {
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

export default GET_HOME;
