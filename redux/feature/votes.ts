import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CAMP } from "config";

const initialState: { [chain: string]: number } = {
  [CAMP[1]]: 0,
  [CAMP[2]]: 0,
  [CAMP[3]]: 0,
  [CAMP[4]]: 0,
  [CAMP[5]]: 0,
};

export const votesSlice = createSlice({
  name: "votes",
  initialState,
  reducers: {
    resetVotes: (state, action) => {
      return {
        [CAMP[1]]: 0,
        [CAMP[2]]: 0,
        [CAMP[3]]: 0,
        [CAMP[4]]: 0,
        [CAMP[5]]: 0,
      };
    },
    updateVotes: (
      state,
      action: PayloadAction<{ chain: string; vote: number }>
    ) => {
      state[action.payload.chain] = action.payload.vote;
    },
  },
});

export const { resetVotes, updateVotes } = votesSlice.actions;

export default votesSlice.reducer;
