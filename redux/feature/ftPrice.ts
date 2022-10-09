import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { [symbol: string]: number } = {};

export const ftPriceSlice = createSlice({
  name: "ftPrice",
  initialState,
  reducers: {
    updateFtPrice: (
      state,
      action: PayloadAction<{ symbol: string; price: number }>
    ) => {
      state[action.payload.symbol] = action.payload.price;
    },
    updateAllFtPrices: (
      state,
      action: PayloadAction<{ [symbol: string]: number }>
    ) => {
      state = action.payload;
    },
  },
});

export const { updateFtPrice, updateAllFtPrices } = ftPriceSlice.actions;

export default ftPriceSlice.reducer;
