import { memo, ReactElement } from "react";

import EmojiPicker from "emoji-picker-react";

const Emoji = ({ onEmojiClick }: any): ReactElement => (
  <EmojiPicker onEmojiClick={onEmojiClick} />
);

export default memo(Emoji);
