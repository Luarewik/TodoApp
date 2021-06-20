import { FC, useEffect, useRef, useState } from "react";
import { TodoInterface } from "../App";
import { TodoList } from "./TodoList";
import { v4 as uuid } from "uuid";

interface Props {}

export const TodoModule: FC<Props> = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const todoNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    const name = todoNameRef.current!.value;

    if (name === "") {
      return;
    }

    setTodos([
      ...todos,
      {
        id: uuid(),
        name: name,
        complete: false,
      },
    ]);

    todoNameRef.current!.value = "";
  }

  function handleClearTodos() {
    setTodos(todos.filter((todo) => !todo.complete));
  }

  function toggleTodo(id: string) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    if (todo) {
      todo.complete = !todo.complete;
      setTodos(newTodos);
    }
  }

  return (
    <div>
      <TodoList toggleTodo={toggleTodo} todos={todos} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </div>
  );
};
