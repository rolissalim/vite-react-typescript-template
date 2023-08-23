
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'

import store from './app/store'
import App from "./app/App";

import "./index.scss";

// import '../i18n';


const root = ReactDOM.createRoot((document.getElementById("root") as any))
root.render(<Provider store={store}>
  <App />
</Provider>);