import { ReactElement } from "react";
import * as S from "./Avatar.styles";
import generateAvatarFromHash from "../../utils/generateAvatarFromHash";
import { IAvatar } from "./Avatar.interfaces";

const Avatar = ({ user }: IAvatar): ReactElement => {
  if (user.avatar) {
    return <img src={user.avatar} alt={`${user.fullname} avatar`} />;
  }
  const { color, lightenColor } = generateAvatarFromHash(user._id);
  const firstChar = user.fullname[0].toUpperCase();
  return (
    <S.Avatar color={color} lightenColor={lightenColor}>
      {firstChar}
    </S.Avatar>
  );
};

export default Avatar;
