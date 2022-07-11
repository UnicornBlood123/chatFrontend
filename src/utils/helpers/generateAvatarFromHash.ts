import tinycolor from "tinycolor2";

const getCorrectNumber = (number: number) => {
  return number > 255 ? 255 : number < 0 ? 0 : number;
};

const avatar = (hash: string) => {
  const [r, g, b] = hash
    .substr(0, 3)
    .split("")
    .map((char) => getCorrectNumber(char.charCodeAt(0)));
  return {
    color: tinycolor({ r, g, b }).lighten(10).saturate(10).toHexString(),
    lightenColor: tinycolor({ r, g, b }).lighten(30).saturate(30).toHexString(),
  };
};

export default avatar;
