import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { id: number; url: string }[] = [];

export const nftsSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {
    updateNFTs: (
      state,
      action: PayloadAction<{ id: number; url: string }[]>
    ) => {
      return (state = action.payload);
    },
    // resetNFTs: (state, action?: PayloadAction<undefined>) => {
    //   state = [];
    // },
    // addNFT: (
    //   state,
    //   action: PayloadAction<{
    //     id: number;
    //     url: string;
    //   }>
    // ) => {
    //   state = state.concat(action.payload);
    // },
  },
});

export const { updateNFTs } = nftsSlice.actions;

export default nftsSlice.reducer;
