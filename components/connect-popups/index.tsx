import WhiteModal from "components/common/modal/WhiteModal";
import { WalletType } from "global";
import { useState } from "react";
import { connectWallet } from "utils/connect-wallet";
import RegisterL2 from "./RegisterL2";
import Status from "./Status";
import Wallets from "./Wallets";

export const ConnectPopups = (props: {
  close: () => void;
  disableToClose: boolean;
}) => {
  const [page, setPage] = useState(0); // 0: wallet selector; 1: waiting; 2: failed.
  const [err, setErr] = useState("");

  const connect = (val: WalletType) => {
    setPage(1);
    connectWallet(val)
      // .then((res) => console.log(res))
      .catch((err) => {
        if (err.message === "Account not found. Please contact our staff.") {
          setPage(3);
        } else {
          setErr(err.message);
          setPage(2);
        }
      });
  };

  return (
    <>
      {page === 0 && (
        <WhiteModal close={props.close}>
          <Wallets onClick={connect} close={props.close} />
        </WhiteModal>
      )}
      {page === 1 && (
        <WhiteModal close={props.close}>
          <Status status="waiting" close={props.close} />
        </WhiteModal>
      )}
      {page === 2 && (
        <WhiteModal close={props.close}>
          <Status status="failed" msg={err} close={props.close} />
        </WhiteModal>
      )}
      {page === 3 && <RegisterL2 close={props.close} />}
    </>
  );
};

export default ConnectPopups;
