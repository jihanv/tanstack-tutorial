// import { useIsFetching } from '@tanstack/react-query';
import { useTodos, useTodosIds } from '../services/queries'

export default function Todo() {

    // const isFetching = useIsFetching()

    const todosIdsQuery = useTodosIds();
    const todosQueries = useTodos(todosIdsQuery.data)

    if (todosIdsQuery.isPending) {
        return <span>Loading...</span>;
    }

    return (
        <>
            <p>Query function status: {todosIdsQuery.fetchStatus}</p>
            <div>{todosIdsQuery.data?.map((id) => <p key={id}>id: {id}</p>)}</div>
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
