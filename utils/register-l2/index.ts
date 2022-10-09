import axios from "axios";
import { ethers } from "ethers";
import store from "redux/store";
import LEGEND_ABI from "./legend.json";
import OracleABI from "./StablePriceOracle.json";

/**
 * Get user's ethereum address.
 * @param name_hash -- Generate from legend account name with wasm(method: getAccountNameHash).
 * @param provider -- Web3 provider or RPC provider.
 * @param address -- Legend contract's address.
 * @returns
 */
export const getUserAddress = async (
  name_hash: string,
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  address: string
): Promise<string> => {
  if (!name_hash.startsWith("0x")) name_hash = "0x" + name_hash;
  const legend = new ethers.Contract(address, LEGEND_ABI, provider);
  try {
    return await legend.getAddressByAccountNameHash(name_hash);
  } catch (err) {
    throw err;
  }
};

/**
 * Register fee.
 * @param name -- Legend account name without suffix.
 * @param provider -- Web3 provider or RPC provider.
 * @param address -- Oracle contract's address.
 * @returns
 */
export const getLegendRegisterPrice = async (
  name: string,
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  address: string
): Promise<string> => {
  if (name.length < 3) throw new Error("Name too short.");
  if (name.length > 32) throw new Error("Name too long.");
  if (!address) throw new Error("Price oracle contract not found.");
  try {
    const Oracle = new ethers.Contract(address, OracleABI, provider);
    return (await Oracle.price(name)).toHexString();
  } catch (err) {
    throw err;
  }
};

/**
 * Register L2 account with discount.
 * @param account_name -- Legend account name without suffix.
 * @param pk -- Public key of legend keypair.
 * @param addr -- Ethereum address.
 */
export const registerWithDiscount = async (
  account_name: string,
  pk: string,
  addr: string
) => {
  let data = new FormData();
  data.append("account_name", account_name);
  data.append("l2_pk", pk);
  data.append("owner_addr", addr);
  try {
    await axios({
      method: "post",
      url:
        store.getState().config.legend_url +
        "/api/v1/register/applyRegisterHost",
      headers: { "Content-Type": "multipart/form-data" },
      data,
    });
  } catch (err) {
    throw err;
  }
};
