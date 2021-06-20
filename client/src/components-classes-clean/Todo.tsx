import React, { Component } from "react";
import { TodoInterface } from "../App";

interface Props {
  todo: TodoInterface;
  toggleTodo: (id: string) => void;
}

interface State {}

export default class Todo extends Component<Props, State> {
  state = {};

  handleTodoClick = () => {
    this.props.toggleTodo(this.props.todo.id);
  };

  render() {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={this.props.todo.complete}
            onChange={this.handleTodoClick}
          />
          {this.props.todo.name}
        </label>
      </div>
    );
  }
}
