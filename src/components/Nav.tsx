import * as React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import { store, IState } from "../index";
import { Form } from "react-bootstrap";
import { addActorAction } from "../actions";

const actors = require("../data/actors.json");

const mapStateToProps = function(state: IState) {
  return {
    open: state.ui.isActorOpen
  };
};

interface IProps {
  open: boolean;
  buttonProps: IButtonProps[];
  collapseID: string;
  itemName: string;
  items: string[];
}

export interface IButtonProps {
  id: string;
  name: string;
}

class Nav extends React.Component<IProps> {
  render() {
    return (
      <ul className="nav flex-column">
        <li className="nav-item">
          {this.props.buttonProps.map((bp: IButtonProps) => {
            return (
              <Button
                key={bp.id + "_button"}
                onClick={(evt: any) => {
                  store.dispatch({ type: "TOOGLE" });
                }}
                aria-controls={this.props.collapseID}
                aria-expanded={this.props.open}
              >
                {bp.name}
              </Button>
            );
          })}
        </li>
        <li className="nav-item">
          <Button
            onClick={(evt: any) => {
              evt.preventDefault();
              store.dispatch({ type: "TOOGLE" });
            }}
            aria-controls={this.props.collapseID}
            aria-expanded={this.props.open}
          >
            Add {this.props.itemName}
          </Button>
          <Form
            onSubmit={(evt: any) => {
              evt.preventDefault();
              store.dispatch(addActorAction(evt.target.elements.select.value));
            }}
          >
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select {this.props.itemName}</Form.Label>
              <Form.Control as="select" name={"select"}>
                {this.props.items.map((item: string) => {
                  return <option key={item}>{item}</option>;
                })}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </li>
      </ul>
    );
  }
}

export const NavContainer = connect(mapStateToProps)(Nav);
