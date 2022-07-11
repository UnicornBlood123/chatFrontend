import React from "react";
import * as S from "./Avatar.styles";
import { generateAvatarFromHash } from "../../utils/helpers";
import { IUser } from "../../redux/interfaces/users.interfaces";

const Avatar = ({ user }: { user: IUser }) => {
  if (user.avatar) {
    return <img src={user.avatar} alt={`${user.fullname} avatar`} />;
  } else {
    const { color, lightenColor } = generateAvatarFromHash(user._id);
    const firstChar = user.fullname[0].toUpperCase();
    return (
      <S.Avatar color={color} lightenColor={lightenColor}>
        {firstChar}
      </S.Avatar>
    );
  }
};

export default Avatar;
