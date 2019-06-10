import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { LeftActorsMenuContainer } from "./components/LeftActorsMenu";
import { rootReducer } from "./reducers";

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export let store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <LeftActorsMenuContainer />
    </div>
  </Provider>,
  document.getElementById("example")
);
