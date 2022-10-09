import axios from "axios";
import { DEFAULT_TOKEN } from "config";
import store from "redux/store";

/**
 * Get Legend basic information, including contracts' addresses.
 * @returns
 */
export const getLegendBasicInfo = () => {
  const { legend_url } = store.getState().config;
  return new Promise<{
    block_committed: number;
    block_verified: number;
    total_transactions: number;
    transactions_count_yesterday: number;
    transactions_count_today: number;
    dau_yesterday: number;
    dau_today: number;
    contract_addresses: string[];
    nft_offer_treasury_rate: number;
  }>((resolve, reject) => {
    axios
      .get(legend_url + "/api/v1/info/getLayer2BasicInfo")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

/**
 * Get information of BNB and BEP20 tokens.
 * @returns
 */
export const getLegendAssetInfo = () => {
  const { legend_url } = store.getState().config;
  return new Promise<
    {
      asset_address: string;
      asset_decimals: number;
      asset_id: number;
      asset_name: string;
      asset_symbol: string;
      is_gas_asset: number;
    }[]
  >((resolve, reject) => {
    axios
      .get(legend_url + "/api/v1/info/getAssetsList")
      .then((res) => {
        resolve(
          res.data.assets.sort((a: any, b: any) => a.asset_id - b.asset_id)
        );
      })
      .catch((err) => reject(err));
  });
};

/**
 * Get next nonce to send new transaction.
 * @param account_index
 * @returns
 */
export const getLegendNonce = (account_index: number) => {
  const { legend_url } = store.getState().config;
  return new Promise<number>((resolve, reject) => {
    axios
      .get(legend_url + "/api/v1/tx/getNextNonce", {
        params: { account_index },
      })
      .then((res) => {
        resolve(res.data.nonce);
      })
      .catch((err) => reject(err));
  });
};

/**
 * Get legend account by public key.
 * @param account_pk
 * @param url
 * @returns
 */
export const getLegendAccountInfoByPK = (account_pk: string) => {
  return new Promise<{
    account_index: number;
    account_name: string;
    account_status: number;
    assets: {
      asset_id: number;
      balance: string;
      lp_amount: string;
      offer_canceled_or_finalized: string;
    }[];
  }>((resolve, reject) => {
    const { legend_url } = store.getState().config;
    axios
      .get(legend_url + "/api/v1/account/getAccountInfoByPubKey", {
        params: { account_pk },
      })
      .then((res) => {
        if (res.status === 200) {
          let { account_status, account_index, account_name, assets } =
            res.data;
          resolve({
            account_index,
            account_name,
            account_status,
            assets,
          });
        } else {
          reject(res.statusText || res.status);
        }
      })
      .catch((err) => reject(err));
  });
};

export const getLegendAccountInfoByName = async (
  account_name: string
): Promise<{
  account_index: number;
  account_pk: string;
  assets: {
    asset_id: number;
    balance: string;
    lp_amount: string;
    offer_canceled_or_finalized: string;
  }[];
}> => {
  const { legend_url } = store.getState().config;
  try {
    let res = await axios.get(
      legend_url + "/api/v1/account/getAccountInfoByAccountName",
      { params: { account_name } }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

/**
 * Get legend account by account name.
 * @param account_name
 * @returns
 */
export const getLegendAccountStatusByName = async (account_name: string) => {
  try {
    const { legend_url } = store.getState().config;
    let res = await axios.get(
      legend_url + "/api/v1/account/getAccountStatusByAccountName",
      {
        params: { account_name },
      }
    );
    let { account_status, account_index, account_pk } = res.data;
    return {
      account_status,
      account_index,
      account_name,
      account_pk,
    };
  } catch (err: any) {
    throw err;
  }
};

/**
 * Get transaction fee amount, including transactions of transfering, swapping, adding LP and removing LP.
 * @param asset_id
 * @param tx_type
 * @returns
 */
export const getLegendGasFee = (asset_id: number, tx_type: number) => {
  const { legend_url } = store.getState().config;
  return new Promise<string>((resolve, reject) => {
    axios
      .get(legend_url + "/api/v1/info/getGasFee", {
        params: { asset_id, tx_type },
      })
      .then((res) => {
        resolve(res.data.gas_fee);
      })
      .catch((err) => reject(err));
  });
};

/**
 * Get asset balance without decimals.
 * @param account_name
 * @param asset_id
 * @returns
 */
export const getBal = async (
  account_name: string,
  asset_id = DEFAULT_TOKEN.asset_id
) => {
  if (!account_name) return "0";
  try {
    let res = await getLegendAccountInfoByName(account_name);
    return res.assets.find((i) => i.asset_id === asset_id)?.balance || "0";
  } catch (err) {
    console.log("Failed to get account balance. ", err);
    throw err;
  }
};

/**
 * Get transaction fee amount, including transactions of transfering, swapping, adding LP and removing LP.
 * @param asset_id
 * @returns
 */
export const getLegendWithdrawNFTGasFee = (asset_id: number) => {
  const { legend_url } = store.getState().config;
  return new Promise<string>((resolve, reject) => {
    axios
      .get(legend_url + "/api/v1/info/getWithdrawNftGasFee", {
        params: { asset_id },
      })
      .then((res) => {
        resolve(res.data.gas_fee);
      })
      .catch((err) => reject(err));
  });
};

export const nftContentHash = (args: {
  account_name: string;
  collection_id: number;
  name: string;
  properties: string; // JSON of { [key: string]: string }[],
  levels: string; // JSON of { [key: string]: number }[],
  stats: string; // JSON of { [key: string]: number }[],
}) => {
  const { url } = store.getState().config;
  return new Promise<string>((resolve, reject) => {
    let data = new FormData();
    Object.keys(args).forEach((i: string) => {
      data.append(i, (args as { [x: string]: any })[i] || "");
    });
    axios({
      method: "post",
      url: url + "/api/v1/asset/getContentHash",
      headers: { "Content-Type": "multipart/form-data" },
      data,
    })
      .then((res) => {
        resolve(res.data.content_hash);
      })
      .catch((err) => reject(err));
  });
};

export const getNextOfferId = async (account_name: string): Promise<number> => {
  try {
    const { url } = store.getState().config;
    return (
      await axios(url + "/api/v1/offer/getNextOfferId", {
        params: { account_name },
      })
    ).data.id;
  } catch (err) {
    throw err;
  }
};
