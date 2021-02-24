import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//redux stuff
import configureStore from "./store";
const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}
//end redux
function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
