import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";

const Time = ({ date }: { date: string | number | Date }) => {
  return (
    <>
      {formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: ruLocale,
      })}
    </>
  );
};

export default Time;
