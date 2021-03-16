import { v4 as uuidv4 } from "uuid";

export const newItemFromData = (data) => {
  return {
    ...data,
    id: uuidv4(),
  };
};

export const newItemTodo = (data, todos) => {
  return [newItemFromData(data), ...todos];
};

export const removeTodo = (id, todos) => {
  return todos.filter((el) => el.id !== id);
};

export const changeWorkStatus = (todos, id) => {
  todos.map((elem) => {
    if (id === elem.id) {
      elem.workStatus = !elem.workStatus;
    }
    return elem;
  });
};

export const changeStatusIsDone = (todos, id) => {
  todos.map((elem) => {
    if (id === elem.id) {
      elem.isDone = !elem.isDone;
    }
    return elem;
  });
};

export const changeTodo = (todos, changedElement, id) => {
  return todos.map((item) => {
    if (id === item.id) {
      return {
        ...item,
        title: changedElement.title,
        description: changedElement.description,
        deadline: changedElement.deadline,
      };
    }
    return item;
  });
};

export const getFilteredTodos = (InputValue, todos) => {
  return todos.reduce((acc, item) => {
    if (
      InputValue &&
      item.title.toLowerCase().split(" ").includes(InputValue.toLowerCase())
    ) {
      acc.push(item);
    }
    return acc;
  }, []);
};
