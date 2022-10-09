import store from "redux/store";
import {
  generateLegendSeedFromSig,
  getCurrentWeb3Provider,
  signMsg,
} from "utils/connect-wallet";

export const proveUpdateAccount = async (
  timestamp: number,
  username: string
): Promise<string> => {
  const { type } = store.getState().wallet;
  if (type === "Zecrey") {
    return await (window as any).zecrey.request({
      method: "legend_eddsaSign",
      params: {
        isLegend: true,
        from: username,
        msg: `${timestamp}update_account`,
      },
    });
  } else {
    let provider = getCurrentWeb3Provider(type);
    if (!provider) throw new Error("No wallet found.");
    let sig = await signMsg(provider);
    let seed = generateLegendSeedFromSig(sig);
    return (global as any).eddsaSign(seed, `${timestamp}update_account`);
  }
};
