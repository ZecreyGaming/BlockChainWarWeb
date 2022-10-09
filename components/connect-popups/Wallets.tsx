import { WalletList } from "./styles";
import Zecrey from "assets/icons/zecrey-alt.svg";
import MM from "assets/icons/metamask.svg";
import Spinner from "assets/icons/spinner.svg";
import { CenteredFlatBtn, CenterFlex } from "styles/globals";
import { WalletType } from "global";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const Wallets = (props: {
  onClick: (val: WalletType) => void;
  close: () => void;
}) => {
  const { wasm } = useSelector((state: RootState) => state.status);
  return (
    <WalletList className="wallet-list">
      <CenterFlex className="wallets">
        <button
          className="wallet"
          onClick={() => props.onClick("MetaMask")}
          disabled={!wasm}
        >
          <MM className="mm" />
          <CenterFlex className="name">
            {!wasm && <Spinner className="spin" />}
            <span>Metamask</span>
          </CenterFlex>
        </button>
        <button className="wallet" onClick={() => props.onClick("Zecrey")}>
          <Zecrey className="zc" />
          <div className="name">Zecrey Wallet</div>
        </button>
      </CenterFlex>
      <CenteredFlatBtn className="bottom" onClick={props.close}>
        Close
      </CenteredFlatBtn>
    </WalletList>
  );
};

export default Wallets;
