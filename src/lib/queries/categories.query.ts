import { gql } from "@apollo/client";
import { CategoryProps } from "@/types";

export interface GetCategoriesResponse {
  categories: {
    data: CategoryProps[];
  };
}
const GET_CATEGORIES = gql`
  query ($locale: I18NLocaleCode!) {
    categories(
      locale: $locale
      sort: "position:asc"
      filters: { isMainCategory: { eq: true } }
    ) {
      data {
        attributes {
          name
          whiteIcon {
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
          blackIcon {
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
          position
          categories(sort: "position:asc") {
            data {
              id
              attributes {
                name
                position
              }
            }
          }
        }
        id
      }
    }
  }
`;

export default GET_CATEGORIES;
