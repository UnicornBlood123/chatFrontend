import { RefObject } from "react";
import { TextAreaRef } from "antd/es/input/TextArea";

export interface IChatInputSmileContainer {
  inputRef: RefObject<TextAreaRef>;
  value: string;
  setValue: (value: string) => void;
}
