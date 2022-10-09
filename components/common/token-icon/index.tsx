import ImgBox from "../img";

const TokenIcon = (props: { chain: string; size?: number }) => {
  return (
    <ImgBox
      className="token-icon"
      src={`/static/currency/${props.chain}.png`}
      alt={props.chain}
      width={props.size}
      height={props.size}
    />
  );
};

export default TokenIcon;
