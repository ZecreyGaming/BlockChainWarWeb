import { DEFAULT_TOKEN } from "config";
import { formatUnits } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { getLegendAccountInfoByPK } from "utils/legend-api";

export const useBalBNB = () => {
  const [bal, setBal] = useState<number | null>(null);
  const { user } = useSelector((state: RootState) => state.wallet);

  useEffect(() => {
    if (!user?.pub_key) return;
    if (bal === null) {
      getLegendAccountInfoByPK(user.pub_key).then((res) =>
        setBal(
          Number(
            formatUnits(
              res.assets.find((i) => i.asset_id === DEFAULT_TOKEN.asset_id)
                ?.balance || "0",
              DEFAULT_TOKEN.decimal
            )
          )
        )
      );
    }
  }, [user?.pub_key, bal]);

  const update = () => {
    if (user?.pub_key)
      getLegendAccountInfoByPK(user.pub_key).then((res) =>
        setBal(
          Number(
            formatUnits(
              res.assets.find((i) => i.asset_id === DEFAULT_TOKEN.asset_id)
                ?.balance || "0",
              DEFAULT_TOKEN.decimal
            )
          )
        )
      );
  };

  return {
    bal,
    update,
  };
};
