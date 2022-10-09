import Avatar from "components/common/avatar";
import TokenIcon from "components/common/token-icon";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { CenterFlex } from "styles/globals";
import { RankingWrap, WinsWrap } from "./styles";

export const Wins = () => {
  const data = useSelector((state: RootState) => state.ranking.camp);

  return (
    <WinsWrap>
      <div className="label">Most wins:</div>
      {data.map((i, index) => (
        <CenterFlex className="item" key={index}>
          <TokenIcon chain={i.chain} size={25} />
          <div className="name capitalize">{i.chain}</div>
          <div className="round">
            <b>{i.round}</b> <span>Rounds</span>
          </div>
        </CenterFlex>
      ))}
    </WinsWrap>
  );
};

export const Ranking = () => {
  const data = useSelector((state: RootState) => state.ranking.user);

  return (
    <RankingWrap>
      <div className="label">Winner Ranking:</div>
      {data.map((i, index) => (
        <CenterFlex className="item" key={index}>
          <Avatar url={i.url} size={25} />
          <div className="name">{i.name}</div>
          <div className="round">
            <b>{i.round}</b> <span>Rounds</span>
          </div>
        </CenterFlex>
      ))}
    </RankingWrap>
  );
};
