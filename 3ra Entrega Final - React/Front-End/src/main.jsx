import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { AppRouter } from "./router/AppRouter";
import "./styles.css";
import { AppTheme } from "./theme";
import { store } from "./store/storeUser";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppTheme>
          <AppRouter />
        </AppTheme>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
