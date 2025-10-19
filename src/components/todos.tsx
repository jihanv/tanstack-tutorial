// import { useIsFetching } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useCreateTodo } from '../services/mutations';
import { useTodos, useTodosIds } from '../services/queries'
import type { Todo } from '../types/todo';

export default function Todos() {

    // const isFetching = useIsFetching()

    const todosIdsQuery = useTodosIds();
    const todosQueries = useTodos(todosIdsQuery.data)

    const createTodoMutation = useCreateTodo()

    const handleCreateToDoSubmit: SubmitHandler<Todo> = (data) => {
        createTodoMutation.mutate(data)
    }
    // Initialize React Hook Form and tell it the shape of our form data is Todo
    // useForm returns many helpers, but we only need register and handleSubmit right now
    // register() connects an input field to the form state
    // handleSubmit() wraps our submit function and gives us validated form data
    //<Todo> ensures form fields match the Todo type for type safety
    const { register, handleSubmit } = useForm<Todo>()



    if (todosIdsQuery.isPending) {
        return <span>Loading...</span>;
    }

    return (
        <>
            <form
                // React Hook Form wraps submission using handleSubmit
                // It prevents the page from refreshing and gives us form values safely
                onSubmit={handleSubmit(handleCreateToDoSubmit)}>
                <input placeholder='Title' {...register("title")}></input>
                <br />
                <input placeholder='Description' {...register("description")}></input>
                <br />
                <input type="submit" disabled={createTodoMutation.isPending} value={createTodoMutation.isPending ? "Creating..." : "Create Todo"}></input>

            </form>
            <p>Query function status: {todosIdsQuery.fetchStatus}</p>

            <ul>
                {todosQueries.map(({ data }, i) => (
                    <li key={i}>
                        <div>ID : {data?.id}</div>
                        <span>
                            <strong>Title:</strong> {data?.title}, {""}
                            <strong>Description:</strong> {data?.description}, {""}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    )
}
