import { createRef, useContext } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { TasksContext } from "../../context/tasksContext"
import { useTextareaResize } from "../../hooks/CustomHook"
import { TASK_STATUS } from "../../utils/Utils"

const FormTask = () => {
    const { tasksDispatch } = useContext(TasksContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const textAreaRef = createRef()
    const { textAreaHeight, parentHeight, onChangeHandler } = useTextareaResize(textAreaRef)
    
    const onSubmit = (data) => {
        const task = {
            id: uuidv4(),
            title: data.title,
            description: data.description,
            status: TASK_STATUS.workInProgress, 
            date: new Date()
        }
        tasksDispatch({ type: "ADD_TASK", payload: task })
        reset()
    }

    return (
        <div className="md:px-4" style={{ minHeight: parentHeight }}>
            <form onSubmit={handleSubmit(onSubmit)} className="border border-dashed border-5 flex items-start p-5 rounded mx-4 md:mx-auto sm:w-12/12 md:w-10/12 lg:w-8/12 xl:w-5/12 mb-10">
                <div className="flex flex-col w-full">
                    <input {...register("title", { required: true, maxLength: 150 })} className={`font-medium text-xl focus:outline-none ${errors.title && "placeholder-red-500"}`} placeholder="Titre de la tâche" />
                    <textarea {...register("description", { required: false, maxLength: 250 })} className="text-lg mt-2 text-gray-500 focus:outline-none resize-none" ref={textAreaRef} rows={1} style={{ height: textAreaHeight }} onChange={onChangeHandler} placeholder="Ajouter une description" />
                </div>
                <button type="submit" className="text-gray-400 hover:text-blue-500 transform rotate-90 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default FormTask