import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import App from "./views/app/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import "./assets/style/index.scss";
import store from "./config/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Suspense fallback={<div />}>
      <App />
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
