import styled from "styled-components";
import { CenterFlex, color, highlight } from "styles/globals";

export const Wrap = styled.div`
  width: 32rem;
  background: rgba(50, 31, 93, 0.02);
  border: 0.1rem solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(1.3rem);
  border-radius: 3rem;
  margin-left: 2rem;
  padding: 2rem;
`;

export const ChatListWrap = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  border: 0.1rem solid rgba(5, 5, 5, 0.05);
  border-radius: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  .chats {
    height: 49.5rem;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-top: 1rem;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .chat {
    justify-content: flex-start;
    padding-left: 0.5rem;
    font-size: 1.4rem;
    line-height: 1.9rem;
    margin-bottom: 0.8rem;
    &:last-child {
      margin: 0;
    }
    .indicator {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.8rem;
      background: #d5d5d5;
      &.bitcoin {
        background: #f7931a;
      }
      &.ethereum {
        background: #627eea;
      }
      &.binance {
        background: #f0bb10;
      }
      &.avalanche {
        background: #e84142;
      }
      &.polygon {
        background: #8247e5;
      }
    }
    .username {
      font-family: "PT Serif";
      color: #848484;
      margin-right: 0.6rem;
    }
    .msg {
      font-family: "PT Serif";
      color: #5a5a5a;
    }
  }
`;

export const DisabledBtn = styled(CenterFlex)`
  cursor: not-allowed;
  height: 13.5rem;
  border-radius: 2rem;
  background: rgba(0, 0, 0, 0.05);
  font-family: "Lexend";
  font-weight: 900;
  font-size: 1.6rem;
  color: #ffff;
`;

export const TextAreaWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  textarea {
    width: 100%;
    height: 8.6rem;
    border-radius: 2rem 2rem 0 0;
    font-family: Lexend;
    font-size: 1.4rem;
    line-height: 1.8rem;
    color: #2b2b2b;
    border: none;
    background: #fff;
    padding: 1.3rem 1.7rem;
    resize: none;
    &::placeholder {
      color: #d7d7d7;
    }
  }
  .counter {
    position: absolute;
    right: 1rem;
    bottom: 5.9rem;
    font-family: Lexend;
    font-size: 1.4rem;
    color: #d7d7d7;
    pointer-events: none;
  }
  button {
    display: block;
    width: 100%;
    height: 4.9rem;
    border-radius: 0 0 2rem 2rem;
    border: none;
    background: #6f3edb;
    font-family: Lexend;
    font-weight: 900;
    font-size: 1.6rem;
    color: #fff;
    opacity: 0.5;
    transition: all 200ms ease-out;
    &:hover {
      opacity: 1;
    }
  }
`;

export const RoundWrap = styled(CenterFlex)`
  flex-direction: column;
  width: 25.6rem;
  height: 8rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  padding: 2.4rem 0 1.9rem 0;
  margin-bottom: 1.5rem;
  .main {
    font-family: "PT Serif";
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.1rem;
    color: ${highlight};
  }
  .sub {
    font-family: "PT Serif";
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: rgba(90, 90, 90, 0.5);
    b {
      color: #ff985d;
    }
  }
  &.fixed {
    position: absolute;
    top: 1rem;
  }
`;

export const WinnerWrap = styled.div`
  margin-bottom: 1.5rem;
  .label {
    font-family: "PT Serif";
    font-weight: 700;
    font-size: 1.6rem;
    color: #ff985d;
    margin-bottom: 0.9rem;
  }
  .card {
    padding: 1.5rem;
    background: #ffffff;
    border-radius: 1rem;
    .info {
      flex: 1;
      padding-left: 1.2rem;
      .main {
        font-family: "TrajanPro3-Bold";
        font-size: 1.8rem;
        line-height: 1.9rem;
        color: #31225c;
      }
      .sub {
        font-family: "PT Serif";
        font-weight: 400;
        font-size: 1.6rem;
        line-height: 2.1rem;
        color: #627eea;
        i {
          font-style: normal;
          opacity: 0.5;
        }
      }
    }
  }
  .divider {
    padding-top: 1.5rem;
    border-bottom: 0.1rem dashed #e8e8e8;
  }
`;
