import { useEffect, useRef, useState } from "react";
import { CenterFlex } from "styles/globals";
import Note from "./note";
import { Ranking, Wins } from "./statistics";
import { GameWrap, Wrap } from "./styles";
import Votes from "./votes";

const GameBox = () => {
  return (
    <Wrap className="game-box">
      <Votes />
      <IFrame />
      <CenterFlex>
        <Wins />
        <Ranking />
      </CenterFlex>
      <Note />
    </Wrap>
  );
};

export default GameBox;

const IFrame = () => {
  const dom = useRef<HTMLIFrameElement>(null);
  const [ac, setAc] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAc(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (dom.current)
      dom.current?.addEventListener("load", () => {
        const doc = dom.current?.contentDocument;
        if (!doc) return;
        // (dom.current?.contentWindow as any).nftsdk = nftsdk;

        if (doc.body) (doc.body as HTMLElement).style.overflow = "hidden";
      });
  }, []);

  return (
    <GameWrap>
      <iframe
        ref={dom}
        src={ac ? "/web-desktop/index.html?wss://warrior.spacedreams.top" : ""}
      />
    </GameWrap>
  );
};
