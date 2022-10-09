import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  camp: { chain: string; round: number }[];
  user: { url: string; name: string; round: number }[];
} = { camp: [], user: [] };

export const rankingSlice = createSlice({
  name: "ranking",
  initialState,
  reducers: {
    updateCampRanking: (
      state,
      action: PayloadAction<{ chain: string; round: number }[]>
    ) => {
      state.camp = action.payload;
    },
    updateUserRanking: (
      state,
      action: PayloadAction<{ url: string; name: string; round: number }[]>
    ) => {
      state.user = action.payload;
    },
  },
});

export const { updateCampRanking, updateUserRanking } = rankingSlice.actions;

export default rankingSlice.reducer;
