import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {udpateRefresh} from "redux/feature/config";
import {RootState} from "redux/store";
import {CenterFlex} from "styles/globals";
import Note from "./note";
import {Ranking, Wins} from "./statistics";
import {GameWrap, Wrap} from "./styles";
import Votes from "./votes";

const GameBox = () => {
    return (
        <Wrap className="game-box">
            <Votes/>
            <IFrame/>
            <CenterFlex>
                <Wins/>
                <Ranking/>
            </CenterFlex>
            <Note/>
        </Wrap>
    );
};

export default GameBox;

const IFrame = () => {
    const dom = useRef<HTMLIFrameElement>(null);
    const [locked, setLocked] = useState(true);
    const [ac, setAc] = useState(false);
    const {refresh} = useSelector((state: RootState) => state.config);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setAc(true);
            setLocked(false);
        }, 500);
    }, []);

    useEffect(() => {
        if (!locked) setAc(!refresh);
        setTimeout(() => {
            if (refresh) dispatch(udpateRefresh(false));
        }, 500);
    }, [refresh, locked, dispatch]);

    useEffect(() => {
        if (dom.current)
            dom.current?.addEventListener("load", () => {
                const doc = dom.current?.contentDocument;
                if (!doc) return;
                // (dom.current?.contentWindow as any).nftsdk = nftsdk;

                if (doc.body) (doc.body as HTMLElement).style.overflow = "hidden";
            });
    }, []);
    //console.log("=== process.env.NEXT_GAME_API_URL 2===", process.env.NEXT_GAME_API_URL)
    return (

        <GameWrap>
            <iframe
                ref={dom}
                src={
                    ac ? "/web-desktop/index.html?" + process.env.NEXT_GAME_API_URL : ""
                }
            />
        </GameWrap>
    );
};
