import React, {useState} from 'react';
import produce from "immer"
import {CreatTaskForm} from "./elements/CreateTodoForm";
import {TaskTable} from "./elements/TodoTable";
import {NewTask, Task} from "./model/Task";


function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function addTask(newTask: NewTask) {
        setTasks(produce(draftTasks => {
            draftTasks.push({
                ...newTask,
                id: Date.now(),
                complete: false
            })
        }))
    }

    function changeCompleted(id: number, isComplete: boolean) {
        const nextTasks = produce(tasks, draftTasks => {
            draftTasks.forEach(task => {
                if (task.id === id) {
                    task.complete = isComplete
                }
            })
        })
        setTasks(nextTasks)
    }

    function deleteTask(id: number) {
        const nextTasks = produce(tasks, draftTasks => {
            const indexToDelete = draftTasks.findIndex(task => task.id === id);
            if (indexToDelete > -1) {
                draftTasks.splice(indexToDelete, 1);
            }
        })
        setTasks(nextTasks)
    }

    return (
        <div className="bg-white">
            <div className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="mt-1 font-extrabold text-gray-900 sm:tracking-tight text-5xl md:text-6xl">Todo App</p>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">A demo project for James Leslie's application to PwC</p>
                </div>
                <CreatTaskForm addTask={addTask}/>
                <TaskTable tasks={tasks} changeCompleted={changeCompleted} deleteTask={deleteTask}/>
            </div>
        </div>
    );
}

export default App;
