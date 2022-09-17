import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import Provider from "react-redux/es/components/Provider";
import store from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
