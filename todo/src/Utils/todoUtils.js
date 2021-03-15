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

export const getFilteredTodos = (InputValue, todos) => {
  return todos.reduce((acc, item) => {
    if(InputValue && item.title.toLowerCase().split(' ').includes(InputValue.toLowerCase())) {
      acc.push(item)
    }
    return acc
  }, [])
}
