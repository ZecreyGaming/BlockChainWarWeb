import { SDK } from "@zecrey/zecrey-legend-js-sdk";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { getLegendBasicInfo } from "utils/legend-api";
import LEGEND_ABI from "./legend.json";

/**
 * Register L2 account with discount.
 * @param account_name -- Legend account name without suffix.
 * @param pk -- Public key of legend keypair.
 * @param addr -- Ethereum address.
 */
export const registerWithDiscount = async (
  account_name: string,
  pk: string,
  addr: string,
  walletType: string
) => {
  try {
    const sdk = new SDK();
    await sdk.initial();
    const info = await getLegendBasicInfo();
    const fee = await sdk.getRegisterFee(account_name);
    if (!info.contract_addresses[0])
      throw new Error("Legend contract not found.");
    const ctt = new ethers.Contract(
      info.contract_addresses[0],
      LEGEND_ABI,
      new ethers.providers.JsonRpcProvider("/rpc")
    );
    const getPointsOfPK = (pk: string) => {
      if (pk.length !== 128) throw new Error("Invalid public key length.");
      let x = "0x" + pk.slice(0, 64);
      let y = "0x" + pk.slice(64, 128);
      return { x, y };
    };
    let { x, y } = getPointsOfPK(pk);
    const data = (
      await ctt.populateTransaction.registerZNS(
        account_name.replace(".zec", ""),
        addr,
        x,
        y,
        {
          value: fee,
        }
      )
    ).data;
    await signForFreeResigter(
      info.contract_addresses[0],
      addr,
      fee,
      data || "0x",
      walletType
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signForFreeResigter = async (
  to: string,
  from: string,
  fee: string,
  data: string,
  walletType: string
) => {
  const transactionParameters = {
    gasPrice: parseUnits("10", "gwei").toHexString(),
    gas: "300029",
    to,
    from,
    value: fee,
    data,
    chainId: "0x61",
  };
  const { ethereum, zecrey } = window as any;
  if (walletType === "Zecrey" && zecrey) {
    const tx = await zecrey.request({
      method: "eth_sendTransaction",
      params: transactionParameters,
    });
    console.log(tx, "tx-hash");
  } else if (walletType === "MetaMask" && ethereum) {
    const tx = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    console.log(tx, "tx-hash");
  } else {
    throw new Error("Wallet not found.");
  }
};
