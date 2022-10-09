import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CHAINS } from "config";
import { Profile, WalletType } from "global";

const initialState: {
  status: 0 | 1 | 2;
  type: WalletType;
  chainId: string;
  selectedAddress: string;
  onInvalidChain: boolean;
  user: Profile | null;
  pk: string;
  isLegendUser: boolean;
  trigger: boolean;
} = {
  status: 0, // 0 for not connected, 1 for connected, 2 for loading
  type: "",
  chainId: "",
  onInvalidChain: false,
  selectedAddress: "",
  user: null,
  pk: "", // pk record for register new account
  isLegendUser: false,
  trigger: false, // true for poping up the login modal
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connecting: (state) => {
      state.status = 2;
    },
    connected: (
      state,
      action: PayloadAction<{
        selectedAddress: string;
        type: WalletType;
        chainId: string;
      }>
    ) => {
      if (!action.payload.selectedAddress)
        throw new Error("No account to connect.");
      state.status = 1;
      state.type = action.payload.type;
      state.selectedAddress = action.payload.selectedAddress;
      state.chainId = action.payload.chainId;
    },
    disconnected: (state, action: PayloadAction<undefined>) => {
      state.status = 0;
      state.type = "";
      state.chainId = "";
      state.onInvalidChain = false;
      state.selectedAddress = "";
      state.user = null;
      state.isLegendUser = false;
    },
    updateChainId: (state, action: PayloadAction<string>) => {
      state.chainId = action.payload;
      state.onInvalidChain = !CHAINS.includes(action.payload);
    },
    updateUser: (state, action: PayloadAction<Profile>) => {
      state.user = action.payload;
      state.isLegendUser = action.payload.index ? true : false;
    },
    updatePK: (state, action: PayloadAction<string>) => {
      state.pk = action.payload;
    },
    updateTrigger: (state, action: PayloadAction<boolean>) => {
      state.trigger = action.payload;
    },
  },
});

export const {
  connecting,
  connected,
  disconnected,
  updateChainId,
  updateUser,
  updatePK,
  updateTrigger,
} = walletSlice.actions;

export default walletSlice.reducer;
