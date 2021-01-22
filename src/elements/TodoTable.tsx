import React, {useState} from 'react'
import {Task} from '../model/Task';
import {TaskRow} from "./TaskRow";

interface TaskTableProps {
    tasks: Task[],
    changeCompleted: (id: number, isComplete: boolean) => void
    deleteTask: (id: number) => void
}

const PRIORITY_ORDER = ['High', 'Medium', 'Low']

export const TaskTable = ({tasks, changeCompleted, deleteTask}: TaskTableProps) => {
    const [filter, setFilter] = useState('All')
    const [titleSort, setTitleSort] = useState('None')
    const [prioritySort, setPrioritySort] = useState('None')

    let filteredTasks = tasks
    if (filter === 'Complete') {
        filteredTasks = tasks.filter(task => task.complete)
    } else if (filter === 'Incomplete') {
        filteredTasks = tasks.filter(task => !task.complete)
    }

    let sortedAndFilteredTasks = filteredTasks;
    if (titleSort === 'Ascending') {
        sortedAndFilteredTasks = [...filteredTasks].sort((a, b) => (a.title.localeCompare(b.title)))
    } else if (titleSort === 'Descending') {
        sortedAndFilteredTasks = [...filteredTasks].sort((a, b) => (b.title.localeCompare(a.title)))
    }
    if (prioritySort === 'Ascending') {
        sortedAndFilteredTasks = [...filteredTasks].sort((a, b) => (PRIORITY_ORDER.indexOf(b.priority) - PRIORITY_ORDER.indexOf(a.priority)))
    } else if (prioritySort === 'Descending') {
        sortedAndFilteredTasks = [...filteredTasks].sort((a, b) => (PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority)))
    }

    const numberOfCompletedTasks = tasks.filter(task => task.complete).length

    function handleClickTitleSort() {
        setPrioritySort('None') // You can only sort by one field at a time
        switch (titleSort) {
            case 'None':
                setTitleSort('Ascending')
                break;
            case 'Ascending':
                setTitleSort('Descending')
                break;
            default:
                setTitleSort('None')
        }
    }

    function handleClickPrioritySort() {
        setTitleSort('None') // You can only sort by one field at a time
        switch (prioritySort) {
            case 'None':
                setPrioritySort('Descending')
                break;
            case 'Descending':
                setPrioritySort('Ascending')
                break;
            default:
                setPrioritySort('None')
        }
    }

    function sortArrow(direction: string) {
        if (direction === 'Ascending') {
            return <span>&#5169;</span> //Unicode up arrow ᐱ
        }
        if (direction === 'Descending') {
            return <span>&#5167;</span> //Unicode down arrow ᐯ
        }
        return null
    }

    return (
        <div className="flex flex-col">
            <div className="my-2 overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Completed
                                </th>
                                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">
                                    <button className="text-blue-500 text-xs font-medium uppercase tracking-wider" onClick={handleClickTitleSort} data-testid="task-table-title-header">Title {sortArrow(titleSort)}</button>
                                </th>
                                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ">
                                    <button className="text-blue-500 text-xs font-medium uppercase tracking-wider w-16 text-left" onClick={handleClickPrioritySort} data-testid="task-table-priority-header">Priority {sortArrow(prioritySort)}</button>
                                </th>
                                <th scope="col" className="px-3 md:px-6 py-3">
                                    <span className="sr-only">Delete</span>

                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedAndFilteredTasks.length <= 0 ? <tr>
                                <th colSpan={4} scope="col">
                                    <div className="w-full text-center text-gray-500 font-medium my-10">No tasks to display</div>
                                </th>
                            </tr> : null}
                            {sortedAndFilteredTasks.map((task, index) => <TaskRow key={task.id} task={task} even={index % 2 === 0} changeCompleted={changeCompleted} deleteTask={deleteTask}/>)}
                            </tbody>
                            <tfoot className="bg-white">
                            <tr>
                                <th colSpan={4} scope="col">
                                    <div className="flex flex-row">
                                        <div className="inline px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider text-center">
                                            <select name="filter" value={filter} onChange={event => setFilter(event.target.value)} className="w-32 block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md" data-testid="filter-completion-status">
                                                <option>All</option>
                                                <option>Complete</option>
                                                <option>Incomplete</option>
                                            </select>
                                        </div>
                                        <div className="pt-5 pr-5 text-sm font-medium text-gray-500 tracking-wider text-right inline flex-grow">
                                            Complete: {numberOfCompletedTasks} Total: {tasks.length}
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}