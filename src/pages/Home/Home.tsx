import { ReactElement, useContext, useRef } from "react";
import * as S from "./Home.styles";
import { ChatInput, Messages, Status } from "../../containers";
import { Sidebar } from "../../containers";
import { HomeInterfaces } from "./Home.interfaces";
import SwitchTheme from "../../components/SwitchTheme/SwitchTheme";
import { ThemeContext } from "../../theme/theme";

const Home = ({ user }: HomeInterfaces): ReactElement => {
  const inputRef = useRef<HTMLIFrameElement>(null);
  const { isDarkTheme, lightTheme, darkTheme, setTheme }: any =
    useContext(ThemeContext);

  return (
    user && (
      <S.Chat>
        <Sidebar user={user} />
        <S.ChatDialog>
          <SwitchTheme
            isDarkTheme={isDarkTheme}
            lightTheme={lightTheme}
            darkTheme={darkTheme}
            setTheme={setTheme}
          />
          <Status user={user} />
          <Messages user={user} inputRef={inputRef} />
          <ChatInput inputRef={inputRef} user={user} />
        </S.ChatDialog>
      </S.Chat>
    )
  );
};

export default Home;
