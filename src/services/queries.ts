import { useQuery, useQueries, keepPreviousData } from "@tanstack/react-query";
import { getProjects, getTodo, getTodosIds } from "./api";

// Note: queryKey does NOT control what gets fetched from the server.
// The queryFn is what actually fetches the data.
// queryKey is only used by React Query for caching, identifying, and refetching this data.

// queryFn is the function that actually fetches the data from the server
// Whatever data this function returns will be stored under the queryKey above
export function useTodosIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
  });
}

export function useTodos(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: [`todo`, { id }],
        queryFn: () => getTodo(id!),
      };
    }),
  });
}

export function useProjects(page: number) {
  return useQuery({
    queryKey: ["projects", { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  });
}
