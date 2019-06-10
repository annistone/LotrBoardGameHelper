import * as React from "react";
import { ListGroup, Card } from "react-bootstrap";
import { connect } from "react-redux";

import { AddItemFormContainer } from "./AddItemForm";
import { IState } from "../reducers";
import { Platoon, Actor, Unit } from "../interfaces";

import { unitsRef } from "../data";

const mapStateToProps = function(state: IState, ownProps: IOwnProps) {
  return {
    platoon: ownProps.actor.platoons.byId[ownProps.id]
  };
};

interface IOwnProps {
  id: string;
  actor: Actor;
}

interface IProps extends IOwnProps {
  platoon: Platoon;
}

export class PlatoonInfo extends React.Component<IProps> {
  render() {
    let { actor, platoon } = this.props;
    let units = platoon.units;
    let unitsToAdd = Object.keys(unitsRef).filter(
      (unitId: string) => !units.byId[unitId]
    );
    return (
      <ListGroup>
        {units.allIds.map((uId: string) => (
          <ListGroup.Item key={uId}>{uId}</ListGroup.Item>
        ))}
        {unitsToAdd.length ? (
          <ListGroup.Item id={"addItem"}>
            <AddItemFormContainer
              itemsIds={unitsToAdd}
              itemPath={`actors.byId.${actor.id}.platoons.byId.${
                platoon.id
              }.units`}
              itemConstr={Unit}
            />
          </ListGroup.Item>
        ) : (
          ""
        )}
      </ListGroup>
    );
  }
}

export const PlatoonInfoContainer = connect(mapStateToProps)(PlatoonInfo);
