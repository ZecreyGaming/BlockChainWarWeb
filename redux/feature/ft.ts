import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_TOKEN } from "config";

const initialState: { symbol: string; decimal: number; asset_id: number }[] = [
  DEFAULT_TOKEN,
];

export const ftSlice = createSlice({
  name: "ft",
  initialState,
  reducers: {
    updateFT: (
      state,
      action: PayloadAction<
        { symbol: string; decimal: number; asset_id: number }[]
      >
    ) => {
      state = action.payload;
    },
    resetFT: (state, action: PayloadAction<undefined>) => {
      state = [];
    },
    addFT: (
      state,
      action: PayloadAction<{
        symbol: string;
        decimal: number;
        asset_id: number;
      }>
    ) => {
      state = state.concat(action.payload);
    },
  },
});

export const { updateFT, resetFT, addFT } = ftSlice.actions;

export default ftSlice.reducer;
