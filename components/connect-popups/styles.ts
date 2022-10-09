import styled from "styled-components";
import {
  BetweenFlex,
  CenteredFlatBtn,
  CenterFlex,
  color,
  highlight,
  warn,
} from "styles/globals";

export const WalletList = styled(CenterFlex)`
  flex-direction: column;
  border-radius: 2rem;
  .wallets {
    width: 100%;
    height: 24.3rem;
    padding: 3rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(1.3rem);
    border-radius: 2rem 2rem 0 0;
    button {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 18.3rem;
      margin-right: 2rem;
      background: rgba(0, 0, 0, 0.02);
      border: 0.2rem solid transparent;
      border-radius: 2rem;
      transition: all 200ms ease-out;
      &:last-child {
        margin: 0;
      }
      &:hover {
        border-color: ${highlight};
      }
      svg.mm {
        width: 10rem;
        height: 13.7rem;
        padding-top: 2.5rem;
        padding-bottom: 1.7rem;
      }
      svg.zc {
        width: 8rem;
        height: 13.7rem;
        padding-top: 2.5rem;
        padding-bottom: 1.7rem;
      }
      svg.spin {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.7rem;
      }
      .name {
        font-family: "PT Serif";
        font-weight: 700;
        font-size: 1.6rem;
        color: #5a5a5a;
      }
    }
  }
  button.bottom {
    display: block;
    width: 100%;
    background: #6f3edb;
    border-radius: 0 0 2rem 2rem;
    height: 5rem;
    font-family: Lexend;
    font-weight: 900;
    font-size: 1.6rem;
    color: #fff;
  }
`;

export const StatusWrap = styled(CenterFlex)<{ isWaiting: boolean }>`
  flex-direction: column;
  width: 66rem;
  height: 24.3rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(1.3rem);
  border-radius: 2rem 2rem 0 0;
  margin: 0;
  padding: 4.5rem 0 4rem 0;
  .icon {
    width: 9rem;
    height: 9rem;
    min-height: 9rem;
    border-radius: 50%;
    background: #d2d2d2;
    border: 0.1rem solid rgba(255, 255, 255, 0.1);
    margin-bottom: 2rem;
    svg.spinner {
      width: 4rem;
      height: 4rem;
      color: ${highlight};
    }
    svg.failed {
      width: 5rem;
      height: 5rem;
      color: ${warn};
    }
  }
  .main {
    font-family: "IBM Plex Sans";
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.1rem;
    color: ${(props) => (props.isWaiting ? highlight : warn)};
    margin-bottom: 0.5rem;
  }
  .sub {
    font-family: "IBM Plex Sans";
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.8rem;
    color: #999;
    text-align: center;
    padding: 0 2rem;
  }
`;

export const BottomBtn = styled(CenteredFlatBtn)`
  display: block;
  width: 100%;
  background: #6f3edb;
  border-radius: 0 0 2rem 2rem;
  height: 5rem;
  font-family: Lexend;
  font-weight: 900;
  font-size: 1.6rem;
  color: #fff;
`;

export const RegsiterForm = styled.div`
  width: 55rem;
  margin: 0 auto;
  .card {
    background: rgba(85, 85, 85, 0.5);
    border: 0.1rem solid rgba(255, 255, 255, 0.05);
    border-radius: 0.8rem;
    padding: 3rem;
    margin-bottom: 1.5rem;
    .img-box {
      margin-right: 2rem;
    }
    .text {
      font-family: "IBM Plex Sans";
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: #f1f1f1;
      .main {
        margin-bottom: 1.4rem;
      }
      .sub {
        font-weight: 700;
        color: #f69800;
      }
    }
  }
`;

export const Input = styled.div`
  background: rgba(85, 85, 85, 0.5);
  border: 0.1rem solid rgba(255, 255, 255, 0.05);
  border-radius: 0.8rem;
  padding: 0 1.5rem;
  .title {
    height: 4rem;
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
    .label {
      font-family: "Lexend";
      font-weight: 700;
      font-size: 1.4rem;
      line-height: 1.8rem;
      color: #fff;
    }
    svg {
      width: 2rem;
      height: 2rem;
      color: #fff;
      opacity: 0.5;
    }
  }
  .input {
    height: 5rem;
    margin-top: 1.5rem;
    font-size: 1.6rem;
    input {
      font-size: 1.6rem;
    }
  }
  .msg {
    padding: 1.2rem 0;
    svg {
      width: 1.8rem;
      height: 1.8rem;
      margin-right: 0.5rem;
      vertical-align: top;
    }
    &.err {
      color: ${warn};
    }
    &.loading {
      color: #2ad4d9;
    }
    &.success {
      color: #3aba25;
      svg {
        background: #3aba25;
        color: #2b2b2b;
        padding: 0.5rem 0.4rem;
        border-radius: 50%;
      }
    }
  }
`;

export const Btn = styled(CenterFlex)`
  height: 9.4rem;
  button {
    padding: 0 1.7rem;
    height: 3.5rem;
    border-radius: 1.8rem;
    font-weight: 700;
    font-size: 1.6rem;
    &:disabled {
      color: #616161;
      border-color: #616161;
      background: none;
    }
  }
`;

