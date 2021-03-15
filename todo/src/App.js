import React, { useState } from "react";
import { Row, Col, Input, Button } from "antd";
import "antd/dist/antd.css";
import "./assests/styles.css";
import { allTodos } from "./mocks/mocks";
import { TodoList } from "./TodoList/TodoList";
import { TodoForm } from "./Todoform/TodoForm";
import { newItemTodo, removeTodo, getFilteredTodos } from "./Utils/todoUtils";

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
    setInputValueAll(value);
    setFilteredTodosAll(getFilteredTodos(value, todos));
  };

  const onInputChangeWork = (e) => {
    const { value } = e.target;
    setInputValueInWork(value);
    setFilteredTodosInWork(getFilteredTodos(value, todoInWork));
  };

  const onInputChangeDone = (e) => {
    const { value } = e.target;
    setInputValueIsDone(value);
    setFilteredTodosIsDone(getFilteredTodos(value, todoIsDone));
  };

  const onChangeWorkStatus = (id) => {
    todos.map((elem) => {
      if (id === elem.id) {
        elem.workStatus = !elem.workStatus;
      }
      return elem;
    });
  };

  const onChangeStatusIsDone = (id) => {
    todoInWork.map((elem) => {
      if (id === elem.id) {
        elem.isDone = !elem.isDone;
      }
      return elem;
    });
    todoIsDone.map((elem) => {
      if (id === elem.id) {
        elem.isDone = !elem.isDone;
      }
      return elem;
    });
  };

  const onSaveChanges = () => {
    const arrayInPending = todos.filter(
      (el) => !el.workStatus && el.isDone === false
    );
    setTodos(arrayInPending);

    const arrayInWork = todos.reduce((acc, item) => {
      if (item.workStatus && !item.isDone) {
        acc.push(item);
      }
      return acc;
    }, todoInWork);
    setTodosInWork(arrayInWork);
  };

  const onSaveChangesInWork = () => {
    const arrayInPending = todoInWork.filter(
      (el) => el.workStatus === true && el.isDone === false
    );
    setTodosInWork(arrayInPending);
    const arrayIsDone = todoInWork.reduce((acc, item) => {
      console.log("isdone", todoIsDone);
      if (item.isDone) {
        acc.push(item);
      }
      return acc;
    }, todoIsDone);
    setTodoIsDone(arrayIsDone);
  };

  const onSaveChangesIsDone = () => {
    const arrayInPending = todoIsDone.filter(
      (el) => el.isDone === true
    );
    setTodoIsDone(arrayInPending);
    const arrayInWork = todoIsDone.reduce((acc, item) => {
      if (item.workStatus && !item.isDone) {
        acc.push(item);
      }
      return acc;
    }, todoInWork);
    setTodosInWork(arrayInWork);
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
                value={InputValueAll}
                onChange={onInputChangeAll}
              />
              <TodoList
                onSaveChanges={onSaveChanges}
                onChangeWorkStatus={onChangeWorkStatus}
                onDeleteTodo={onDeleteTodo}
                todos={filteredTodosAll.length ? filteredTodosAll : todos}
              />
            </Col>

            <Col span={8}>
              <h2>todos in work</h2>
              <Input
                className="TodoFilter"
                placeholder="find todo"
                value={InputValueInWork}
                onChange={onInputChangeWork}
              />              <TodoList
                onSaveChanges={onSaveChangesInWork}
                onChangeWorkStatus={onChangeWorkStatus}
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
              <TodoList
                onSaveChanges={onSaveChangesIsDone}
                onChangeWorkStatusDone={onChangeStatusIsDone}
                onDeleteTodo={onDeleteTodoIsDone}
                todos={
                  filteredTodosIsDone.length ? filteredTodosIsDone : todoIsDone
                }
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default App;
