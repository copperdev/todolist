export const getTasks = () => JSON.parse(localStorage.getItem("tasks")) ?? []

export const addTask = (task) => {
    const tasks = getTasks()
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

export const updateTask = (task) => {
    const tasks = getTasks()
    tasks[tasks.findIndex(item => item.id === task.id)] = task 
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

export const deleteTask = (id) => {
    const tasks = getTasks()
    const newTasks = tasks.filter(item => item.id !== id)
    localStorage.setItem("tasks", JSON.stringify(newTasks))
}