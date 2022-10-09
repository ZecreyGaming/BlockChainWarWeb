import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BASE_URL,
  CHAIN_ID,
  DEFAULT_SUFFIX,
  LEGEND_URL,
  RPC_URL,
} from "config";

const initialState: {
  url: string;
  legend_url: string;
  treasury_rate: number | null;
  suffix: string;
  expired_nft_timestamp: number | null;
  rpc: string;
  chain_id: string;
  contract_address: string[];
} = {
  url: BASE_URL,
  legend_url: LEGEND_URL,
  treasury_rate: null,
  suffix: DEFAULT_SUFFIX,
  expired_nft_timestamp: null,
  rpc: RPC_URL,
  chain_id: CHAIN_ID,
  contract_address: [],
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    updateBasicUrl: (state, action) => {
      state.url = action.payload;
    },
    updateLegendUrl: (state, action) => {
      state.legend_url = action.payload;
    },
    updateTreasuryRate: (state, action: PayloadAction<number>) => {
      state.treasury_rate = action.payload;
    },
    updateSuffix: (state, action: PayloadAction<string>) => {
      state.suffix = action.payload;
    },
    updateExpiredNFTTimestamp: (state, action: PayloadAction<number>) => {
      state.expired_nft_timestamp = action.payload;
    },
    updateContractAddress: (state, action: PayloadAction<string[]>) => {
      state.contract_address = action.payload;
    },
  },
});

export const {
  updateBasicUrl,
  updateLegendUrl,
  updateTreasuryRate,
  updateSuffix,
  updateExpiredNFTTimestamp,
  updateContractAddress,
} = configSlice.actions;

export default configSlice.reducer;
