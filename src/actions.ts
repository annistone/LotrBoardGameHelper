import { Action } from "redux";
import { IItem, Actor, Platoon, Unit, IItemConstr } from "./interfaces";

export const ACTIONS = {
  TOOGLE_ADD_ACTOR: "TOOGLE_ADD_ACTOR",
  TOOGLE_ACTOR: "TOOGLE_ACTOR",
  ADD_ITEM: "ADD_ITEM"
};

export interface IAddItemAction extends Action {
  type: string;
  item: IItem;
}

export function addItemAction(
  id: string,
  path: string,
  constr: IItemConstr
): IAddItemAction {
  return {
    type: ACTIONS.ADD_ITEM,
    item: { id, path, constr }
  };
}
