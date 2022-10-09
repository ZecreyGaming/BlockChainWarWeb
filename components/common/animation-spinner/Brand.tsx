import classNames from "classnames";
import ImgBox from "../img";
import { BrandWrap } from "./styles";

const Brand = (props: { go: boolean; dark: boolean }) => {
  return (
    <BrandWrap>
      <ImgBox
        className={classNames({ go: props.go })}
        src="/static/animation/l2-loading-assets/img_0.png"
        alt="logo"
        fit="contain"
      />
    </BrandWrap>
  );
};

export default Brand;
