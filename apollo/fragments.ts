import { gql } from "@apollo/client";
import { DEFAULT_SUFFIX, DEFAULT_TOKEN } from "config";
import { formatUnits } from "ethers/lib/utils";
import {
  Collection,
  CollectionBasic,
  CollectionLinks,
  CollectionStatistics,
  Level,
  NFT,
  NFTBasic,
  NFTwithC,
  NFTwithPOC,
  Profile,
  Property,
  User,
  UserLinks,
} from "global";
import store from "redux/store";

export const Fragment = gql`
  # account related
  fragment Owner on account {
    id
    account_index
    account_name
    banner_image
    profile_image
    pub_key
  }
  fragment User_Link on account {
    external_link
    instagram_link
    twitter_link
  }
  fragment Profile on account {
    ...Owner
    ...User_Link
  }
  # collection related
  fragment Collection_Link on collection {
    telegram_link
    twitter_link
    instagram_link
    discord_link
    external_link
  }
  fragment Collection_Info on collection {
    id
    l2_collection_id
    name
    shortname
    logo_detail {
      url
    }
    # logo_image
    banner_detail {
      url
    }
    # banner_image
    description
    created_at
    creator_earning_rate
    status
  }
  # nft related
  fragment NFT_Info on asset {
    id
    name
    nft_index
    l1_token_id
    l1_address
    is_l1
    description
    status
    supply
    content_hash
    media
    nft_url
    media_detail {
      url
    }
    # audio_thumb
    # image_thumb
    # video_thumb
    created_at
    # nft_url
  }
  fragment NFT_Properties on asset_properties {
    id
    key
    value
  }
  fragment NFT_Levels on asset_levels {
    id
    key
    value
    max_value
  }
  fragment NFT_Stats on asset_stats {
    id
    key
    value
    max_value
  }
  # offer related
  fragment Offer_Info on offer {
    id
    l2_offer_id
    status
    expired_at
    created_at
    deleted_at
    direction
    payment_asset_amount
    payment_asset_id
    counterpart_id
    signature
  }
  fragment NFT_Filter_BuyNow on offer {
    asset {
      ...NFT_Info
      account {
        ...Owner
      }
      collection {
        ...Collection_Info
      }
    }
  }
`;

