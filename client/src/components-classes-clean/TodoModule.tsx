import React, { Component, createRef, MouseEvent } from "react";
import { RefObject } from "react-dom/node_modules/@types/react";
import { TodoInterface } from "../App";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";

interface Props {}

interface State {
  todos: TodoInterface[];
}

export default class TodoModule extends Component<Props, State> {
  private todoNameRef = createRef<HTMLInputElement>();

  constructor(props: any) {
    super(props);

    this.state = {
      todos: [],
    };
  }

  handleAddTodo = (event: MouseEvent) => {
    const name = this.todoNameRef.current!.value;

    if (name === "") {
      return;
    }

    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          name: name,
          complete: false,
        },
      ],
    });

    this.todoNameRef.current!.value = "";
  };

  handleClearTodos = (event: MouseEvent) => {
    const newTodos = this.state.todos.filter((todo) => !todo.complete);
    this.setState({
      todos: newTodos,
    });
  };

  componentDidMount() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) this.setState(JSON.parse(storedTodos));
  }

  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  toggleTodo = (id: string) => {
    const newTodos = [...this.state.todos];
    const todo = newTodos.find((todo) => todo.id === id);
    if (todo) {
      todo.complete = !todo.complete;
      this.setState({
        todos: newTodos,
      });
    }
  };

  render() {
    return (
      <div>
        <TodoList toggleTodo={this.toggleTodo} todos={this.state.todos} />
        <input ref={this.todoNameRef} type="text" />
        <button onClick={this.handleAddTodo}>Add Todo</button>
        <button onClick={this.handleClearTodos}>Clear Complete</button>
        <div>
          {this.state.todos.filter((todo) => !todo.complete).length} left to do
        </div>
      </div>
    );
  }
}
