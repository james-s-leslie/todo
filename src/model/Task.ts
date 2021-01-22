export interface Task {
    id: number
    title: string,
    complete: boolean
    priority: Priority
}

export interface NewTask {
    title: string,
    priority: Priority
}

export type Priority = 'High' | 'Medium' | 'Low'
export const prioritiesArray: Priority[] = ['High', 'Medium', 'Low']
