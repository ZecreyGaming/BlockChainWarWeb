import { client } from "apollo";
import { CollectionOS, CountData, handleCollectionOS } from "apollo/fragments";
import {
  getCollectionByShortname,
  getCollectionOwners,
  queryCollectionItemNum,
} from "apollo/queries/collection";
import { DEFAULT_TOKEN } from "config";
import { Collection } from "global";

export const getCollectionBySN = async (
  shortname: string
): Promise<Collection> => {
  try {
    let res = await client.query({
      query: getCollectionByShortname(),
      variables: { shortname },
    });
    if (!res.data.collection[0]) throw new Error("Collection not found.");
    return handleCollectionOS(
      res.data.collection[0] as CollectionOS,
      DEFAULT_TOKEN.decimal
    );
  } catch (err) {
    console.log("Fail to get collection by shortname. ", err);
    throw err;
  }
};

export const countOwners = async (collection_id: number) => {
  try {
    let res = await client.query({
      query: getCollectionOwners(collection_id),
    });
    return (res.data.asset_aggregate as CountData).aggregate.count;
  } catch (err) {
    console.log("Fail to count owners of the collection. ", err);
    throw err;
  }
};

export const countCollectionItems = async (
  collection_id: number
): Promise<number> => {
  try {
    let res = await client.query({
      query: queryCollectionItemNum(collection_id),
    });
    return (res.data.asset_aggregate as CountData).aggregate.count;
  } catch (err) {
    console.log("Fail to count of the collection items. ", err);
    throw err;
  }
};
