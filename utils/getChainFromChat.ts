import { CAMP, COIN } from "config";

export const getChainFromChat = (text: string) => {
  let chain = "";
  for (let i = 1; i < CAMP.length; i++) {
    if (
      text.toLowerCase().includes(CAMP[i]) ||
      text.toLowerCase().includes(COIN[i])
    ) {
      chain = CAMP[i];
      break;
    }
  }
  return chain;
};
