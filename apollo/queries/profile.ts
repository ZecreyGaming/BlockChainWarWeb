import { gql } from "@apollo/client";
import { Fragment } from "apollo/fragments";

export const getProfileByPK = () => gql`
  ${Fragment}
  query Account($pub_key: String!) {
    account(where: { pub_key: { _eq: $pub_key } }) {
      ...Profile
    }
  }
`;

export const getProfileByName = () => gql`
  ${Fragment}
  query Account($account_name: String!) {
    account(where: { account_name: { _eq: $account_name } }) {
      ...Profile
    }
  }
`;
