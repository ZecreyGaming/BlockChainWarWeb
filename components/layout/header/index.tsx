import { CenterFlex } from "styles/globals";
import { HeaderWrap } from "./styles";
import UserCtrls from "./UserCtrls";
import MainLogo from "assets/icons/main-logo.svg";
import SubLogo from "assets/icons/sub-logo.svg";
import Bars from "assets/icons/logo-bars.svg";

const Header = () => {
  return (
    <HeaderWrap>
      <CenterFlex className="main-logo">
        <Bars className="bars" />
        <MainLogo className="logo" />
        <Bars className="bars" />
      </CenterFlex>
      <UserCtrls />
      <CenterFlex className="sub-logo">
        <div className="bar" />
        <SubLogo />
        <div className="bar" />
      </CenterFlex>
    </HeaderWrap>
  );
};

export default Header;
