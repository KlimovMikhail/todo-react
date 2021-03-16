import {v4 as uuidv4} from 'uuid';

export const allTodos = [
  {
    id: uuidv4(),
    title: 'Linux',
    description: 'Figure out Linux commands',
    deadline: 10.2021,
    workStatus: false,
    isDone: false
  },
  {
    id: uuidv4(),
    title: 'GIT',
    description: 'Figure out GIT commands',
    deadline: 10.2021,
    workStatus: false,
    isDone: false
  },
  {
    id: uuidv4(),
    title: 'React',
    description: 'Figure out React Hoks',
    deadline: 10.2021,
    workStatus: false,
    isDone: false
  }
]