export interface OwnerData {
  account_index: number;
  account_name: string;
  banner: string;
  avatar: string;
  pub_key: string;
  id: number;
}
export const handleOwnerData = (val: OwnerData): User => ({
  id: val.id,
  name: val.account_name,
  nickname: val.account_name.replace(
    store.getState().config.suffix || DEFAULT_SUFFIX,
    ""
  ),
  index: val.account_index,
  avatar: val.avatar,
  banner: val.banner,
  pub_key: val.pub_key,
});
export interface UserLinkData {
  external_link: string;
  instagram_link: string;
  twitter_link: string;
}
export const handleUserLinkData = (val: UserLinkData): UserLinks => ({
  official: ["-", '""'].includes(val.external_link) ? "" : val.external_link,
  twitter: ["-", '""'].includes(val.twitter_link) ? "" : val.twitter_link,
  instagram: ["-", '""'].includes(val.instagram_link) ? "" : val.instagram_link,
});
export interface ProfileData extends OwnerData, UserLinkData {}
export const handleProfileData = (val: ProfileData): Profile => {
  let val1 = handleOwnerData(val);
  let links = handleUserLinkData(val);
  return { ...val1, links };
};
export interface CollectionLinkData {
  telegram_link: string;
  twitter_link: string;
  instagram_link: string;
  discord_link: string;
  external_link: string;
}
export const handleCollectionLinkData = (
  val: CollectionLinkData
): CollectionLinks => ({
  official: ["-", '""'].includes(val.external_link) ? "" : val.external_link,
  twitter: ["-", '""'].includes(val.twitter_link) ? "" : val.twitter_link,
  discord: ["-", '""'].includes(val.discord_link) ? "" : val.discord_link,
  telegram: ["-", '""'].includes(val.telegram_link) ? "" : val.telegram_link,
  instagram: ["-", '""'].includes(val.instagram_link) ? "" : val.instagram_link,
});
export interface CollectionStatisticData {
  browse_count?: number;
  day_trade_volume?: number;
  week_trade_volume?: number;
  month_trade_volume?: number;
  total_trade_volume?: number;
  floor_price?: number;
  item_count?: number;
  week_growth_rate?: number;
  day_growth_rate?: number;
}
export const handleCollectionStatisticData = (
  val: CollectionStatisticData,
  decimal: number
): CollectionStatistics => {
  return {
    items: val?.item_count || 0,
    floor: Number(formatUnits((val?.floor_price || 0).toString(), decimal)),
    volume: Number(
      formatUnits((val?.total_trade_volume || 0).toString(), decimal)
    ),
    day_volume: Number(
      formatUnits((val?.day_trade_volume || 0).toString(), decimal)
    ),
    week_volume: Number(
      formatUnits((val?.week_trade_volume || 0).toString(), decimal)
    ),
    month_volume: Number(
      formatUnits((val?.month_trade_volume || 0).toString(), decimal)
    ),
    day_growth: val?.day_growth_rate || 0,
    week_growth: val?.week_growth_rate || 0,
  };
};
export interface CollectionInfo {
  id: number;
  l2_collection_id: number;
  name: string;
  shortname: string;
  logo_detail: null | {
    url: string;
  };
  banner_detail: null | {
    url: string;
  };
  description: string;
  created_at: string;
  status: number;
  creator_earning_rate: number;
}
export const handleCollectionInfo = (val: CollectionInfo): CollectionBasic => ({
  id: val.id,
  l2_id: val.l2_collection_id,
  name: val.name,
  shortname: val.shortname,
  logo: val.logo_detail?.url || "/static/image/default-collection-logo.jpg", // val.logo,
  banner: val.banner_detail?.url || "/static/image/default-banner.jpeg", // val.banner,
  desc: val.description,
  verified: val.status ? true : false,
  createdAt: Number(new Date(val.created_at)),
  token: DEFAULT_TOKEN,
  creatorEarningRate: val.creator_earning_rate,
});
export interface CollectionS extends CollectionInfo {
  collection_stat: CollectionStatisticData;
}
export const handleCollectionS = (
  val: CollectionS,
  decimal: number
): Collection => {
  let val1 = handleCollectionInfo(val);
  let statistics = handleCollectionStatisticData(
    val.collection_stat || {},
    decimal
  );
  return { ...val1, statistics };
};
export interface CollectionOS extends CollectionInfo {
  account: OwnerData;
  collection_stat: CollectionStatisticData;
}
export const handleCollectionOS = (
  val: CollectionOS,
  decimal: number
): Collection => {
  let val1 = handleCollectionInfo(val);
  let owner = handleOwnerData(val.account);
  let statistics = handleCollectionStatisticData(
    val.collection_stat || {},
    decimal
  );
  return { ...val1, owner, statistics };
};
export interface NFTInfo {
  id: number;
  name: string;
  nft_index: number;
  l1_token_id: number;
  l1_address: string;
  is_l1: boolean;
  description: string;
  status: number;
  supply: number;
  content_hash: string;
  media: string;
  nft_url: string;
  media_detail: {
    url: string;
  };
  // audio_thumb: string;
  // image_thumb: string;
  // video_thumb: string;
  created_at: string;
  // nft_url: string;
}
export const handleNFTInfo = (val: NFTInfo): NFTBasic => ({
  id: val.id,
  nftIndex: val.nft_index,
  contentHash: val.content_hash,
  name: val.name,
  desc: val.description,
  url: val.media_detail?.url || "",
  nft_url: ["-", '""'].includes(val.nft_url) ? "" : val.nft_url,
  createdAt: Number(new Date(val.created_at)),
});
export interface NFTPropertyData {
  id: number;
  key: string;
  value: string;
}
export interface NFTLevelData {
  id: number;
  key: string;
  value: number;
  max_value: number;
}
export interface NFTStatData {
  id: number;
  key: string;
  value: number;
  max_value: number;
}
export const handleNFTPropertyData = (val: NFTPropertyData): Property => ({
  key: val.key,
  value: val.value,
});
export const handleNFTLevelData = (val: NFTLevelData | NFTStatData): Level => ({
  key: val.key,
  value: val.value,
  max: val.max_value,
});
export interface NFTPrice {
  offers: {
    payment_asset_amount: number;
    payment_asset_id: number;
  }[];
}
export const handleNFTPrice = (val: NFTPrice): number => {
  let offer = val.offers && val.offers[0];
  if (!offer) return 0;
  return offer.payment_asset_amount;
};
export interface NFTPOC extends NFTInfo, NFTPrice {
  account: OwnerData;
  collection: CollectionInfo;
}
export const handleNFTPOC = (val: NFTPOC): NFTwithPOC => {
  let val1 = handleNFTInfo(val);
  let price = handleNFTPrice(val);
  let owner = handleOwnerData(val.account);
  let collection = handleCollectionInfo(val.collection);
  return { ...val1, price, owner, collection };
};
export interface NFTC extends NFTInfo {
  collection: CollectionInfo;
}
export const handleNFTC = (val: NFTC): NFTwithC => {
  let val1 = handleNFTInfo(val);
  let collection = handleCollectionInfo(val.collection);
  return { ...val1, collection };
};
export interface NFTDetailData extends NFTPOC {
  asset_properties: NFTPropertyData[];
  asset_levels: NFTLevelData[];
  asset_stats: NFTStatData[];
}
export const handleNFTDetailData = (val: NFTDetailData): NFT => {
  let val1 = handleNFTPOC(val);
  let properties = val.asset_properties.map((i) => handleNFTPropertyData(i));
  let levels = val.asset_levels.map((i) => handleNFTLevelData(i));
  let stats = val.asset_stats.map((i) => handleNFTLevelData(i));
  return { ...val1, properties, levels, stats };
};
export interface CountData {
  aggregate: { count: number };
}
export const handleCountData = (val: CountData): number => {
  return val.aggregate.count;
};
