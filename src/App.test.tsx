import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('renders app with title', () => {
    render(<App/>);
    const linkElement = screen.getByText(/Todo App/i);
    expect(linkElement).toBeInTheDocument();
});

test('add task with default priority of medium', () => {
    const app = render(<App/>);
    userEvent.type(screen.getByRole('textbox', {name: /title/i}), 'Task A')
    userEvent.click(screen.getByText('Create'))

    expect(screen.getByTestId('task-row-title')).toHaveTextContent('Task A')
    expect(screen.getByTestId('task-row-priority')).toHaveTextContent('Medium')
});

test('add task with priority of high', () => {
    const app = render(<App/>);
    userEvent.type(screen.getByRole('textbox', {name: /title/i}), 'Task A')
    userEvent.selectOptions(screen.getByTestId('select-priority'), [
        screen.getByText('High'),
    ])
    userEvent.click(screen.getByText('Create'))

    expect(screen.getByTestId('task-row-title')).toHaveTextContent('Task A')
    expect(screen.getByTestId('task-row-priority')).toHaveTextContent('High')
});

test('add task with priority of low', () => {
    const app = render(<App/>);
    userEvent.type(screen.getByRole('textbox', {name: /title/i}), 'Task A')
    userEvent.selectOptions(screen.getByTestId('select-priority'), [
        screen.getByText('Low'),
    ])
    userEvent.click(screen.getByText('Create'))

    expect(screen.getByTestId('task-row-title')).toHaveTextContent('Task A')
    expect(screen.getByTestId('task-row-priority')).toHaveTextContent('Low')
});

function createTask(title: string, priority: string) {
    userEvent.type(screen.getByRole('textbox', {name: /title/i}), title)
    userEvent.selectOptions(screen.getByTestId('select-priority'), [
        screen.getAllByText(priority)[0],
    ])
    userEvent.click(screen.getByText('Create'))
}

test('add multiple tasks', () => {
    const app = render(<App/>);
    createTask('Task A', 'High')
    createTask('Task B', 'Medium')
    createTask('Task C', 'Low')

    const titles = screen.getAllByTestId('task-row-title')
    expect(titles[0]).toHaveTextContent('Task A')
    expect(titles[1]).toHaveTextContent('Task B')
    expect(titles[2]).toHaveTextContent('Task C')

});

test('can mark a task as complete', () => {
    const app = render(<App/>);
    createTask('Task A', 'High')
    createTask('Task B', 'Medium')
    createTask('Task C', 'Low')

    const completedCheckbox = screen.getAllByTestId('task-row-completed')
    userEvent.click(completedCheckbox[1])
    expect(completedCheckbox[0]).not.toBeChecked()
    expect(completedCheckbox[1]).toBeChecked()
    expect(completedCheckbox[2]).not.toBeChecked()
});

test('can delete a task', () => {
    const app = render(<App/>);
    createTask('Task A', 'Medium')
    createTask('Task B', 'Medium')
    createTask('Task C', 'Medium')
    createTask('Task D', 'Medium')


    const deleteButtons = screen.getAllByTestId('task-row-delete')
    userEvent.click(deleteButtons[2])

    const titles = screen.getAllByTestId('task-row-title')
    expect(titles.length).toBe(3)
    expect(titles[0]).toHaveTextContent('Task A')
    expect(titles[1]).toHaveTextContent('Task B')
    expect(titles[2]).toHaveTextContent('Task D')
});

test('can filter tasks by completion status - all', () => {
    const app = render(<App/>);
    createTask('Task A', 'Medium')
    createTask('Task B', 'Medium')
    createTask('Task C', 'Medium')
    createTask('Task D', 'Medium')


    const completedCheckbox = screen.getAllByTestId('task-row-completed')
    userEvent.click(completedCheckbox[0])
    userEvent.click(completedCheckbox[2])

    userEvent.selectOptions(screen.getByTestId('filter-completion-status'), [
        screen.getByText('All'),
    ])

    const titles = screen.getAllByTestId('task-row-title')
    expect(titles.length).toBe(4)
    expect(titles[0]).toHaveTextContent('Task A')
    expect(titles[1]).toHaveTextContent('Task B')
    expect(titles[2]).toHaveTextContent('Task C')
    expect(titles[3]).toHaveTextContent('Task D')
});

test('can filter tasks by completion status - complete', () => {
    const app = render(<App/>);
    createTask('Task A', 'Medium')
    createTask('Task B', 'Medium')
    createTask('Task C', 'Medium')
    createTask('Task D', 'Medium')


    const completedCheckbox = screen.getAllByTestId('task-row-completed')
    userEvent.click(completedCheckbox[0])
    userEvent.click(completedCheckbox[2])

    userEvent.selectOptions(screen.getByTestId('filter-completion-status'), [
        screen.getByText('Complete'),
    ])

    const titles = screen.getAllByTestId('task-row-title')
    expect(titles.length).toBe(2)
    expect(titles[0]).toHaveTextContent('Task A')
    expect(titles[1]).toHaveTextContent('Task C')
});

