export const BASE_URL = "/nft_url";

export const LEGEND_URL = "/legend";

export const DEFAULT_SUFFIX = ".zec";

export const RPC_URL = "/rpc";

export const CHAIN_ID = "0x61";

// export const GQL_API = "https://legend-marketplace.hasura.app/v1/graphql";
export const GQL_API = "http://hasura.zecrey.com/v1/graphql";

export const CONTENT_TO_SIGN = (address: string) => `Welcome to Zecrey!

Sign this message to generate your Zecrey Privacy Key. This key lets the application decrypt your balance and generate proofs on Zecrey.

Your authentication status will become invalid when you close the page or refresh the page.

This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address:
${address}`;

export const CHAINS = ["0x61"];

export const DEFAULT_TOKEN = { symbol: "BNB", decimal: 18, asset_id: 0 };

export const DEFAULT_AVATAR = [
  "collection/ar4mk2drgjinqts0fg0f",
  "collection/mchcvmr7edtafsrfvmhl",
];

export const GAS_ACCOUNT_INDEX = 1;

export const GAS_FEE_ASSET_AMOUNT = "100000000000000";

export const EXPIRATION = 5 * 24 * 60 * 60 * 1000;

export const DOMAIN = "https://nft-marketplace-frontend-delta.vercel.app";

export const COLOR = {
  bitcoin: "#f7931a",
  ethereum: "#627EEA",
  binance: "#F0BB10",
  avalanche: "#E84142",
  polygon: "#8247E5",
};

export const CAMP = [
  "",
  "bitcoin",
  "ethereum",
  "binance",
  "avalanche",
  "polygon",
];

export const COIN = ["", "btc", "eth", "bnb", "avax", "matic"];

export const ASSET_DATA = {
  media: "collection/axqr3yl4uhr1p3w93zbe",
  url: "https://res.cloudinary.com/zecrey/image/upload/v1665317766/collection/halknvf5arl5aisg1hml.png",
};
