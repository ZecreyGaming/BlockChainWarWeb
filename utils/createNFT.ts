import axios from "axios";
import {
  ASSET_DATA,
  BASE_URL,
  EXPIRATION,
  GAS_ACCOUNT_INDEX,
  GAS_FEE_ASSET_AMOUNT,
} from "config";
import { BigNumber } from "ethers";
import { countCollectionItems } from "./hooks/api/collection";
import { getBal, getLegendNonce, nftContentHash } from "./legend-api";

interface MintNFTArgs {
  creator_account_index: number;
  to_account_index: number;
  to_account_name_hash: string;
  nft_content_hash: string;
  nft_collection_id: number;
  creator_treasury_rate: number;
  gas_account_index: number;
  gas_fee_asset_id: number;
  gas_fee_asset_amount: string;
  expired_at: number;
  nonce: number;
}

interface MintNFTARgs {
  name: string;
  collection_id: number;
  description: string;
  media: string;
  nft_url: string;
  transaction: string;
  properties: string; // JSON string
  levels: string; // JSON string
  stats: string; // JSON string
}

const creator_name = "amber1.legend";
const creator_index = 4;
export const collection_id = 51991;
const nft_collection_id = 0;
const creator_treasury_rate = 0;
const gas_fee_asset_id = 0;
const properties = "[]";
const levels = "[]";
const stats = "[]";

const prepareData = (to_name: string, nft_name: string) => {
  const args = {
    account_name: to_name,
    name: nft_name,
    collection_id,
    properties,
    levels,
    stats,
  };
  return Promise.all([
    getLegendNonce(creator_index),
    nftContentHash(args),
    getBal(creator_name),
  ]);
};

const argsForMintNFTProof = (
  to_name: string,
  to_index: number,
  nft_content_hash: string,
  nonce: number
): MintNFTArgs => {
  return {
    creator_account_index: creator_index, // amber1.legend
    to_account_index: to_index,
    to_account_name_hash: (global as any).getAccountNameHash(to_name),
    nft_content_hash,
    nft_collection_id,
    creator_treasury_rate,
    gas_account_index: GAS_ACCOUNT_INDEX,
    gas_fee_asset_id,
    gas_fee_asset_amount: GAS_FEE_ASSET_AMOUNT,
    expired_at: Date.now() + EXPIRATION,
    nonce,
  };
};

const proveMintNFT = (args: MintNFTArgs) => {
  try {
    let seed = process.env.NEXT_PUBLIC_SEED;
    return (global as any).signMintNft(seed, JSON.stringify(args));
  } catch (err) {
    throw new Error("Fail to generate proof. " + err);
  }
};

const createNFT = async (args: MintNFTARgs) => {
  try {
    let data = new FormData();
    Object.keys(args).forEach((i: string) => {
      data.append(i, (args as { [x: string]: any })[i] || '""');
    });
    return await axios({
      method: "post",
      url: BASE_URL + "/api/v1/asset/createAsset",
      headers: { "Content-Type": "multipart/form-data" },
      data,
    });
  } catch (err) {
    throw err;
  }
};

/**
 * Use admin account mint NFT for game players.
 * @param to_name - L2 account name of the player.
 * @param to_index - L2 account index of the player.
 * @returns
 */
export const mintNFT = async (
  to_name: string, // account name
  to_index: number // account index
) => {
  try {
    const media = ASSET_DATA.media;
    const index = await countCollectionItems(collection_id);
    const nft_name = `Medal of Victory #${index}`;
    const [nonce, nft_content_hash, bal] = await prepareData(to_name, nft_name);
    if (BigNumber.from(bal).lt(GAS_FEE_ASSET_AMOUNT)) {
      throw new Error("Admin has no enough fund for the gas fee.");
    }
    const args = argsForMintNFTProof(
      to_name,
      to_index,
      nft_content_hash,
      nonce
    );
    const proof = await proveMintNFT(args);
    const res = await createNFT({
      name: nft_name,
      collection_id,
      description: "Medal of Victory",
      media,
      nft_url: "",
      transaction: proof,
      properties,
      levels,
      stats,
    });
    return res.data.asset;
  } catch (err) {
    throw new Error("Fail to mint NFT. " + err);
  }
};
