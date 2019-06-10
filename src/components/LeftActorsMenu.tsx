import * as React from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { connect } from "react-redux";

import { AddItemFormContainer } from "./AddItemForm";
import { DataTable, Actor } from "../interfaces";
import { IState } from "../reducers";
import { actorsRef } from "../data";
import { ActorInfoContainer } from "./ActorInfo";

const mapStateToProps = function(state: IState) {
  return {
    open: state.ui.isActorOpen,
    actors: state.user.actors
  };
};
interface IProps {
  open: boolean;
  actors: DataTable<Actor>;
}

export class LeftActorsMenu extends React.Component<IProps> {
  render() {
    let actorsToAdd = Object.keys(actorsRef).filter(
      (actorId: string) => !this.props.actors.byId[actorId]
    );
    return (
      <Tab.Container id="left-tabs" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav className="flex-column">
              {this.props.actors.allIds.map((actorId: string) => {
                return (
                  <Nav.Item key={`${actorId}`}>
                    <Nav.Link eventKey={`${actorId}`}>{actorId}</Nav.Link>
                  </Nav.Item>
                );
              })}
              {actorsToAdd.length ? (
                <Nav.Item>
                  <AddItemFormContainer
                    itemsIds={actorsToAdd}
                    itemPath={"actors"}
                    itemConstr={Actor}
                  />
                </Nav.Item>
              ) : (
                ""
              )}
            </Nav>
          </Col>
          <Col sm={4}>
            <Tab.Content>
              {this.props.actors.allIds.map((actorId: string) => {
                return (
                  <Tab.Pane key={`${actorId}`} eventKey={`${actorId}`}>
                    <ActorInfoContainer id={actorId} />
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export const LeftActorsMenuContainer = connect(mapStateToProps)(LeftActorsMenu);
