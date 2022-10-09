import { gql } from "@apollo/client";
import { Fragment } from "apollo/fragments";

export const getCollectionByShortname = () => {
  return gql`
    ${Fragment}
    query Collection($shortname: String!) {
      collection(where: { shortname: { _eq: $shortname } }) {
        ...Collection_Info
        account {
          ...Owner
        }
        collection_stat {
          browse_count
          day_trade_volume
          week_trade_volume
          month_trade_volume
          total_trade_volume
          floor_price
          item_count
        }
      }
    }
  `;
};

export const getCollectionOwners = (collection_id: number) => {
  return gql`
    query Owners {
      asset_aggregate(
        where: { collection_id: { _eq: ${collection_id} } }
        distinct_on: account_id
      ) {
        aggregate {
          count
        }
      }
    }
  `;
};

export const queryCollectionItemNum = (collection_id: number) => {
  return gql`
    query Assets {
      asset_aggregate(where: { collection_id: { _eq: ${collection_id} } }) {
        aggregate {
          count
        }
      }
    }
  `;
};
