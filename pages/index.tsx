import ChatBox from "components/chat-box";
import GameBox from "components/game-box";
import Layout from "components/layout";
import type { NextPage } from "next";
import { CenterFlex } from "styles/globals";

const Home: NextPage = () => {
  return (
    <Layout>
      <CenterFlex style={{ alignItems: "flex-start" }}>
        <GameBox />
        <ChatBox />
      </CenterFlex>
    </Layout>
  );
};

export default Home;
