import { RefObject } from "react";
import { TextAreaRef } from "antd/es/input/TextArea";

export interface IChatInputSmileComponent {
  emojiButtonRef: RefObject<HTMLDivElement>;
  emojiRef: RefObject<HTMLDivElement>;
  emojiPickerVisible: boolean;
  setEmojiPickerVisible: (bool: boolean) => void;
  toggleEmojiPickerVisible: () => void;
  value: string;
  setValue: (value: string) => void;
  cursorPosition: number;
  setCursorPosition: (num: number) => void;
  inputRef: RefObject<TextAreaRef>;
}
