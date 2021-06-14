import { addTask, deleteTask, getTasks, updateTask } from "../cache"

export const initState = {
    tasks: getTasks()
}

export const tasksReducer = (state, action) => {
    const arr = getTasks()
    switch (action.type) {
    case "ADD_TASK":
        addTask(action.payload)
        return {
            tasks: getTasks()
        }
    case "UPDATE_TASK":
        const index = arr.findIndex((item) => item.id === action.payload.task.id)
        arr[index].status = action.payload.status
        arr[index].title = action.payload.task.title
        arr[index].description = action.payload.task.description
        updateTask(arr[index])
        return {
            tasks: getTasks()
        }
    case "DELETE_TASK":
        deleteTask(action.payload)
        return {
            tasks: getTasks()
        }
    default:
        return initState
    }
}
