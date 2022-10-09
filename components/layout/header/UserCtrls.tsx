import ConnectPopups from "components/connect-popups";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { ConnectBtnWrap, CtrlBtn, UserCtrlsWrap } from "./styles";
import { useRouter } from "next/router";
import Avatar from "components/common/avatar";
import SetAvatar from "components/connect-popups/SetAvatar";

const PROTECTED_PATH = [
  "/create",
  "/new-collection",
  "/current/[[...tab]]",
  "/transfer-nft/[id]",
  "/withdraw-nft/[id]",
  "/list-nft/[id]",
];

const UserCtrls = () => {
  const [ac, setAc] = useState(false);
  const [showAvatars, setShowAvatars] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { user, trigger, selectedAddress } = useSelector(
    (state: RootState) => state.wallet
  );
  const router = useRouter();

  useEffect(() => {
    let path = router.pathname;
    if (!ac && !user && PROTECTED_PATH.includes(path)) {
      setAc(true); // always open the modal for protected pathes
      setDisabled(true); // unable to close the modal for protected pathes
    }
    if (user && user.avatar) {
      setAc(false); // close modal when logged in
      setShowAvatars(false);
      setDisabled(false);
    }
    if (user && !user.avatar) {
      setAc(false);
      setShowAvatars(true);
    }
  }, [ac, router, user]);

  useEffect(() => {
    if (trigger && !user) setAc(true);
  }, [trigger, user]);

  return (
    <UserCtrlsWrap className="user-ctrls">
      {user ? (
        <CtrlBtn
          backgroundImage={user.avatar}
          className="avatar"
          onClick={() => {}}
        >
          <Avatar url={user.avatar} size={26} /> {user?.name || selectedAddress}
        </CtrlBtn>
      ) : (
        <ConnectBtn onClick={() => setAc(true)} />
      )}
      {ac && (
        <ConnectPopups close={() => setAc(false)} disableToClose={disabled} />
      )}
      {showAvatars && <SetAvatar close={() => setShowAvatars(false)} />}
    </UserCtrlsWrap>
  );
};

export default UserCtrls;

const ConnectBtn = (props: { onClick: () => void }) => {
  return (
    <ConnectBtnWrap className="connect-button" onClick={props.onClick}>
      <span>Connect Wallet</span>
    </ConnectBtnWrap>
  );
};
