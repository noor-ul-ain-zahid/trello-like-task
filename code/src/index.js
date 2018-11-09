import React from "react";
import ReactDOM from "react-dom";
import Main from "./Components/Main";
import "@atlaskit/css-reset";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>,
  document.getElementById("root")
);
