import React, { useRef } from "react";
import * as S from "./Home.styles";
import { ChatInput, Messages, Status } from "../../containers";
import { Sidebar } from "../../containers";
import { HomeInterfaces } from "./Home.interfaces";

const Home = ({ user }: HomeInterfaces) => {
  const inputRef = useRef<HTMLIFrameElement>(null);
  return (
    user && (
      <S.Chat>
        <Sidebar user={user} />
        <S.ChatDialog>
          <Status user={user} />
          <Messages user={user} inputRef={inputRef} />
          <ChatInput inputRef={inputRef} user={user} />
        </S.ChatDialog>
      </S.Chat>
    )
  );
};

export default Home;
