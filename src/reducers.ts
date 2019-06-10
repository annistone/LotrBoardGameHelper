import { Action, combineReducers } from "redux";
import * as dotProp from "dot-prop-immutable";

import { ACTIONS, IAddItemAction } from "./actions";
import { DataTable, Actor } from "./interfaces";

interface IUiState {
  isActorOpen: boolean;
  isAddActorOpen: boolean;
}

interface IUserState {
  actors: DataTable<Actor>;
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
    case ACTIONS.TOOGLE_ACTOR:
      return Object.assign({}, state, { isActorOpen: !state.isActorOpen });
    case ACTIONS.TOOGLE_ADD_ACTOR:
      return Object.assign({}, state, {
        isAddActorOpen: !state.isAddActorOpen
      });
    default:
      return state;
  }
}

function userReducer(
  state: IUserState = {
    actors: new DataTable()
  },
  action: IAddItemAction
) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      const { item } = action;

      // State here is the entire combined state
      const updatedWithItemsTable = dotProp.set(
        state,
        `${item.path}.byId.${item.id}`,
        new item.constr(item.id)
      );

      const updatedWithItemsList = dotProp.set(
        updatedWithItemsTable,
        `${item.path}.allIds`,
        (allIds: string[]) =>
          allIds.find((id: string) => id == item.id)
            ? allIds
            : allIds.concat(item.id)
      );
      return updatedWithItemsList;

    default:
      return state;
  }
}

export const rootReducer = combineReducers<IState>({
  ui: uiReducer,
  user: userReducer
});
