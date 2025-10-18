import axios from "axios";
import type { Todo } from "../types/todo";

export const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
  // "todos" is the endpoint added to the BASE_URL ("http://localhost:8080")
  // So this request goes to: http://localhost:8080/todos
  // In our case, json-server creates this endpoint automatically from the "todos" key in db.json

  return (await axiosInstance.get<Todo[]>("todos")).data.map((todo) => todo.id);
};