export const Info = styled.div`
  width: 55rem;
  background: rgba(85, 85, 85, 0.5);
  border: 0.1rem solid rgba(255, 255, 255, 0.05);
  border-radius: 0.8rem;
  margin: 0 auto 1.5rem auto;
  padding: 0 1.5rem;
  .header {
    height: 4rem;
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
    font-family: "Lexend";
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 1.8rem;
    color: #fff;
    svg {
      width: 1.7rem;
      height: 2rem;
      opacity: 0.5;
    }
  }
  .info {
    padding: 0 0.5rem;
    height: 7rem;
    border-bottom: 0.1rem dashed rgba(255, 255, 255, 0.1);
    .label {
      font-family: "IBM Plex Sans";
      font-size: 1.4rem;
      color: #f1f1f1;
    }
    .value {
      font-family: "IBM Plex Sans";
      font-weight: 700;
      font-size: 1.6rem;
      color: #fff;
      &.name {
        color: #2ad4d9;
      }
      &.price {
        color: #fff;
        .token-icon {
          margin-right: 0.7rem;
        }
      }
      &.discount {
        color: #f69800;
      }
    }
    &:last-child {
      border: none;
    }
  }
`;

export const FreeText = styled(CenterFlex)`
  width: 55rem;
  background: rgba(85, 85, 85, 0.5);
  border: 0.1rem solid rgba(255, 255, 255, 0.05);
  border-radius: 0.8rem;
  margin: 0 auto 1.5rem auto;
  padding: 2rem;
  font-family: "IBM Plex Sans";
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: #b2b2b2;
  svg {
    width: 3rem;
    min-width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: #2ad4d9;
    color: #2b2b2b;
    margin-right: 1.2rem;
    padding: 0.7rem;
  }
  b {
    font-weight: 700;
    color: #fff;
  }
`;

export const Total = styled(BetweenFlex)`
  width: 55rem;
  background: rgba(85, 85, 85, 0.5);
  border: 0.1rem solid rgba(255, 255, 255, 0.05);
  border-radius: 0.8rem;
  margin: 0 auto;
  padding: 3rem 3rem 3rem 2.5rem;
  font-family: "IBM Plex Sans";
  .label {
    font-size: 1.4rem;
    color: #f1f1f1;
  }
  .main {
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2.3rem;
    color: #fff;
    text-align: right;
  }
  .sub {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.8rem;
    color: #b2b2b2;
    text-align: right;
  }
  .token-icon {
    margin-left: 1rem;
  }
`;

export const ResultWrap = styled.div`
  width: 55rem;
  margin: 0 auto;
  .result {
    width: 55rem !important;
    margin: 0;
  }
`;

export const SuffixWrap = styled(CenterFlex)`
  width: 100%;
  font-family: "IBM Plex Sans";
  font-size: 1.4rem;
  line-height: 1.8rem;
  color: #dadada;
  background: rgba(47, 47, 47, 0.298295);
  border: 0.1rem solid rgba(255, 255, 255, 0.4);
  border-radius: 0.7rem;
  transition: border 120ms ease-out;
  padding: 0 1rem;
  span {
    cursor: text;
  }
  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
  }
  &.focused {
    border-color: #2ad4d9;
  }
  input.input-with-prefix {
    flex: 1;
    background: none;
    border: none;
    padding-left: 0;
    font-family: "IBM Plex Sans";
    font-size: 1.4rem;
    line-height: 1.8rem;
    color: ${color};
    &::placeholder {
      opacity: 0.5rem;
    }
  }
`;

export const AvatarList = styled(CenterFlex)`
  flex-direction: column;
  .wrap {
    width: 100%;
    height: 42rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(1.3rem);
    border-radius: 2rem 2rem 0 0;
    padding-left: 3rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    .current {
      width: 60rem;
      height: 12rem;
      border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
      .img-box {
        margin-right: 1.8rem;
      }
      .username {
        flex: 1;
        label {
          display: block;
          font-family: "PT Serif";
          font-weight: 700;
          font-size: 1.8rem;
          line-height: 2.4rem;
          color: #31225c;
          margin-bottom: 0.6rem;
        }
        span {
          font-family: "PT Serif";
          font-weight: 700;
          font-size: 1.4rem;
          line-height: 1.9rem;
          color: #848484;
        }
      }
    }
    .list {
      width: 62.7rem;
      height: 26rem;
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0.8rem;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
      }
      button {
        position: relative;
        width: 8.7rem;
        height: 8.7rem;
        border: 0.3rem solid #fff;
        border-radius: 2rem;
        margin-right: 1.6rem;
        margin-bottom: 1.5rem;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        overflow: hidden;
        transition: all 200ms ease-out;
        vertical-align: top;
        &:hover {
          border-color: #6f3edb;
        }
        &.ac {
          border-color: #6f3edb;
          svg {
            position: absolute;
            width: 3.4rem;
            height: 3.4rem;
            right: 0;
            bottom: 0;
            border-radius: 1.5rem 0 0 0;
            background: rgba(111, 62, 219, 0.75);
            padding: 0.6rem 0.8rem;
            color: #fff;
          }
        }
      }
    }
  }
`;
