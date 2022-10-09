import { Svg } from "./styles";

const Circle = (props: {
  success: boolean;
  failed: boolean;
  dark: boolean;
}) => {
  return (
    <Svg
      success={props.success}
      failed={props.failed}
      viewBox="0 0 126 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="63"
        cy="63"
        r="57"
        stroke={props.dark ? "#303030" : "#D3D3D3"}
        opacity={props.dark ? "0.35" : "1"}
        strokeWidth="12"
      />
      <circle
        className="highlight"
        cx="63"
        cy="63"
        r="57"
        strokeWidth="12"
        strokeLinecap="round"
        stroke={props.dark ? "url(#highlight)" : "#01ABB2"}
        strokeDashoffset={0}
        fill="none"
      />
      <defs>
        <linearGradient id="highlight" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#53F8FF" />
          <stop offset="1" stopColor="#00B6BA" />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Circle;
