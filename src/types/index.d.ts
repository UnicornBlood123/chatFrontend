import axios from "axios";

export {};

declare global {
  interface Window {
    axios: typeof axios;
  }
}
