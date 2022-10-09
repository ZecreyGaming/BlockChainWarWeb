import classNames from "classnames";
import { CenteredFlatBtn } from "styles/globals";
import { ModalWrap, Popup } from "./styles";
import Close from "assets/icons/close.svg";
import { ReactNode } from "react";
import ReactDom from "react-dom";

const Modal = (props: {
  label: string;
  close: () => void;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  width?: number;
}) => {
  const item = (
    <ModalWrap className={classNames("modal", props.className)}>
      <div
        className={classNames("modal-bg", { disabled: props.disabled })}
        onClick={props.close}
      ></div>
      <Popup className="popup" width={props.width || 580}>
        <div className="popup-header">
          <span>{props.label}</span>
          <CenteredFlatBtn onClick={props.close} disabled={props.disabled}>
            <Close />
          </CenteredFlatBtn>
        </div>
        <div className="popup-body">{props.children}</div>
      </Popup>
    </ModalWrap>
  );

  if (!global.window) return item;
  return ReactDom.createPortal(
    item,
    document.getElementById("modal-renderer") as Element
  );
};

export default Modal;
