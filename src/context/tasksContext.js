import { createContext, useReducer } from "react"
import { initState, tasksReducer } from "../reducers/tasksReducer"

export const TasksContext = createContext({
    tasksState: initState,
    tasksDispatch: () => null
})

const TasksProvider = ({ children }) => {
    const [tasksState, tasksDispatch] = useReducer(tasksReducer, initState)

    return (
        <TasksContext.Provider value={{ tasksState, tasksDispatch }}>
            { children }
        </TasksContext.Provider>
    )
}

export default TasksProvider
