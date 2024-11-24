import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Main App component
import { Provider } from "react-redux"; // Redux Provider to pass the store
import store from "./redux/store"; // Your Redux store configuration
import "./index.css"; // Global CSS styles

const root = ReactDOM.createRoot(document.getElementById("root")); // Attach React app to the "root" div
document.documentElement.classList.add("dark"); // Add the "dark" class to enable dark mode globally
root.render(
  <Provider store={store}> 
    <App /> 
  </Provider> 
);
