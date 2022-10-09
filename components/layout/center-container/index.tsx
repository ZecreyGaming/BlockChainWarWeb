import ImgBox from "components/common/img";
import { ReactNode } from "react";
import { Centered } from "../styles";

const CenterContainer = (props: {
  children?: ReactNode;
  headerImg?: string;
}) => {
  return (
    <Centered className="center-container">
      {props.headerImg ? (
        <ImgBox
          className="header-img"
          src={props.headerImg}
          alt="layout header image"
          width={1280}
          height={140}
        />
      ) : null}
      {props.children}
    </Centered>
  );
};

export default CenterContainer;
