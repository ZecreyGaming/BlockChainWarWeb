import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mintNFT } from "utils/createNFT";

const initialState: string[] = [];

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<string>) => {
      return state.concat(action.payload);
    },
    clearRecord: (
      state,
      action: PayloadAction<{
        chain: string;
        coin: string;
        username: string;
        userindex: number;
      }>
    ) => {
      // if (
      //   state.filter(
      //     (i) =>
      //       i.toLowerCase().includes(action.payload.chain) ||
      //       i.toLowerCase().includes(action.payload.coin)
      //   ).length > 0
      // )
      //   mintNFT(action.payload.username, action.payload.userindex);
      return [];
    },
  },
});

export const { addRecord, clearRecord } = recordSlice.actions;

export default recordSlice.reducer;
