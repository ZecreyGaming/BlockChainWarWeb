import { CHAINS } from "config";
import {
  getPKBySig,
  getUncompressedPKBySig,
  getUserByPK,
  signMsg,
} from "utils/connect-wallet";
import {
  connected,
  connecting,
  disconnected,
  updateChainId,
  updatePK,
  updateUser,
} from "redux/feature/wallet";
import store from "redux/store";

const connectMM = async () => {
  const { ethereum } = window as any;
  if (typeof ethereum !== undefined) {
    try {
      store.dispatch(disconnected());
      store.dispatch(connecting());
      let chainId = await ethereum.request({ method: "eth_chainId" });
      let address = (
        await ethereum.request({ method: "eth_requestAccounts" })
      )[0];
      store.dispatch(
        connected({
          selectedAddress: address,
          type: "MetaMask",
          chainId,
        })
      );
      if (!CHAINS.includes(chainId)) {
        let newChainId = await switchChain();
        store.dispatch(updateChainId(newChainId));
      }
      let sig = await signMsg(ethereum);
      let pk = getPKBySig(sig);
      store.dispatch(updatePK(getUncompressedPKBySig(sig)));
      let user = await getUserByPK(pk);
      store.dispatch(updateUser(user));
      return address;
    } catch (err) {
      throw err;
    }
  } else {
    throw new Error("Wallet not found.");
  }
};

const connectZC = async () => {
  const ethereum = (window as any).zecrey;
  if (typeof ethereum !== undefined) {
    try {
      store.dispatch(disconnected());
      store.dispatch(connecting());
      let chainId = await ethereum.request({ method: "eth_chainId" });
      let address = (
        await ethereum.request({ method: "eth_requestAccounts" })
      )[0];
      store.dispatch(
        connected({
          selectedAddress: address,
          type: "Zecrey",
          chainId,
        })
      );
      let info = (
        await ethereum.request({ method: "legend_accounts_info" })
      )[0];
      store.dispatch(updatePK(info.uncompressed));
      let user = await getUserByPK(info.publicKey);
      store.dispatch(updateUser(user));
      return address;
    } catch (err) {
      throw err;
    }
  } else {
    throw new Error("Wallet not found.");
  }
};

const switchChain = async (): Promise<string> => {
  const { ethereum } = window as any;
  if (typeof ethereum !== undefined) {
    return await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CHAINS[0] }],
    });
  } else {
    throw new Error("Wallet not found.");
  }
};

// re-connect, re-sign and update data after the account changing
export const handleWalletOfMetaMask = async () => {
  try {
    const { ethereum } = window as any;
    if (typeof ethereum !== undefined) {
      // handle events
      const handleAccounts = async (accounts: string[]) => {
        let { user } = store.getState().wallet;
        if (!user) return;
        if (!accounts.length) {
          ethereum.removeListener("accountsChanged", handleAccounts);
          store.dispatch(disconnected());
          return;
        }
        // connectMM();
      };

      const handleChain = (chainId: string) => {
        store.dispatch(updateChainId(chainId));
        if (!CHAINS.includes(chainId)) switchChain();
      };

      ethereum.on("accountsChanged", handleAccounts);
      ethereum.on("chainChanged", handleChain);
      // initial
      await connectMM();
    } else {
      throw new Error("Wallet not found.");
    }
  } catch (err) {
    throw err;
  }
};

export const handleWalletOfZecrey = async () => {
  try {
    const ethereum = (window as any).zecrey;
    if (typeof ethereum !== undefined) {
      // handle events
      // const handleAccounts = async (accounts: string[]) => {
      //   let { user } = store.getState().wallet;
      //   if (!user) return;
      //   if (!accounts.length) {
      //     ethereum.removeListener("accountsChanged", handleAccounts);
      //     store.dispatch(disconnected());
      //     return;
      //   }
      //   connectZC();
      // };

      // const handleChain = (chainId: string) => {
      //   store.dispatch(updateChainId(chainId));
      //   if (!CHAINS.includes(chainId)) switchChain();
      // };

      // ethereum.on("accountsChanged", handleAccounts);
      // ethereum.on("chainChanged", handleChain);
      // initial
      await connectZC();
    } else {
      throw new Error("Wallet not found.");
    }
  } catch (err) {
    throw err;
  }
};
