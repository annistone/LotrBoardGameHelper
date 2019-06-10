import * as React from "react";
import {
  Button,
  Col,
  Row,
  InputGroup,
  SplitButton,
  Dropdown
} from "react-bootstrap";
import { connect } from "react-redux";

import { store } from "..";
import { Form } from "react-bootstrap";
import { IState } from "../reducers";
import { addItemAction } from "../actions";
import { IItemConstr } from "../interfaces";

const mapStateToProps = function(state: IState) {
  return {
    addFormOpen: state.ui.isAddActorOpen
  };
};

interface IProps {
  addFormOpen: boolean;
  itemsIds: string[];
  itemConstr: IItemConstr;
  itemPath: string;
}

class AddItemForm extends React.Component<IProps> {
  render() {
    return (
      <SplitButton
        size="sm"
        variant="primary"
        title={`Add`}
        id={`dropdown-button-drop`}
      >
        {this.props.itemsIds.map((itemId: string) => {
          return (
            <Dropdown.Item
              eventKey={itemId}
              key={itemId}
              onSelect={(itemId: string, evt: any) => {
                evt.preventDefault();
                store.dispatch(
                  addItemAction(
                    itemId,
                    this.props.itemPath,
                    this.props.itemConstr
                  )
                );
              }}
            >
              Add {itemId}
            </Dropdown.Item>
          );
        })}
      </SplitButton>
    );
  }
}

export const AddItemFormContainer = connect(mapStateToProps)(AddItemForm);
