import * as React from "react";
import { ListGroup, Card, ListGroupItem, Accordion } from "react-bootstrap";
import { connect } from "react-redux";

import { AddItemFormContainer } from "./AddItemForm";
import { IState } from "../reducers";
import { Platoon, Actor } from "../interfaces";

import { landsRef } from "../data";
import { PlatoonInfoContainer } from "./PlatoonInfo";

const mapStateToProps = function(state: IState, ownProps: IOwnProps) {
  return {
    actor: state.user.actors.byId[ownProps.id]
  };
};

interface IOwnProps {
  id: string;
}

interface IProps extends IOwnProps {
  actor: Actor;
}

export class ActorInfo extends React.Component<IProps> {
  render() {
    let { actor } = this.props;
    let platoons = actor.platoons;
    let platoonsToAdd = Object.keys(landsRef).filter(
      (platoonId: string) => !platoons.byId[platoonId]
    );
    return (
      <Card>
        <Card.Header>{this.props.id}</Card.Header>
        <Card.Body>
          <Card.Title>{this.props.id}</Card.Title>
          <Card.Text>Foods: 0</Card.Text>

          <Card.Title>Platoons:</Card.Title>
          <Accordion>
            {platoons.allIds.map((pId: string, i: number) => (
              // <ListGroupItem id={pId}>
              <Card key={pId}>
                <Accordion.Toggle as={Card.Header} eventKey={`${i}`}>
                  {pId}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={`${i}`}>
                  <PlatoonInfoContainer actor={actor} id={pId} />
                </Accordion.Collapse>
              </Card>
              // </ListGroupItem>
            ))}
          </Accordion>
          {platoonsToAdd.length ? (
            // <ListGroupItem id={"addItem"}>
            <AddItemFormContainer
              itemsIds={platoonsToAdd}
              itemPath={`actors.byId.${actor.id}.platoons`}
              itemConstr={Platoon}
            />
          ) : (
            // </ListGroupItem>
            ""
          )}
        </Card.Body>
      </Card>
    );
  }
}

export const ActorInfoContainer = connect(mapStateToProps)(ActorInfo);
