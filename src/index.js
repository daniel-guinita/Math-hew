import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

// Force the page to start at the top instantly without delay
window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);

const root = ReactDOM.createRoot(document.getElementById("root"));
document.documentElement.classList.add("dark");

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
