import React, { useState } from "react";
import { Row, Col, Input, Button } from "antd";
import "antd/dist/antd.css";
import "./assests/styles.css";
import { allTodos } from "./mocks/mocks";
import { TodoList } from "./TodoList/TodoList";
import { TodoForm } from "./Todoform/TodoForm";
import { newItemTodo, removeTodo, getFilteredTodos } from "./Utils/todoUtils";
import { MyInput } from "./Input";

function App() {
  const [todos, setTodos] = useState(allTodos);
  const [InputValue, setInputValue] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [todoInWork, setTodosInWork] = useState([]);
  const [todoIsDone, setTodoIsDone] = useState([]);
  let [isShowFormTodo, setIsShowFormTodo] = useState(false);

  const onAddTodo = () => {
    setIsShowFormTodo((isShowFormTodo = !isShowFormTodo));
  };

  const onDeleteTodo = (id) => {
    const newArray = removeTodo(id, todos);
    setTodos(newArray);
  };

  const onDeleteTodoinWork = (id) => {
    const newArray = removeTodo(id, todoInWork);
    setTodosInWork(newArray);
  };

  const onDeleteTodoIsDone = (id) => {
    const newArray = removeTodo(id, todoIsDone);
    setTodoIsDone(newArray);
  };

  const onSaveTodo = (newTodo) => {
    const newArrayOfTodos = newItemTodo(newTodo, todos);
    setTodos(newArrayOfTodos);
  };

  const onInputChangeAll = (e) => {
    const { value } = e.target;
    setInputValue(value);
    setFilteredTodos(getFilteredTodos(value, todos));
  };

  const onInputWorkChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    setFilteredTodos(getFilteredTodos(value, todoInWork));
  };

  const onChangeWorkStatus = (id) => {
    allTodos.map((elem) => {
      if (id === elem.id) {
        elem.workStatus = !elem.workStatus;
      }
      return elem;
    });
  };

  const onChangeWorkStatusDone = (id) => {
    allTodos.map((elem) => {
      if (id === elem.id) {
        elem.isDone = !elem.isDone;
        if (elem.workStatus) {
          elem.workStatus = !elem.workStatus;
        }
      }
      return elem;
    });
  };

  const onSaveChanges = () => {
    const arrayInWork = todos.filter(
      (el) => el.workStatus && el.isDone === false
    );
    setTodosInWork(arrayInWork);

    const arrayInPending = allTodos.filter(
      (el) => !el.workStatus && el.isDone === false
    );
    setTodos(arrayInPending);

    const arrayIsDone = allTodos.filter(
      (el) => el.isDone && el.workStatus === false
    );
    setTodoIsDone(arrayIsDone);
  };

  console.log("pending", todos);
  console.log("work", todoInWork);
  console.log("done", todoIsDone);
  console.log("all", allTodos);

  return (
    <>
      <div className="container">
        {isShowFormTodo ? (
          <TodoForm onSaveTodo={onSaveTodo} onAddTodo={onAddTodo} />
        ) : null}
        <h1>Todos process</h1>

        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>All todos</h2>
                <Button onClick={onAddTodo} type="primary">
                  + Add todo
                </Button>
              </div>
              <Input
                className="TodoFilter"
                placeholder="find todo"
                value={InputValue}
                onChange={onInputChangeAll}
              />
              <TodoList
                onSaveChanges={onSaveChanges}
                onChangeWorkStatus={onChangeWorkStatus}
                onChangeWorkStatusDone={onChangeWorkStatusDone}
                onDeleteTodo={onDeleteTodo}
                todos={filteredTodos.length ? filteredTodos : todos}
              />
            </Col>

            <Col span={8}>
              <h2>todos in work</h2>
              <MyInput value={InputValue} onInputChange={onInputWorkChange} />
              <TodoList
                onSaveChanges={onSaveChanges}
                onChangeWorkStatus={onChangeWorkStatus}
                onChangeWorkStatusDone={onChangeWorkStatusDone}
                onDeleteTodo={onDeleteTodoinWork}
                todos={filteredTodos.length ? filteredTodos : todoInWork}
              />
            </Col>

            <Col span={8}>
              <h2>done</h2>
              <Input placeholder="Basic usage" />
              <TodoList
                onSaveChanges={onSaveChanges}
                onChangeWorkStatus={onChangeWorkStatus}
                onChangeWorkStatusDone={onChangeWorkStatusDone}
                onDeleteTodo={onDeleteTodoIsDone}
                todos={filteredTodos.length ? filteredTodos : todoIsDone}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default App;
