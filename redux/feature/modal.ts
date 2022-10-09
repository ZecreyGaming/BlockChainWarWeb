import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  ac: boolean;
  done: boolean | null;
  err: string;
  id: number;
  url: string;
  name: string;
} = {
  ac: false,
  done: null,
  err: "",
  id: -1,
  url: "",
  name: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateModalAc: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        return (state = {
          ac: false,
          done: null,
          err: "",
          id: -1,
          url: "",
          name: "",
        });
      } else {
        state.ac = action.payload;
      }
    },
    updateModalStatus: (state, action: PayloadAction<boolean>) => {
      state.done = action.payload;
    },
    updateModalNFT: (
      state,
      action: PayloadAction<{ id: number; url: string; name: string }>
    ) => {
      state.id = action.payload.id;
      state.url = action.payload.url;
      state.name = action.payload.name;
    },
    updateModalErr: (state, action: PayloadAction<string>) => {
      state.err = action.payload;
    },
  },
});

export const {
  updateModalAc,
  updateModalStatus,
  updateModalNFT,
  updateModalErr,
} = modalSlice.actions;

export default modalSlice.reducer;
