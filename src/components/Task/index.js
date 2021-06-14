import { useContext, useState } from "react"
import { TasksContext } from "../../context/tasksContext"
import Modal from "../../utils/Modal"
import { TASK_STATUS } from "../../utils/Utils"

const Task = ({ task }) => {
    const [showModal, setModal] = useState(false)
    const [editActive, setEditActive] = useState(true)
    const { tasksDispatch } = useContext(TasksContext)
    
    const handleCheck = () => {
        setModal(false)
        if (task.status.text === TASK_STATUS.done.text) {
            tasksDispatch({ type: "UPDATE_TASK", payload: { status: TASK_STATUS.workInProgress, task: task }})
        } else {
            tasksDispatch({ type: "UPDATE_TASK", payload: { status: TASK_STATUS.done, task: task }})
        }
    }

    const handleDelete = () => {
        tasksDispatch({ type: "DELETE_TASK", payload: task.id })
    }

    const showTaskModal = () => (
        <div>
            {showModal ? (
                <Modal task={task} editActive={editActive} setEditActive={setEditActive} modal={showModal} setModal={setModal} handleDelete={handleDelete} />
            ) : null}
        </div>
    )

    return (
        <div onClick={() => setModal(true)} className="p-2 mx-2 md:mx-auto sm:w-12/12 md:w-10/12 lg:w-8/12 xl:w-5/12 cursor-pointer">
            <div className="border flex items-center justify-between px-5 py-3 rounded shadow-md">
                <div>
                    {task.status.color === "green" && <span className={`text-green-500 bg-green-500 bg-opacity-20 px-2 py-1 rounded`}>{task.status.text}</span>}
                    {task.status.color !== "green" && <span className={`text-orange-500 bg-orange-500 bg-opacity-20 px-2 py-1 rounded`}>{task.status.text}</span>}
                    <h2 className="font-medium text-xl mt-1">{task.title}</h2>
                    <p className="text-gray-600">Créé le {new Date(task.date).toLocaleDateString()}</p>
                    <p className="text-lg mt-2 text-gray-500">{task.description}</p>
                </div>

                <div>
                    <input type="checkbox" className="checked:bg-blue-600 rounded h-8 w-8 cursor-pointer border border-gray-100" onChange={handleCheck} defaultChecked={task.status.text === TASK_STATUS.done.text} />
                </div>
            </div>
            {showTaskModal()}
        </div>
    )
}

export const TaskContainer = ({ children }) => (
    <div className="flex flex-col space-y-5 mb-5">
        {children}
    </div>
)

export default Task