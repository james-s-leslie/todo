import React, {useRef, useState} from 'react'
import {NewTask, prioritiesArray, Priority} from "../model/Task";

interface CreatTaskFormProps {
    addTask: (newTask: NewTask) => void
}

const DEFAULT_PRIORITY = 'Medium'

export const CreatTaskForm = ({addTask}: CreatTaskFormProps) => {
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState<Priority>(DEFAULT_PRIORITY)
    const titleRef = useRef<HTMLInputElement>(null)

    function create() {
        const trimmedTitle = title.trim()
        if (trimmedTitle.length > 0) {
            addTask({title: trimmedTitle, priority: priority})
            setTitle('')
            setPriority(DEFAULT_PRIORITY)
            titleRef.current?.focus()
        }
    }

    function handleTitleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            create()
        }
    }

    return (
        <div className="mt-6 flex flex-col md:flex-row">
            <div className="flex-grow">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <div className="mt-1">
                    <input type="text" id="title" name="title" value={title} onChange={event => setTitle(event.target.value)} onKeyDown={handleTitleKeyDown} ref={titleRef} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
                </div>
            </div>

            <div className="md:mx-2 my-3 md:my-0">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <div className="mt-1">
                    <select id="priority" name="priority" value={priority} onChange={event => setPriority(event.target.value as Priority)} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-600" data-testid="select-priority">
                        {prioritiesArray.map(priority => <option className="text-gray-600" key={priority} value={priority}>{priority}</option>)}
                    </select>
                </div>
            </div>
            <div className="w-20 md:relative ">
                <div className="md:absolute md:inset-x-0 md:bottom-0">
                    <button type="button" onClick={() => create()} className="min-w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Create
                    </button>
                </div>
            </div>
        </div>

    )
}