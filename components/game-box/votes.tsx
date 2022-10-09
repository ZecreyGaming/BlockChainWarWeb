import TokenIcon from "components/common/token-icon";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { CenterFlex } from "styles/globals";
import { VoteWrap } from "./styles";

const Votes = () => {
  const { votes } = useSelector((state: RootState) => state);

  const data = useMemo(() => {
    return [
      { chain: "bitcoin", votes: votes.bitcoin },
      { chain: "ethereum", votes: votes.ethereum },
      { chain: "binance", votes: votes.binance },
      { chain: "avalanche", votes: votes.avalanche },
      { chain: "polygon", votes: votes.polygon },
    ];
  }, [votes]);

  return (
    <VoteWrap>
      {data.map((i, index) => (
        <CenterFlex key={index} className="vote">
          <TokenIcon chain={i.chain} size={45} />
          <div>
            <div className="main">{i.chain}</div>
            <div className="sub">
              {i.votes} <i>votes</i>
            </div>
          </div>
        </CenterFlex>
      ))}
    </VoteWrap>
  );
};

export default Votes;