test('can filter tasks by completion status - incomplete', () => {
    const app = render(<App/>);
    createTask('Task A', 'Medium')
    createTask('Task B', 'Medium')
    createTask('Task C', 'Medium')
    createTask('Task D', 'Medium')


    const completedCheckbox = screen.getAllByTestId('task-row-completed')
    userEvent.click(completedCheckbox[0])
    userEvent.click(completedCheckbox[2])

    userEvent.selectOptions(screen.getByTestId('filter-completion-status'), [
        screen.getByText('Incomplete'),
    ])

    const titles = screen.getAllByTestId('task-row-title')
    expect(titles.length).toBe(2)
    expect(titles[0]).toHaveTextContent('Task B')
    expect(titles[1]).toHaveTextContent('Task D')
});

test('can sort tasks by title', () => {
    const app = render(<App/>);
    createTask('Task B', 'Medium')
    createTask('Task C', 'Medium')
    createTask('Task A', 'Medium')
    createTask('Task D', 'Medium')

    const titlesOriginalOrder = screen.getAllByTestId('task-row-title')
    expect(titlesOriginalOrder[0]).toHaveTextContent('Task B')
    expect(titlesOriginalOrder[1]).toHaveTextContent('Task C')
    expect(titlesOriginalOrder[2]).toHaveTextContent('Task A')
    expect(titlesOriginalOrder[3]).toHaveTextContent('Task D')

    const titleSort = screen.getByTestId('task-table-title-header')

    userEvent.click(titleSort)
    const titlesAscending = screen.getAllByTestId('task-row-title')
    expect(titlesAscending[0]).toHaveTextContent('Task A')
    expect(titlesAscending[1]).toHaveTextContent('Task B')
    expect(titlesAscending[2]).toHaveTextContent('Task C')
    expect(titlesAscending[3]).toHaveTextContent('Task D')

    userEvent.click(titleSort)
    const titlesDescending = screen.getAllByTestId('task-row-title')
    expect(titlesDescending[0]).toHaveTextContent('Task D')
    expect(titlesDescending[1]).toHaveTextContent('Task C')
    expect(titlesDescending[2]).toHaveTextContent('Task B')
    expect(titlesDescending[3]).toHaveTextContent('Task A')

    userEvent.click(titleSort)
    const titlesBackToOriginalOrder = screen.getAllByTestId('task-row-title')
    expect(titlesBackToOriginalOrder[0]).toHaveTextContent('Task B')
    expect(titlesBackToOriginalOrder[1]).toHaveTextContent('Task C')
    expect(titlesBackToOriginalOrder[2]).toHaveTextContent('Task A')
    expect(titlesBackToOriginalOrder[3]).toHaveTextContent('Task D')
});

test('can sort tasks by priority', () => {
    const app = render(<App/>);
    createTask('Task A', 'Medium')
    createTask('Task B', 'Medium')
    createTask('Task C', 'High')
    createTask('Task D', 'Low')

    const priorityOriginalOrder = screen.getAllByTestId('task-row-priority')
    expect(priorityOriginalOrder[0]).toHaveTextContent('Medium')
    expect(priorityOriginalOrder[1]).toHaveTextContent('Medium')
    expect(priorityOriginalOrder[2]).toHaveTextContent('High')
    expect(priorityOriginalOrder[3]).toHaveTextContent('Low')

    const prioritySort = screen.getByTestId('task-table-priority-header')

    userEvent.click(prioritySort)
    const priorityDescending = screen.getAllByTestId('task-row-priority')
    expect(priorityDescending[0]).toHaveTextContent('High')
    expect(priorityDescending[1]).toHaveTextContent('Medium')
    expect(priorityDescending[2]).toHaveTextContent('Medium')
    expect(priorityDescending[3]).toHaveTextContent('Low')

    userEvent.click(prioritySort)
    const priorityAscending = screen.getAllByTestId('task-row-priority')
    expect(priorityAscending[0]).toHaveTextContent('Low')
    expect(priorityAscending[1]).toHaveTextContent('Medium')
    expect(priorityAscending[2]).toHaveTextContent('Medium')
    expect(priorityAscending[3]).toHaveTextContent('High')

    userEvent.click(prioritySort)
    const priorityBackToOriginalOrder = screen.getAllByTestId('task-row-priority')
    expect(priorityBackToOriginalOrder[0]).toHaveTextContent('Medium')
    expect(priorityBackToOriginalOrder[1]).toHaveTextContent('Medium')
    expect(priorityBackToOriginalOrder[2]).toHaveTextContent('High')
    expect(priorityBackToOriginalOrder[3]).toHaveTextContent('Low')
});
