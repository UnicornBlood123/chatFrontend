import { memo, ReactElement, useRef } from "react";
import * as S from "./Home.styles";
import { ChatInput, Messages, Status } from "../../containers";
import { Sidebar } from "../../containers";
import { HomeInterfaces } from "./Home.interfaces";
import SwitchTheme from "../../components/SwitchTheme/SwitchTheme";

const Home = ({ user }: HomeInterfaces): ReactElement => {
  const inputRef = useRef<HTMLIFrameElement>(null);

  return (
    user && (
      <S.Chat>
        <Sidebar user={user} />
        <S.ChatDialog>
          <SwitchTheme />
          <Status user={user} />
          <Messages user={user} inputRef={inputRef} />
          <ChatInput inputRef={inputRef} user={user} />
        </S.ChatDialog>
      </S.Chat>
    )
  );
};

export default memo(Home);
