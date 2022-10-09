import classNames from "classnames";
import TokenIcon from "components/common/token-icon";
import { net } from "components/ws";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord } from "redux/feature/record";
import { RootState } from "redux/store";
import { CenterFlex } from "styles/globals";
import {
  ChatListWrap,
  DisabledBtn,
  RoundWrap,
  TextAreaWrap,
  WinnerWrap,
  Wrap,
} from "./styles";

const ChatBox = () => {
  return (
    <Wrap className="chat-box">
      <ChatList />
      <TextArea />
    </Wrap>
  );
};

export default ChatBox;

const ChatList = () => {
  const data = useSelector((state: RootState) => state.msg);
  const [showRound, setShowRound] = useState(false);
  const dom = useRef<HTMLDivElement>(null);

  const current = useMemo(() => {
    return data.filter(
      (i) => i.type === "round" && new Date(i.endAt).getTime() > Date.now()
    )[0];
  }, [data]);

  useEffect(() => {
    if (dom.current) dom.current.scrollTo(0, dom.current.scrollHeight);
  }, [data]);

  const onScroll = () => {
    let card = dom.current?.querySelector("#round-wrap");
    if (!card) return;
    if (card.getBoundingClientRect().top - card.clientHeight < 0) {
      setShowRound(true);
    } else {
      setShowRound(false);
    }
  };

  return (
    <ChatListWrap>
      <div className="chats" ref={dom} onScroll={onScroll}>
        {data.map((i, index) => (
          <ChatItem key={index} {...i} />
        ))}
      </div>
      {current && showRound ? (
        <RoundInfo
          index={current.index as number}
          endAt={current.endAt as string}
          fixed
        />
      ) : null}
    </ChatListWrap>
  );
};

const ChatItem = (props: any) => {
  switch (props.type) {
    case "msg":
      return (
        <CenterFlex className="chat">
          <div className={classNames("indicator", props.chain)} />
          <div className="username">
            {props.username.replace(".legend", "")}:
          </div>
          <div className="msg">{props.msg}</div>
        </CenterFlex>
      );
    case "winner":
      return <WinnerInfo chain={props.chain} votes={props.votes} />;
    case "round":
      return <RoundInfo index={props.index} endAt={props.endAt} />;
    default:
      return null;
  }
};

const TextArea = () => {
  const [val, setVal] = useState("");
  const { user } = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 80) setVal(e.target.value);
  };
  const submit = () => {
    if (!val) return;
    let temp = val.trim();
    net.request(
      "chat.message",
      {
        player_id: user?.index,
        player_name: user?.name,
        message: temp,
        timestamp: Date.now(),
      },
      (cb: any) => {
        console.log("callback", cb);
        if (cb.code === 0) dispatch(addRecord(temp));
      }
    );
    setVal("");
  };

  if (!user) return <DisabledBtn>Wallet not connected</DisabledBtn>;
  return (
    <TextAreaWrap>
      <textarea
        placeholder="Enter your supported blockchain, e.g. btc\eth\bnb\avax\matic"
        value={val}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        }}
      />
      <div className="counter">{val.length}/80</div>
      <button onClick={submit}>Send to fight</button>
    </TextAreaWrap>
  );
};

const RoundInfo = (props: {
  index: number;
  endAt: string;
  fixed?: boolean;
}) => {
  const [dur, setDur] = useState("");
  const [end, setEnd] = useState(false);

  useEffect(() => {
    let endAt = new Date(props.endAt).getTime();
    let now = Date.now();
    if (now > endAt) return setEnd(true);
    let sec = Math.floor((endAt - now) / 1000) - 1;
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    setDur(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    let timer = setInterval(() => {
      let sec = Math.floor((endAt - Date.now()) / 1000) - 1;
      let minutes = Math.floor(sec / 60);
      let seconds = Math.floor(sec % 60);
      setDur(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      if (sec === 0) {
        setEnd(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [props.endAt]);

  if (end) return null;
  return (
    <RoundWrap id="round-wrap" className={classNames({ fixed: props.fixed })}>
      <div className="main">Game Round {props.index}</div>
      <div className="sub">
        This round ends on: <b>{dur}</b>
      </div>
    </RoundWrap>
  );
};

const WinnerInfo = (props: { chain: string; votes: number }) => {
  return (
    <WinnerWrap>
      <CenterFlex className="label">- Winner -</CenterFlex>
      <CenterFlex className="card">
        <TokenIcon chain={props.chain} size={50} />
        <div className="info">
          <div className="main">{props.chain}</div>
          <div className="sub">
            {props.votes} <i>vote{props.votes > 1 ? "s" : ""}</i>
          </div>
        </div>
      </CenterFlex>
      <div className="divider" />
    </WinnerWrap>
  );
};
