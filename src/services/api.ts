import axios from "axios";
import type { Todo } from "../types/todo";

export const BASE_URL = "http://localhost:8080";

// Create a reusable axios instance that already knows the base URL
// This way, we don’t have to write "http://localhost:8080" every time
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
  // Send a GET request to the "/todos" endpoint
  // Full URL becomes: http://localhost:8080/todos
  // The <Todo[]> tells TypeScript we expect an array of Todo objects in the response
  // await pauses the function until the request finishes

  return (await axiosInstance.get<Todo[]>("todos")).data.map((todo) => todo.id);

  // Every HTTP response from axios has a "data" property
  // response.data is now the array of todos returned from the server
  // We use .map() to create a new array containing ONLY the "id" from each todo
  // Example:
  // if response.data = [{id: 1, title: "A"}, {id: 2, title: "B"}]
  // this returns [1, 2]
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
};

export const createTodo = async (data: Todo) => {
  await axiosInstance.post("todos", data);
};
