import axios from "axios";
import { DEFAULT_TOKEN } from "config";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAllFtPrices, updateFtPrice } from "redux/feature/ftPrice";
import store, { RootState } from "redux/store";

export const useFtPrice = (
  val: string | number = DEFAULT_TOKEN.symbol
): { price: number | null; update: () => void } => {
  const [usd, setUsd] = useState<number | null>(null);
  const { ftPrice, ft } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const symbol = useMemo(() => {
    if (typeof val === "string") return val;
    if (typeof val === "number")
      return ft.find((i) => i.asset_id === val)?.symbol || DEFAULT_TOKEN.symbol;
    return DEFAULT_TOKEN.symbol;
  }, [val, ft]);
  const price = useMemo(() => ftPrice[symbol], [symbol, ftPrice]);

  useEffect(() => {
    if (price === undefined) {
      setUsd(null);
      getPrice([symbol]).then(([price]) =>
        dispatch(updateFtPrice({ symbol, price }))
      );
    } else {
      setUsd(price);
    }
  }, [price, dispatch, symbol]);

  const update = () => {
    getPrice([symbol]).then(([price]) =>
      dispatch(updateFtPrice({ symbol, price }))
    );
  };

  return { price: usd, update };
};

export const useGetFtPrices = (symbols: string[]) => {
  const dispatch = useDispatch();

  const update = useCallback(() => {
    getPrice(symbols).then((prices) => {
      let obj: { [symbol: string]: number } = {};
      prices.forEach((i, index) => (obj[symbols[index]] = i));
      dispatch(updateAllFtPrices(obj));
    });
  }, [symbols, dispatch]);

  useEffect(() => update(), [update]);

  return { update };
};

export const getPrice = async (symbols: string[]): Promise<number[]> => {
  const { legend_url } = store.getState().config;
  let url = legend_url + "/api/v1/info/getCurrencyPriceBySymbol";
  try {
    let res = await Promise.all(
      symbols.map((symbol) => axios.get(url, { params: { symbol } }))
    );
    return res.map((i) => i.data.price);
  } catch (err) {
    console.log("Failed to fetch currencies' prices.");
    throw err;
  }
};
