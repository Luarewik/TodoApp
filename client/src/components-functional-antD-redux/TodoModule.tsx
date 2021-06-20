import { FC, useEffect } from "react";
import { TodoList } from "./TodoList";
import { v4 as uuid } from "uuid";
import { Badge, Button, Card, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "./hooks";
import { add, clearComplete, loadFromLc, selectTodos } from "./todoSlice";

interface Props {}

export const TodoModule: FC<Props> = () => {
  const { todos } = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const [ form ] = Form.useForm();

  useEffect(() => {
    dispatch(loadFromLc())
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    const name = form.getFieldValue("todoName");

    if (name === "") {
      return;
    }

    dispatch(add({
      id: uuid(),
      name: name,
      complete: false,
    }));

    form.resetFields();
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
                <Button type="default" onClick={() => dispatch(clearComplete())}>
                  Clear Complete
                </Button>
              </Form.Item>
          </Form>
          <TodoList todos={todos} />
        </Card>
      </Badge.Ribbon>
    </Card>
  );
};
