import { CAMP, COIN } from "config";
import { Profile } from "global";
import { throttle } from "lodash";
import { ReactNode, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewMsg, resetMsg } from "redux/feature/msg";
import { updateCampRanking, updateUserRanking } from "redux/feature/ranking";
import { clearRecord } from "redux/feature/record";
import { resetVotes, updateVotes } from "redux/feature/votes";
import { RootState } from "redux/store";
import { getChainFromChat } from "utils/getChainFromChat";
import Network from "utils/Network";
import { MessageBase, PackageBase, ProtocolBase } from "utils/ProtocolBase";

export const net = new Network();

const WSProvider = (props: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.wallet);

  const func = useRef(
    throttle(
      (user: Profile) => {
        net.init(
          {
            url: "wss://warrior.spacedreams.top",
            package: new PackageBase(),
            message: new MessageBase(),
            protocol: new ProtocolBase(),
            debug: true,
          },
          () => {
            net.request(
              "chat.join",
              {
                player_id: user?.index,
                player_name: user?.name,
                avatar: user?.avatar || "",
                thumbnail: user?.avatar || "",
                created_at: Date.now(),
              },
              (cb: any) => console.log("callback", cb)
            );
          }
        );
        net.on(Network.Event.ON_PUSH, (route: string, msg) => {
          console.log("on push", route, msg);
          // if (route === "onHistoryMessage") {
          //   let arr = msg
          //     .sort((a: any, b: any) => a.ID - b.ID)
          //     .map((i: any) => ({
          //       type: "msg",
          //       username: i.player.player_name,
          //       msg: i.message,
          //     }));
          //   dispatch(resetMsg(arr));
          // }
          if (route === "onMessage") {
            dispatch(
              addNewMsg({
                type: "msg",
                username: msg.player.player_name,
                msg: msg.message,
                chain: getChainFromChat(msg.message),
              })
            );
          }
          if (route === "onGameStop") {
            dispatch(
              addNewMsg({
                type: "winner",
                chain: CAMP[msg.winner],
                votes: msg.winner_votes,
              })
            );
            dispatch(resetVotes(undefined));
            dispatch(
              updateCampRanking(
                msg.camp_rank.map((i: any) => ({
                  chain: i.name.toLowerCase(),
                  round: i.score,
                }))
              )
            );
            dispatch(
              updateUserRanking(
                msg.player_rank.map((i: any) => ({
                  name: i.player_name,
                  round: i.score,
                  url: i.thumbnail,
                }))
              )
            );
            dispatch(
              clearRecord({
                chain: CAMP[msg.winner],
                coin: COIN[msg.winner],
                username: user.name,
                userindex: user.index,
              })
            );
          }
          if (route === "onCampVotesChange") {
            console.log(
              { chain: CAMP[msg.camp], vote: msg.votes },
              "onCampVotesChange"
            );
            dispatch(updateVotes({ chain: CAMP[msg.camp], vote: msg.votes }));
          }
          if (route === "onGameStart") {
            dispatch(
              addNewMsg({
                type: "round",
                index: msg.game_round,
                endAt: msg.end_time,
              })
            );
          }
        });
        net.on(Network.Event.ON_MSG, (route: string, msg) => {
          console.log("on msg: ", route, msg);
          if (route === "chat.join" && msg.body.code === 0) {
            let arr = msg.body.game_info.history_message
              .sort((a: any, b: any) => a.ID - b.ID)
              .map((i: any) => ({
                type: "msg",
                username: i.player.player_name,
                msg: i.message,
                chain: getChainFromChat(i.message),
              }));
            dispatch(resetMsg(arr));
            if (msg.body.game_info.end_time) {
              dispatch(
                addNewMsg({
                  type: "round",
                  index: msg.body.game_info.game_round,
                  endAt: msg.body.game_info.end_time,
                })
              );
            }
            dispatch(
              updateCampRanking(
                msg.body.game_info.camp_rank.map((i: any) => ({
                  chain: i.name.toLowerCase(),
                  round: i.score,
                }))
              )
            );
            dispatch(
              updateUserRanking(
                msg.body.game_info.player_rank.map((i: any) => ({
                  name: i.player_name,
                  round: i.score,
                  url: i.thumbnail,
                }))
              )
            );
          }
        });
      },
      10 * 1000,
      { trailing: false }
    )
  ).current;

  useEffect(() => {
    if (user && user.avatar) func(user);
  }, [func, user]);

  return <>{props.children}</>;
};

export default WSProvider;
