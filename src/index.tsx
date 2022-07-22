import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import store from "./redux/store";
import Provider from "react-redux/es/components/Provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </Router>
);
