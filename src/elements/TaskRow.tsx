import {Task} from "../model/Task";
import React from "react";

interface TaskRowProps {
    task: Task,
    even: boolean,
    changeCompleted: (id: number, isComplete: boolean) => void,
    deleteTask: (id: number) => void
}

export const TaskRow = ({task, even, changeCompleted, deleteTask}: TaskRowProps) =>
    <tr className={even ? "bg-white" : "bg-gray-50"}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-400 grid justify-items-center">
            <input name="completed" type="checkbox" checked={task.complete} onChange={(event) => changeCompleted(task.id, event.target.checked)} className="focus:ring-blue-600 h-4 w-4 text-blue-500 border-gray-300 rounded" data-testid="task-row-completed"/>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-testid="task-row-title">{task.title}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-testid="task-row-priority">{task.priority}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            {/*<button className="text-blue-600 hover:text-blue-500 mx-3">Edit</button> didn't get to adding edit functionality*/}
            <button className="text-blue-600 hover:text-red-500" onClick={() => deleteTask(task.id)} data-testid="task-row-delete">Delete</button>
        </td>
    </tr>
