import { client } from "apollo";
import { handleProfileData } from "apollo/fragments";
import { getProfileByName, getProfileByPK } from "apollo/queries/profile";
import { CONTENT_TO_SIGN } from "config";
import { ethers } from "ethers";
import { sha256 } from "ethers/lib/utils";
import { Profile, WalletType } from "global";
import store from "redux/store";
import { getUrls } from "utils/hooks/api/media";
import { handleWalletOfMetaMask, handleWalletOfZecrey } from "./ethereum";

export const connectWallet = (type?: WalletType) => {
  switch (type) {
    case "Zecrey":
      return handleWalletOfZecrey();
    case "MetaMask":
    default:
      return handleWalletOfMetaMask();
  }
};

export const signMsg = async (provider: ethers.providers.ExternalProvider) => {
  try {
    const signer = new ethers.providers.Web3Provider(provider).getSigner();
    const address = await signer.getAddress();
    const msg = CONTENT_TO_SIGN(address);
    const sig = await signer.signMessage(msg);
    return sig;
  } catch (err) {
    throw err;
  }
};

export const getPKBySig = (sig: string) => {
  const seed = generateLegendSeedFromSig(sig);
  return (global as any).getEddsaCompressedPublicKey(seed);
};

export const getUncompressedPKBySig = (sig: string) => {
  const seed = generateLegendSeedFromSig(sig);
  return (global as any).getEddsaPublicKey(seed);
};

export const getUserByPK = async (pk: string): Promise<Profile> => {
  try {
    let res = await client.query({
      query: getProfileByPK(),
      variables: { pub_key: pk },
    });
    if (res.data.account[0]) {
      let url = (await getUrls([res.data.account[0].profile_image]))[0]?.url;
      return handleProfileData({
        ...res.data.account[0],
        avatar: url, // || "/static/image/default_avatar_1.png",
        banner: "/static/image/default-banner.jpeg", // ignored
      });
    } else {
      throw new Error("Account not found. Please contact our staff.");
    }
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param name - Legend account name without suffix.
 * @returns
 */
export const getUserByName = async (name: string): Promise<Profile> => {
  try {
    let res = await client.query({
      query: getProfileByName(),
      variables: { account_name: name + store.getState().config.suffix },
      fetchPolicy: "no-cache",
    });
    if (res.data.account[0]) {
      let url = (await getUrls([res.data.account[0].profile_image]))[0]?.url;
      return handleProfileData({
        ...res.data.account[0],
        avatar: url, // || "/static/image/default_avatar_1.png",
        banner: "/static/image/default-banner.jpeg", // ignored
      });
    } else {
      throw new Error("Account not found. Please contact our staff.");
    }
  } catch (err) {
    throw err;
  }
};

export const generateLegendSeedFromSig = (sig: string) => {
  const buffer = Buffer.from(sig);
  const seed = sha256(buffer).slice(2, 66);
  return seed;
};

export const getCurrentWeb3Provider = (
  type: WalletType
): ethers.providers.ExternalProvider | undefined => {
  switch (type) {
    case "MetaMask":
      return (window as any).ethereum;
    case "Zecrey":
      return (window as any).zecrey;
    default:
      return undefined;
  }
};
