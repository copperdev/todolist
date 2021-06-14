import { useContext } from "react"
import { TasksContext } from "../context/tasksContext"
import FormTask from "./FormTask"
import Task, { TaskContainer } from "./Task"

const App = () => {
    const { tasksState } = useContext(TasksContext)

    return (
        <div className="md:container mt-5">
            <h1 className="text-5xl text-blue-600 text-center font-medium mb-5">Todolist</h1>
            <FormTask />
            <TaskContainer>
                {
                    tasksState.tasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))
                }
            </TaskContainer>
        </div>
    )
}

export default App