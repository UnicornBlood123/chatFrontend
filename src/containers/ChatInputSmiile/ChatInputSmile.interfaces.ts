import { RefObject } from "react";
import { TextAreaRef } from "antd/es/input/TextArea";

export interface IChatInputSmileContainer {
  inputRef: RefObject<TextAreaRef>;
  setValue: (value: string) => void;
}
