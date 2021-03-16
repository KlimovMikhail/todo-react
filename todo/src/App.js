import React, { useCallback, useState } from "react";
import { Row, Col, Input, Button } from "antd";
import "antd/dist/antd.css";
import "./assests/styles.css";

import { allTodos } from "./mocks/mocks";
import { TodoList } from "./TodoList/TodoList";
import { TodoForm } from "./Todoform/TodoForm";
import {
  newItemTodo,
  removeTodo,
  getFilteredTodos,
  changeTodo,
  changeWorkStatus,
  changeStatusIsDone,
} from "./Utils/todoUtils";

function App() {
  const [todos, setTodos] = useState(allTodos);
  const [todoInWork, setTodosInWork] = useState([]);
  const [todoIsDone, setTodoIsDone] = useState([]);

  const [InputValueAll, setInputValueAll] = useState("");
  const [InputValueInWork, setInputValueInWork] = useState("");
  const [InputValueIsDone, setInputValueIsDone] = useState("");

  const [filteredTodosAll, setFilteredTodosAll] = useState([]);
  const [filteredTodosInWork, setFilteredTodosInWork] = useState([]);
  const [filteredTodosIsDone, setFilteredTodosIsDone] = useState([]);

  let [isShowFormTodo, setIsShowFormTodo] = useState(false);

  const onAddTodo = () => {
    setIsShowFormTodo((isShowFormTodo = !isShowFormTodo));
  };

  const onDeleteTodo = useCallback(
    (id) => {
      const newArray = removeTodo(id, todos);
      setTodos(newArray);
    },
    [todos]
  );

  const onDeleteTodoinWork = useCallback(
    (id) => {
      const newArray = removeTodo(id, todoInWork);
      setTodosInWork(newArray);
    },
    [todoInWork]
  );

  const onDeleteTodoIsDone = useCallback(
    (id) => {
      const newArray = removeTodo(id, todoIsDone);
      setTodoIsDone(newArray);
    },
    [todoIsDone]
  );

  const onSaveTodo = useCallback(
    (newTodo) => {
      const newArrayOfTodos = newItemTodo(newTodo, todos);
      setTodos(newArrayOfTodos);
    },
    [todos]
  );

  const onInputChangeAll = useCallback(
    (e) => {
      const { value } = e.target;
      setInputValueAll(value);
      setFilteredTodosAll(getFilteredTodos(value, todos));
    },
    [todos]
  );

  const onInputChangeWork = useCallback(
    (e) => {
      const { value } = e.target;
      setInputValueInWork(value);
      setFilteredTodosInWork(getFilteredTodos(value, todoInWork));
    },
    [todoInWork]
  );

  const onInputChangeDone = useCallback(
    (e) => {
      const { value } = e.target;
      setInputValueIsDone(value);
      setFilteredTodosIsDone(getFilteredTodos(value, todoIsDone));
    },
    [todoIsDone]
  );

  const onChangeWorkStatus = useCallback(
    (id) => {
      changeWorkStatus(todos, id);
    },
    [todos]
  );

  const onChangeStatusIsDone = useCallback(
    (id) => {
      changeStatusIsDone(todoInWork, id);
      changeStatusIsDone(todoIsDone, id);
    },
    [todoInWork, todoIsDone]
  );

  const onSaveChanges = useCallback(
    (changedElement, id) => {
      const arrayWithNewElement = changeTodo(todos, changedElement, id);
      const arrayInPending = arrayWithNewElement.filter(
        (el) => !el.workStatus && el.isDone === false
      );
      setTodos(arrayInPending);

      const arrayInWork = arrayWithNewElement.reduce((acc, item) => {
        if (item.workStatus && !item.isDone) {
          acc.push(item);
        }
        return acc;
      }, todoInWork);
      setTodosInWork(arrayInWork);
    },
    [todos, todoInWork]
  );

  const onSaveChangesInWork = useCallback(
    (changedElement, id) => {
      const arrayWithNewElement = changeTodo(todoInWork, changedElement, id);

      const arrayInPending = arrayWithNewElement.filter(
        (el) => el.workStatus === true && el.isDone === false
      );
      setTodosInWork(arrayInPending);
      const arrayIsDone = arrayWithNewElement.reduce((acc, item) => {
        if (item.isDone) {
          acc.push(item);
        }
        return acc;
      }, todoIsDone);
      setTodoIsDone(arrayIsDone);
    },
    [todoInWork, todoIsDone]
  );

  const onSaveChangesIsDone = useCallback(
    (changedElement, id) => {
      const arrayWithNewElement = changeTodo(todoIsDone, changedElement, id);

      const arrayInPending = arrayWithNewElement.filter(
        (el) => el.isDone === true
      );
      setTodoIsDone(arrayInPending);
      const arrayInWork = arrayWithNewElement.reduce((acc, item) => {
        if (item.workStatus && !item.isDone) {
          acc.push(item);
        }
        return acc;
      }, todoInWork);
      setTodosInWork(arrayInWork);
    },
    [todoIsDone, todoInWork]
  );

  return (
    <>
      <div className="container">
        {isShowFormTodo ? (
          <TodoForm onSaveTodo={onSaveTodo} onAddTodo={onAddTodo} />
        ) : null}
        <h1>Todos progress</h1>

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
                value={InputValueAll}
                onChange={onInputChangeAll}
              />
              <div className="TodoList">
                <TodoList
                  onSaveChanges={onSaveChanges}
                  onChangeWorkStatus={onChangeWorkStatus}
                  onDeleteTodo={onDeleteTodo}
                  todos={filteredTodosAll.length ? filteredTodosAll : todos}
                />
              </div>
            </Col>

            <Col span={8}>
              <h2>todos in work</h2>
              <Input
                className="TodoFilter"
                placeholder="find todo"
                value={InputValueInWork}
                onChange={onInputChangeWork}
              />
              <TodoList
                onSaveChanges={onSaveChangesInWork}
                onChangeWorkStatusDone={onChangeStatusIsDone}
                onDeleteTodo={onDeleteTodoinWork}
                todos={
                  filteredTodosInWork.length ? filteredTodosInWork : todoInWork
                }
              />
            </Col>

            <Col span={8}>
              <h2>done</h2>
              <Input
                className="TodoFilter"
                placeholder="find todo"
                value={InputValueIsDone}
                onChange={onInputChangeDone}
              />
              <div className="TodoList">
                <TodoList
                  onSaveChanges={onSaveChangesIsDone}
                  onChangeWorkStatusDone={onChangeStatusIsDone}
                  onDeleteTodo={onDeleteTodoIsDone}
                  todos={
                    filteredTodosIsDone.length
                      ? filteredTodosIsDone
                      : todoIsDone
                  }
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default App;
