export const formatNumberInShort = (
  val: number | string | undefined | null
) => {
  if (typeof val !== "number") {
    if (isNaN(Number(val))) return "";
    val = Number(val);
  }
  return new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(val);
};

export const formatNumberToCurrency = (
  val: number | string | undefined | null
) => {
  if (typeof val !== "number") {
    if (isNaN(Number(val))) return "";
    val = Number(val);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "never",
  })
    .format(val)
    .replace("$", "");
};

export const formatFloats = (
  val: number | string | undefined | null,
  minDecimal = 0,
  maxDecimal = 8
) => {
  if (typeof val !== "number") {
    if (isNaN(Number(val))) return "";
    val = Number(val);
  }
  return new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: minDecimal,
    maximumFractionDigits: maxDecimal,
  }).format(val);
};
