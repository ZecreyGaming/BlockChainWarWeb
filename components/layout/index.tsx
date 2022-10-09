import { ReactNode } from "react";
import BG from "./BG";
import CenterContainer from "./center-container";
import Header from "./header";
import { Wrap } from "./styles";

const Layout = (props: { children: ReactNode | undefined }) => {
  return (
    <Wrap className="layout" dark>
      <BG />
      <CenterContainer>
        <Header />
        {props.children}
      </CenterContainer>
      <div id="account-ctrl-renderer" />
      <div id="modal-renderer" />
    </Wrap>
  );
};

export default Layout;
