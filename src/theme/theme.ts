import { createContext } from "react";

export const lightTheme = {
  colors: {
    black: "#202002",
    white: "#fff",
    green: "#00c980",
    red: "#f46b6b",
    blue: "#3674ff",
    progress_audio_color: "#418FFF",
    bright_blue: "#b3c7f3",
    typing_bubble_color: "#e5edff",
    bubble_color: "rgba(54, 116, 255, 0.2)",
    background_color: "#F4F7FD",
    background_dialogItem_color: "rgba(235,239,253,0.81)",
    bright_grey: "#F7F8F9",
    gray: "rgba(0, 0, 0, 0.0220444)",
    dark_grey: "#adadad",
    purple: "#0F3997",
    background_modal_color: "white",
  },
};

export const darkTheme = {
  colors: {
    black: "#fff",
    white: "#333333",
    green: "#00c980",
    red: "#f46b6b",
    blue: "#3674ff",
    progress_audio_color: "#418FFF",
    bright_blue: "#b3c7f3",
    typing_bubble_color: "#e5edff",
    bubble_color: "rgba(54, 116, 255, 0.2)",
    background_color: "#0a0a0a",
    background_dialogItem_color: "#292929",
    bright_grey: "#fdf7f7",
    gray: "#424242",
    dark_grey: "#adadad",
    purple: "#0F3997",
    background_modal_color: "#292929",
  },
};

export const ThemeContext = createContext({});
