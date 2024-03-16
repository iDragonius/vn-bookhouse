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
          newProducts {
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
          specialOffers {
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
