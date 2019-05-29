import * as React from "react";
import { NavContainer } from "./Nav";
import { Collapse } from "react-bootstrap";
import { connect } from "react-redux";

import { IState, IActor } from "../index";

const actors = require("../data/actors.json");

const mapStateToProps = function(state: IState) {
  return {
    open: state.ui.isActorOpen,
    actors: state.user.actors
  };
};

interface IProps {
  open: boolean;
  actors: IActor[];
}

export class SidePanel extends React.Component<IProps> {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-start">
          <div className="col-2">
            <NavContainer
              itemName={"actor"}
              items={Object.keys(actors)}
              collapseID={"land_entity"}
              buttonProps={Object.values(this.props.actors).map(
                (actor: IActor) => ({
                  id: actor.actorID,
                  name: actors[actor.actorID].name
                })
              )}
            />
          </div>
          <div className="col-2">
            <Collapse in={this.props.open}>
              <div id={"land_entity"}>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}

export const SidePanelContainer = connect(mapStateToProps)(SidePanel);
