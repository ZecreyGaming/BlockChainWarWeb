import AnimationSpinner from "../animation-spinner";
import { Failed, IconWrap, Loading, Spinning } from "./styles";
import Spinner from "assets/icons/spinner.svg";
import Fail from "assets/icons/sad-face.svg";

const LoadingWrap = (props: {
  success: boolean;
  failed: boolean;
  label: string;
  subLabel: string;
  width?: number;
}) => {
  return (
    <Loading
      className="result"
      style={{ width: (props.width || 610) / 10 + "rem" }}
    >
      <AnimationSpinner
        size="12.6rem"
        success={props.success}
        failed={props.failed}
      />
      <label>{props.label}</label>
      <span>{props.subLabel}</span>
    </Loading>
  );
};

export default LoadingWrap;

export const SpinnerWrap = (props: {
  label: string;
  subLabel: string;
  width?: number;
}) => {
  return (
    <Spinning
      className="spinner-loading"
      style={{ width: (props.width || 610) / 10 + "rem" }}
    >
      <IconWrap className="icon-wrap">
        <Spinner className="spinner spin" />
      </IconWrap>
      <label>{props.label}</label>
      <span>{props.subLabel}</span>
    </Spinning>
  );
};

export const FailedWrap = (props: {
  label: string;
  subLabel: string;
  width?: number;
}) => {
  return (
    <Failed
      className="failed"
      style={{ width: (props.width || 610) / 10 + "rem" }}
    >
      <IconWrap className="icon-wrap">
        <Fail className="failed" />
      </IconWrap>
      <label>{props.label}</label>
      <span>{props.subLabel}</span>
    </Failed>
  );
};
