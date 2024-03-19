import { gql } from "@apollo/client";

const CREATE_ORDER = gql`
  mutation (
    $firstName: String!
    $note: String!
    $lastName: String!
    $address: String!
    $phoneNumber: String
    $products: String!
    $totalPrice: Float!
    $email: String!
  ) {
    createOrder(
      data: {
        note: $note
        firstName: $firstName
        lastName: $lastName
        address: $address
        phoneNumber: $phoneNumber
        products: $products
        totalPrice: $totalPrice
        email: $email
      }
    ) {
      data {
        attributes {
          lastName
          firstName
        }
      }
    }
  }
`;

export default CREATE_ORDER;
