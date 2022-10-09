import styled from "styled-components";
import { BetweenFlex } from "styles/globals";

export const Wrap = styled.div`
  width: 94rem;
  background: rgba(50, 31, 93, 0.02);
  border: 0.1rem solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(1.3rem);
  border-radius: 3rem;
  padding: 2rem;
  margin-bottom: 10rem;
`;

export const VoteWrap = styled(BetweenFlex)`
  height: 10rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2rem;
  padding: 0 2.5rem;
  margin-bottom: 2rem;
  .vote {
    .token-icon {
      margin-right: 0.8rem;
    }
    .main {
      font-family: "TrajanPro3-Bold";
      font-size: 1.5rem;
      line-height: 1.8rem;
      color: #31225c;
      text-transform: uppercase;
    }
    .sub {
      font-family: "PT Serif";
      font-size: 1.6rem;
      line-height: 2.1rem;
      color: #627eea;
      i {
        font-size: 1.2rem;
        font-style: normal;
        opacity: 0.5;
      }
    }
  }
`;

export const GameWrap = styled.div`
  margin-bottom: 2rem;
  iframe {
    width: 100%;
    height: 66.68rem;
    background: #e4e4e4;
    border-radius: 2rem;
    border: none;
    html {
      overflow: hidden;
    }
  }
`;

export const WinsWrap = styled.div`
  flex: 1;
  height: 19rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  .label {
    font-family: "TrajanPro3-Bold";
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: #31225c;
    margin-bottom: 1.6rem;
    text-transform: uppercase;
  }
  .item {
    margin-bottom: 2rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .name {
    flex: 1;
    margin: 0 0.8rem;
    font-family: "PT Serif";
    font-weight: 700;
    font-size: 1.4rem;
    color: #5a5a5a;
    &.capitalize {
      text-transform: capitalize;
    }
  }
  .round {
    font-family: "PT Serif";
    b {
      font-size: 1.4rem;
      color: #6f3edb;
    }
    span {
      font-size: 1.2rem;
      color: #5a5a5a;
      opacity: 0.65;
    }
  }
`;

export const RankingWrap = styled(WinsWrap)`
  margin-right: 0;
`;

export const NoteWrap = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2rem;
  padding: 2.5rem 3.3rem 4rem 3.3rem;
  .label {
    font-family: "TrajanPro3-Bold";
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: #31225c;
    margin-bottom: 1.2rem;
  }
  .text {
    font-family: "PT Serif";
    font-size: 1.6rem;
    line-height: 2.1rem;
    color: #5a5a5a;
  }
`;
