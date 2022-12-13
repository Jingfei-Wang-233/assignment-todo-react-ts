import axios from 'axios';
import { Task } from '../types';

const TASK_URL = 'http://localhost:8080/tasks';

export const fetch = () => axios.get(TASK_URL).then((response) => response.data);

export const remove = (id: number) =>
  axios.delete(`${TASK_URL}/${id}`).then((response) => response.data);

export const update = (id: number, task: Task) =>
  axios.put(`${TASK_URL}/${id}`, task).then((response) => response.data);

export const add = (todo: string) =>
  axios
    .post(TASK_URL, {
      name: todo,
      completed: false,
    })
    .then((response) => response.data);
