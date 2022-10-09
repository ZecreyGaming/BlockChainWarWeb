import styled from "styled-components";

export const vw = (val: number) => {
  return (val * 100) / 320 + "vw";
};

export const highlight = "#403367";

export const color = "#f1f1f1";

export const warn = "#f7821b";

export const CenterFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BetweenFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FlatBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
`;

export const CenteredFlatBtn = styled(FlatBtn)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PrimaryBtn = styled.button`
  border: 0.1rem solid #2ad4d9;
  border-radius: 0.8rem;
  font-family: "Lexend";
  font-weight: 600;
  background: transparent;
  transition: background 120ms ease-out, color 120ms ease-out;
  color: #2ad4d9;
  &:hover {
    background: #2ad4d9;
    color: #2b2b2b;
  }
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

export const HighLightBtn = styled.button`
  background: linear-gradient(135deg, #00b6ba 0%, #53f8ff 100%);
  border: none;
  border-radius: 0.8rem;
  font-family: "Lexend";
  font-weight: 700;
  color: #000;
  &:hover {
    box-shadow: 0 0 0.5rem ${highlight};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
