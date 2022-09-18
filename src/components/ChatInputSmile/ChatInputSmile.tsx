import { memo, ReactElement, useCallback, useEffect } from "react";
import * as S from "./ChatInputSmile.styles";
import { SmileOutlined } from "@ant-design/icons/lib/icons";
import { IEmojiData } from "emoji-picker-react";
import { IChatInputSmileComponent } from "./ChatInputSmile.interfaces";
import Emoji from "../Emoji/Emoji";

const ChatInputSmile = ({
  emojiButtonRef,
  emojiRef,
  emojiPickerVisible,
  setEmojiPickerVisible,
  toggleEmojiPickerVisible,
  setValue,
  cursorPosition,
  setCursorPosition,
  inputRef,
}: IChatInputSmileComponent): ReactElement => {
  useEffect(() => {
    const onClick = (e: MouseEvent): void => {
      if (
        emojiRef.current &&
        emojiButtonRef.current &&
        !inputRef.current?.resizableTextArea?.textArea.contains(
          e.target as Node
        ) &&
        !emojiButtonRef.current?.contains(e.target as Node) &&
        !emojiRef.current?.contains(e.target as Node)
      ) {
        setEmojiPickerVisible(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onEmojiClick = useCallback(
    (event: React.MouseEvent, { emoji }: IEmojiData): void => {
      if (inputRef.current) {
        inputRef.current.focus();
        const start = inputRef?.current?.resizableTextArea?.props?.value
          ?.toString()
          .substring(
            0,
            Number(inputRef.current?.resizableTextArea?.textArea.selectionStart)
          );
        const end = inputRef?.current?.resizableTextArea?.props?.value
          ?.toString()
          .substring(
            Number(inputRef.current?.resizableTextArea?.textArea.selectionStart)
          );
        setValue((start + emoji + end).trim());
        setCursorPosition((start?.length ?? 0) + String(emoji).length);
      }
    },
    []
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.resizableTextArea?.textArea.setSelectionRange(
        cursorPosition,
        cursorPosition
      );
    }
  }, [cursorPosition]);

  useEffect(() => {
    if (inputRef.current && emojiPickerVisible) {
      inputRef.current.focus();
    }
  }, [emojiPickerVisible]);

  return (
    <S.ChatInputSmile ref={emojiButtonRef}>
      <S.Emoji ref={emojiRef} emojiPickerVisible={emojiPickerVisible}>
        <Emoji onEmojiClick={onEmojiClick} />
      </S.Emoji>
      <S.ChatButtonSmile
        onClick={toggleEmojiPickerVisible}
        icon={<SmileOutlined />}
      />
    </S.ChatInputSmile>
  );
};

export default memo(ChatInputSmile);
