import classNames from "classnames";
import { SvgCheck } from "./styles";

const Check = (props: { go: boolean; dark: boolean }) => {
  return (
    <SvgCheck
      className={classNames({ go: props.go })}
      width="58"
      height="43"
      viewBox="0 0 58 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.15192 21.5953L21.2376 36.2109L51.5482 6.21094"
        stroke={props.dark ? "url(#check)" : "#01ABB2"}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="check"
          x1="-16.5462"
          y1="21.2109"
          x2="11.052"
          y2="62.9727"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#53F8FF" />
          <stop offset="1" stopColor="#00B6BA" />
        </linearGradient>
      </defs>
    </SvgCheck>
  );
};

export default Check;
