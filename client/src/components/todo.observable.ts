import { makeObservable, observable, action, computed, autorun } from "mobx";
import { TodoInterface } from "../App";

export class ObservableTodo {
  todos: TodoInterface[] = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      completedTodosCount: computed,
      clearCompleteTodos: action.bound,
      addTodo: action,
    });

    autorun(() => {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
    });

    autorun(() => {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    });
  }

  get completedTodosCount() {
    return this.todos.filter((todo) => !todo.complete).length;
  }

  clearCompleteTodos() {
    this.todos = this.todos.filter((todo) => !todo.complete);
  }

  addTodo(task: TodoInterface) {
    console.log(task);

    this.todos.push(task);
  }
}
