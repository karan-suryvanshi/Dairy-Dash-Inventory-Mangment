import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { store } from "./app/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/layout.css";

import App from "./App.jsx";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>

);