import { FC } from "react";
import { TodoList } from "./TodoList";
import { v4 as uuid } from "uuid";
import { Badge, Button, Card, Form, Input } from "antd";
import { ObservableTodo } from "./todo.observable";
import { observer } from "mobx-react";

interface Props {
  todos: ObservableTodo;
}

export const TodoModule: FC<Props> = observer(({ todos }) => {
  const [ form ] = Form.useForm();

  function handleAddTodo() {
    const name = form.getFieldValue("todoName");
    console.log(name);
    
    if (name === undefined || name === '') {
      return;
    }

    todos.addTodo({
      id: uuid(),
      name: name,
      complete: false,
    })

    form.resetFields();
  }

  return (
    <Card style={{ width: 600 }} bordered={false}>
      <Badge.Ribbon
        text={`${todos.completedTodosCount} left to do`}
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
                <Button type="default" onClick={todos.clearCompleteTodos}>
                  Clear Complete
                </Button>
              </Form.Item>
          </Form>
          <TodoList todos={todos.todos} />
        </Card>
      </Badge.Ribbon>
    </Card>
  );
});
