import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../types/todo";
import { createTodo, deleteTodo, updateTodo } from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),

    onMutate: () => {
      console.log("mutate");
    },

    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
    },

    onSettled: async (_, error) => {
      console.log("settled");

      if (error) {
        console.log(error);
      } else {
        // Invalidate or refetch a query after mutation
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),

    onSettled: async (_, error, variables) => {
      console.log("settled");

      if (error) {
        console.log(error);
      } else {
        // Invalidate or refetch a query after mutation
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        await queryClient.invalidateQueries({
          queryKey: ["todo", { id: variables.id }], //Check queries.ts to see why it "todo" not "todos"
        });
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),

    onSuccess: () => {
      console.log("Deleted Successfully");
    },

    onSettled: async (_, error) => {
      console.log("settled");

      if (error) {
        console.log(error);
      } else {
        // Invalidate or refetch a query after mutation
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}
