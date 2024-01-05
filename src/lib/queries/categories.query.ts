import { gql } from "@apollo/client";
import { CategoryProps } from "@/types";

export interface GetCategoriesResponse {
  categories: {
    data: CategoryProps[];
  };
}
const GET_CATEGORIES = gql`
  query ($locale: I18NLocaleCode!) {
    categories(locale: $locale, sort: "position:asc") {
      data {
        attributes {
          name
          icon
          position
        }
        id
      }
    }
  }
`;

export default GET_CATEGORIES;
