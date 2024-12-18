import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";

// Create a root instance and render the app within it
createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
  </Provider>
);

// Call reportWebVitals separately
reportWebVitals();
