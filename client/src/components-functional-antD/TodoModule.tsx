import React, { FC, useEffect, useState } from "react";
import { TodoInterface } from "../App";
import { TodoList } from "./TodoList";
import { v4 as uuid } from "uuid";
import { Badge, Button, Card, Form, Input } from "antd";

interface Props {}

export const TodoModule: FC<Props> = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [ form ] = Form.useForm();

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
    const name = form.getFieldValue("todoName");

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

    form.resetFields();
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
    <Card style={{ width: 600 }} bordered={false}>
      <Badge.Ribbon
        text={`${todos.filter((todo) => !todo.complete).length} left to do`}
      >
        <Card style={{ padding: 10 }}>
          <Form form={form} layout="inline">
              <Form.Item name="todoName">
                <Input placeholder="Type todo" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleAddTodo}>
                  Add Todo
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="default" onClick={handleClearTodos}>
                  Clear Complete
                </Button>
              </Form.Item>
          </Form>
          <TodoList toggleTodo={toggleTodo} todos={todos} />
        </Card>
      </Badge.Ribbon>
    </Card>
  );
};
