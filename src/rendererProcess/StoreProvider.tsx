import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import App from "./App";

function StoreProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default StoreProvider;
