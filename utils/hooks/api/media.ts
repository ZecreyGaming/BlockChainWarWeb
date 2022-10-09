import { useQuery } from "@apollo/client";
import { client } from "apollo";
import {
  getMediaId,
  getMediaUrl,
  getMultMediaUrl,
} from "apollo/queries/media-url";
import { isPubId } from "components/common/avatar";
import { useMemo } from "react";

export const useMediaUrl = (public_id: string) => {
  const result = useQuery(getMediaUrl(), { variables: { public_id } });
  const { data, error } = result;

  const url = useMemo<string>(() => {
    if (error) console.log("Fail to get media url. ", error);
    if (!data) return "";

    return data.upload[0].url;
  }, [data, error]);

  return { ...result, data: url };
};

export const getUrlByPub = async (public_id: string): Promise<string> => {
  try {
    let res = await client.query({
      query: getMediaUrl(),
      variables: { public_id },
    });
    return res.data.upload[0]?.url || "";
  } catch (err) {
    console.log("Fail to get media url. ", err);
    throw err;
  }
};

export const getIdByUrl = async (url: string): Promise<string> => {
  try {
    let res = await client.query({
      query: getMediaId(),
      variables: { url },
    });
    return res.data.upload[0]?.public_id || "";
  } catch (err) {
    console.log("Fail to get media id. ", err);
    throw err;
  }
};

export const getUrls = async (
  public_ids: string[]
): Promise<{ public_id: string; url: string }[]> => {
  public_ids = public_ids.filter((i) => isPubId(i));
  try {
    let res = await client.query({
      query: getMultMediaUrl(JSON.stringify(public_ids)),
    });
    return res.data.upload;
  } catch (err) {
    console.log("Fail to get media url. ", err);
    throw err;
  }
};
