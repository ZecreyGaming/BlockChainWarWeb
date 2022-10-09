import classNames from "classnames";
import ImgBox from "../img";
import { WarnWrap } from "./styles";

const Warn = (props: { go: boolean }) => {
  return (
    <WarnWrap>
      <ImgBox
        className={classNames({ go: props.go })}
        src="/static/animation/l2-fail-assets/img_0.png"
        alt="warn"
        fit="contain"
      />
    </WarnWrap>
  );
};

export default Warn;
