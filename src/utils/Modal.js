import { createRef, useCallback, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { TasksContext } from "../context/tasksContext"
import { useTextareaResize } from "../hooks/CustomHook"

const Modal = ({ task, editActive, setEditActive, modal, setModal, handleDelete }) => {
    document.body.style.overflow = "hidden"
    const wrapperRef = createRef()
    const textAreaRef = createRef()
    const { textAreaHeight, parentHeight, onChangeHandler } = useTextareaResize(textAreaRef)
    const { tasksDispatch } = useContext(TasksContext)
    const [showModal, setShowModal] = useState(modal)
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const closeModal = useCallback((event) => {
        if (modal) {
            if (wrapperRef && !wrapperRef.current.contains(event.target)) {
                setShowModal(false)
            }
        }
    }, [modal, wrapperRef])

    const onSubmit = (data) => {
        const updateTask = {
            id: task.id,
            title: data.title,
            description: data.description,
            status: task.status, 
            date: task.date
        }
        tasksDispatch({ type: "UPDATE_TASK", payload: { status: task.status, task: updateTask }})
        setShowModal(false)
    }

    useEffect(() => {
        if (showModal) {
            setEditActive(true)
        } else {
            setModal(showModal)
            document.body.style.overflow = "scroll"
        }
    }, [showModal, setEditActive, setModal])

    useEffect(() => {
        window.addEventListener('mousedown', closeModal)
    
        return () => {
            window.removeEventListener('mousedown', closeModal) 
        }
    }, [closeModal])

    return (
        <div>
            <div className="justify-center items-center bg-gray-300 bg-opacity-75 flex fixed inset-0 z-50 outline-none focus:outline-none">
                <div ref={wrapperRef} className="flex-auto w-xl max-w-lg shadow-lg" style={{ minHeight: parentHeight }}>
                    <div className="border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* header */}
                        <div onClick={() => setEditActive(!editActive)} className="flex justify-around border-b border-solid border-gray-200">
                            <div className={`w-full py-3 cursor-pointer ${editActive ? "text-blue-500 shadow-md" : "text-gray-500"}`}>
                                <h3 className="text-lg text-center">Modifier</h3>
                            </div>
                            <div onClick={() => setEditActive(!editActive)} className={`w-full py-3 cursor-pointer ${!editActive ? "text-red-500 shadow-md" : "text-gray-500"}`}>
                                <h3 className="text-lg text-center">Supprimer</h3>
                            </div>
                        </div>
                        {/* content */}
                        <div className="px-5">
                            {editActive && (
                                <form onSubmit={handleSubmit(onSubmit)} className="pt-5 pb-5 flex flex-col">
                                    <div className="flex flex-col w-full">
                                        <input defaultValue={task.title} {...register("title", { required: true, maxLength: 150 })} className={`font-medium text-xl focus:outline-none ${errors.title && "placeholder-red-500"}`} placeholder="Titre de la tâche" />
                                        <textarea defaultValue={task.description} {...register("description", { required: false, maxLength: 250 })} className="text-lg mt-2 mb-5 text-gray-500 focus:outline-none resize-none" ref={textAreaRef} rows={1} style={{ height: textAreaHeight }} onChange={onChangeHandler} placeholder="Ajouter une description" />
                                    </div>
                                    <div className="items-center flex space-x-5">
                                        <button className="bg-gray-300 cursor-pointer w-full mt-1 rounded-md text-sm sm:text-md text-white font-bold px-2 py-3" onClick={() => setShowModal(false)}>Annuler</button>
                                        <button type="submit" className="bg-blue-500 cursor-pointer w-full mt-1 rounded-md text-sm sm:text-md text-white font-bold px-2 py-3">Enregistrer</button>
                                    </div>
                                </form>
                            )}
                            {!editActive && (
                                <div>
                                    <div className="relative pt-2 pb-5 flex-auto">
                                        <p className="pt-2 text-lg">Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
                                        <p className="text-gray-500 text-lg">Cette action est définitive</p>
                                    </div>
                                    <div className="items-center mb-5 flex space-x-5">
                                        <button className="bg-gray-300 cursor-pointer w-full mt-1 rounded-md text-sm sm:text-md text-white font-bold px-2 py-3" onClick={() => setShowModal(false)}>Annuler</button>
                                        <button className="bg-red-500 cursor-pointer w-full mt-1 rounded-md text-sm sm:text-md text-white font-bold px-2 py-3" onClick={() => handleDelete()}>Supprimer</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </div>
    )
}

export default Modal