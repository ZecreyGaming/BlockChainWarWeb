export type WalletType = "MetaMask" | "Zecrey" | "";

export interface Token {
  asset_id: number;
  symbol: string;
  decimal: number;
}

export interface ValueOption {
  tag: string;
  value: string | number | boolean;
  count: number;
  total: number;
  ratio: number;
}

export interface Attribute {
  key: string;
  range: ValueOption[];
}

export interface PropertyFilter {
  key: string;
  value: string | number | boolean;
}

export interface CollectionStatistics {
  items: number;
  owners?: number;
  floor: number;
  volume: number;
  day_volume: number;
  week_volume: number;
  month_volume: number;
  day_growth: number;
  week_growth: number;
}

export interface CollectionLinks {
  official?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  instagram?: string;
}

export interface CollectionBasic {
  id: number;
  l2_id: number;
  name: string;
  shortname: string;
  logo: string;
  banner: string;
  desc: string;
  verified: boolean;
  createdAt: number;
  token: Token;
  creatorEarningRate: number;
}

export interface Collection extends CollectionBasic {
  owner?: User;
  links?: CollectionLinks;
  attributes?: Attribute[];
  statistics?: CollectionStatistics;
}

export interface Property {
  key: string;
  value: string;
  ratio?: number;
}

export interface Level {
  key: string;
  value: number;
  max: number;
  ratio?: number;
}

export interface User {
  id: number;
  name: string;
  index: number;
  avatar: string;
  banner?: string;
  pub_key: string;
  nickname: string;
}

export interface UserLinks {
  official?: string;
  twitter?: string;
  telegram?: string;
  instagram?: string;
}

export interface Profile extends User {
  links: UserLinks;
}

export interface NFTBasic {
  id: number;
  nftIndex: number;
  contentHash: string;
  name: string;
  desc: string;
  url: string;
  nft_url: string;
  createdAt: number;
}

export interface NFTwithC extends NFTBasic {
  collection: Collection;
}

export interface NFTwithPOC extends NFTBasic {
  collection: Collection;
  owner: User;
  price: number;
}

export interface NFT extends NFTwithPOC {
  properties: Property[];
  levels: Level[];
  stats: Level[];
}

export interface Opt {
  label: string;
  value: string | number | boolean | null;
}
