import React from 'react'
import { useTodosIds } from '../services/queries'

export default function Todo() {

    const todosIdsQuery = useTodosIds();

    if (todosIdsQuery.isError) {
        return <span>ERROR</span>;
    }

    return (
        <div>{todosIdsQuery.data?.map((id) => <p key={id}>{id}</p>)}</div>
    )
}
