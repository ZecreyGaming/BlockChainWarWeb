import classNames from "classnames";
import { ModalWrap, WhitePopup } from "./styles";
import { ReactNode } from "react";
import ReactDom from "react-dom";

const WhiteModal = (props: {
  close: () => void;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
}) => {
  const item = (
    <ModalWrap className={classNames("modal", props.className)}>
      <div
        className={classNames("modal-bg", { disabled: props.disabled })}
        onClick={props.close}
      ></div>
      <WhitePopup className="popup">
        <div className="popup-body">{props.children}</div>
      </WhitePopup>
    </ModalWrap>
  );

  if (!global.window) return item;
  return ReactDom.createPortal(
    item,
    document.getElementById("modal-renderer") as Element
  );
};

export default WhiteModal;
