import styled from "styled-components";
import { highlight } from "styles/globals";

export const HeaderWrap = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 4.3rem;
  .main-logo {
    padding-top: 3.3rem;
    padding-bottom: 1.8rem;
    svg.bars {
      width: 2.1rem;
      height: 1.2rem;
    }
    svg.logo {
      width: 33.5rem;
      height: 3.8rem;
      margin: 0 2.9rem;
    }
  }
  .sub-logo {
    .bar {
      flex: 1;
      height: 0.2rem;
      background: #f1ecfc;
    }
    svg {
      width: 12.6rem;
      height: 1.8rem;
      margin: 0 2.9rem;
    }
  }
  .user-ctrls {
    position: absolute;
    right: 0;
    top: 3.4rem;
  }
`;

export const UserCtrlsWrap = styled.div`
  margin-left: 1.5rem;
`;

export const ConnectBtnWrap = styled.button`
  height: 3.6rem;
  background: transparent;
  border: 0.1rem solid ${highlight};
  border-radius: 1.8rem;
  padding: 0 1.5rem;
  font-family: "PT Serif";
  font-weight: 700;
  font-size: 1.6rem;
  color: ${highlight};
  transition: all 120ms ease-out;
  white-space: nowrap;
  &:hover {
    background: ${highlight};
    color: #fff;
  }
  &:disabled {
    cursor: wait;
  }
`;

export const CtrlBtn = styled.button<{ backgroundImage?: string }>`
  display: flex;
  align-items: center;
  position: relative;
  min-width: 4.2rem;
  height: 3.6rem;
  border-radius: 1.8rem;
  border: 0.1rem solid ${highlight};
  background-color: transparent;
  padding: 0.5rem 0.9rem 0.5rem 0.5rem;
  white-space: nowrap;
  vertical-align: top;
  transition: all 120ms ease-out;
  font-family: "PT Serif";
  font-weight: 700;
  font-size: 1.4rem;
  color: ${highlight};
  &.avatar {
    .img-box {
      border-radius: 50%;
      pointer-events: none;
      margin-right: 0.5rem;
    }
  }
`;
