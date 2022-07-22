const convertCurrentTime = (time: number):string => {
  const mins = Math.floor(time / 60);
  const secs = (time % 60).toFixed();
  return `${mins < 10 ? "0" : ""}${mins}:${Number(secs) < 10 ? "0" : ""}${secs}`;
};

export default convertCurrentTime;
