import styled from "styled-components";

export const Wrap = styled.div<{ size: string }>`
  position: relative;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  margin: 0 auto;
`;

const anim = (success: boolean, failed: boolean) => {
  return (
    "loading cubic-bezier(0.41, 0.4, 0.5, 0.71) 1.8s forwards infinite, long linear 1.8s forwards 1s infinite" +
    (success
      ? ", success linear 0.5s forwards;"
      : failed
      ? ", failed linear 0.5s forwards;"
      : ";")
  );
};
export const Svg = styled.svg<{ success: boolean; failed: boolean }>`
  circle.highlight {
    stroke-dasharray: 60 360;
    transform-origin: center;
    animation: ${(props) => anim(props.success, props.failed)};
  }
  @keyframes loading {
    0% {
      transform: rotate(-90deg);
    }
    100% {
      transform: rotate(630deg);
    }
  }
  @keyframes long {
    0% {
      stroke-dasharray: 60 360;
    }
    22% {
      stroke-dasharray: 105 360;
    }
    100% {
      stroke-dasharray: 60 360;
    }
  }
  @keyframes success {
    100% {
      stroke-dasharray: 360 360;
    }
  }
  @keyframes failed {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      stroke-dasharray: 0 360;
    }
  }
`;

export const BrandWrap = styled.div`
  position: absolute;
  top: 29%;
  left: 30.4%;
  width: 39.2%;
  height: 42%;
  .img-box {
    width: 100%;
    height: 100%;
    animation: breath ease-out 2s forwards infinite;
    &.go {
      animation: breath ease-out 2s forwards infinite,
        leave ease-out 0.15s forwards;
    }
  }
  @keyframes breath {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(0.95);
    }
    70% {
      transform: scale(0.88);
    }
    85% {
      transform: scale(0.92);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes leave {
    100% {
      opacity: 0;
      transform: scale(0.2);
    }
  }
`;

export const SvgCheck = styled.svg`
  position: absolute;
  top: 34.1%;
  left: 28.41%;
  width: 43.18%;
  height: 31.8%;
  transform: scale(0);
  transform-origin: center;
  &.go {
    transition: transform ease-out 300ms 150ms;
    transform: scale(1);
  }
`;

export const WarnWrap = styled.div`
  position: absolute;
  top: 29%;
  left: 30.4%;
  width: 39.2%;
  height: 42%;
  .img-box {
    width: 100%;
    height: 100%;
    transform: scale(0);
    &.go {
      transition: transform ease-out 300ms 150ms;
      transform: scale(1);
    }
  }
`;
