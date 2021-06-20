import React, { Component } from "react";
import { TodoInterface } from "../App";
import Todo from "./Todo";

interface Props {
  todos: TodoInterface[];
  toggleTodo: (id: string) => void;
}
interface State {}

export default class TodoList extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        {this.props.todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              toggleTodo={this.props.toggleTodo}
              todo={todo}
            />
          );
        })}
      </div>
    );
  }
}
