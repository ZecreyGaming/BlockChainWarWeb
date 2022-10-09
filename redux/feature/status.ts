import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { wasm: boolean } = { wasm: false };

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    wasmReady: (state, action: PayloadAction<undefined>) => {
      state.wasm = true;
    },
  },
});

export const { wasmReady } = statusSlice.actions;

export default statusSlice.reducer;
