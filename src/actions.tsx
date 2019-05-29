import { Action } from "redux";
import { IActor } from ".";

export const TOOGLE_ADD_ACTOR = "TOOGLE_ADD_ACTOR";
export const TOOGLE_ACTOR = "TOOGLE_ACTOR";

export interface IAddActorAction extends Action {
  type: string;
  actor: IActor;
}

export function addActorAction(actorID: string): IAddActorAction {
  return {
    type: "ADD_ACTOR",
    actor: {
      actorID,
      platoons: []
    }
  };
}
