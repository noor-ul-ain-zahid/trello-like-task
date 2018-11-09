import React from 'react';
import List from '../List/List'
const Board = (props) => {
    return (
        props.listOrder.map((listId, index) => {
            const list = props.Lists[listId]
            const listTasks = list.taskIds.map(taskId => props.tasks[taskId])
            return (
                <List
                    key={list.id}
                    list={list}
                    tasks={listTasks}
                    index={index}
                    edit={props.showEditModal}
                    deleteList={props.deleteList}
                    addTask={props.addTask}
                    editTaskTitle={props.editTaskTitle}
                    deleteTask={props.deleteTask}
                />
            )
        })

    )
}
export default Board;