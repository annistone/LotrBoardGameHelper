import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, Action, combineReducers } from "redux";

import { SidePanelContainer } from "./components/SidePanel";
import { IAddActorAction } from "./actions";

export interface IPlatoon {
  landID: string;
  unitID: string;
  count: number;
}

export interface IActor {
  actorID: string;
  platoons: IPlatoon[];
}

export interface IUiState {
  isActorOpen: boolean;
  isAddActorOpen: boolean;
}

export interface IUserState {
  actors: IActor[];
}

export interface IState {
  ui: IUiState;
  user: IUserState;
}

function uiReducer(
  state: IUiState = {
    isActorOpen: false,
    isAddActorOpen: false
  },
  action: Action
) {
  switch (action.type) {
    case "TOOGLE_ACTOR":
      return Object.assign({}, state, { isActorOpen: !state.isActorOpen });
    case "TOOGLE_ADD_ACTOR":
      return Object.assign({}, state, {
        isAddActorOpen: !state.isAddActorOpen
      });
    default:
      return state;
  }
}

function userReducer(
  state: IUserState = {
    actors: []
  },
  action: IAddActorAction
) {
  switch (action.type) {
    case "ADD_ACTOR":
      return Object.assign({}, state, {
        actors: state.actors.concat([action.actor])
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers<IState>({
  ui: uiReducer,
  user: userReducer
});

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export let store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <SidePanelContainer />
    </div>
  </Provider>,
  document.getElementById("example")
);
