import { ReactElement, useRef, useState } from "react";
import { IChatInputSmileContainer } from "./ChatInputSmile.interfaces";
import { ChatInputSmile as BasicChatInputSmile } from "../../components";

const ChatInputSmile = ({
  inputRef,
  setValue,
}: IChatInputSmileContainer): ReactElement => {
  const emojiButtonRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const toggleEmojiPickerVisible = (): void => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  return (
    <BasicChatInputSmile
      setValue={setValue}
      inputRef={inputRef}
      emojiButtonRef={emojiButtonRef}
      emojiRef={emojiRef}
      emojiPickerVisible={emojiPickerVisible}
      setEmojiPickerVisible={setEmojiPickerVisible}
      toggleEmojiPickerVisible={toggleEmojiPickerVisible}
      cursorPosition={cursorPosition}
      setCursorPosition={setCursorPosition}
    />
  );
};

export default ChatInputSmile;
