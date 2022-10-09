import styled from "styled-components";
import { highlight, vw } from "styles/globals";

export const Wrap = styled.div<{ dark: boolean }>`
  min-width: 144rem;
  min-height: 100vh;
  background: #f5f6f8;
  z-index: 10;
  .content {
    position: relative;
    padding-top: 7.8rem;
  }
  @media (max-width: 780px) {
    min-width: 100vw;
    overflow-x: hidden;
    .content {
      padding-top: ${vw(50)};
    }
  }
`;

export const Centered = styled.div`
  width: 128rem;
  margin: 0 auto;
  .img-box.header-img {
    margin: 3rem 0;
  }
`;

export const BGWrap = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding-top: 76rem;
  svg.bg-icon {
    position: absolute;
    bottom: -42.3rem;
    width: 85.8rem;
    height: 85.8rem;
    color: ${highlight};
    opacity: 0.03;
    left: 50%;
    transform: translateX(-50%);
  }
`;
