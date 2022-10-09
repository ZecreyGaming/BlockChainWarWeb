import styled from "styled-components";
import { CenterFlex, color, warn } from "styles/globals";

export const ModalWrap = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  min-width: 61rem;
  min-height: 40rem;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  .modal-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    &.disabled {
      pointer-events: none;
    }
  }
`;

export const Popup = styled.div<{ width: number }>`
  position: absolute;
  width: ${(props) => props.width / 10}rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(56, 56, 56, 0.95);
  border: 0.1rem solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  .popup-header {
    position: relative;
    height: 5rem;
    span {
      display: block;
      text-align: center;
      font-family: "Lexend";
      font-weight: 800;
      font-size: 1.8rem;
      line-height: 5rem;
      color: #f2f2f2;
    }
    button {
      position: absolute;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      top: 1.1rem;
      right: 1.7rem;
      transition: background 120ms ease-out;
      svg {
        width: 1.4rem;
        height: 1.4rem;
        color: #fff;
        opacity: 0.3;
        transition: opacity 120ms ease-out;
      }
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        svg {
          opacity: 1;
        }
      }
      &:disabled {
        cursor: not-allowed;
      }
    }
  }
`;

export const Loading = styled(CenterFlex)`
  flex-direction: column;
  width: 100%;
  padding: 4rem 0;
  margin: 0 auto 3rem auto;
  background: rgba(85, 85, 85, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  label {
    display: block;
    font-family: "IBM Plex Sans";
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.1rem;
    color: ${color};
    margin-top: 2rem;
    margin-bottom: 0.3rem;
  }
  span {
    font-family: "IBM Plex Sans";
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: #b2b2b2;
    max-width: 90%;
    word-break: break-word;
    text-align: center;
  }
`;

export const Spinning = styled(Loading)`
  label {
    color: #f2f2f2;
  }
`;

export const Failed = styled(Loading)`
  label {
    color: ${warn};
  }
`;

export const IconWrap = styled(CenterFlex)`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background: #373737;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0.5rem auto 0 auto;
  svg {
    width: 4rem;
    height: 4rem;
    &.spin {
      color: #f2f2f2;
    }
    &.failed {
      color: ${warn};
    }
  }
`;

export const WhitePopup = styled.div`
  position: absolute;
  width: 66rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
