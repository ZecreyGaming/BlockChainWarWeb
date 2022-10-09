import { configureStore } from "@reduxjs/toolkit";
import config from "./feature/config";
import wallet from "./feature/wallet";
import ft from "./feature/ft";
import ftPrice from "./feature/ftPrice";
import status from "./feature/status";
import nfts from "./feature/nfts";
import modal from "./feature/modal";
import msg from "./feature/msg";
import votes from "./feature/votes";
import ranking from "./feature/ranking";
import record from "./feature/record";

const store = configureStore({
  reducer: {
    config,
    wallet,
    ft,
    ftPrice,
    status,
    nfts,
    modal,
    msg,
    votes,
    ranking,
    record,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
