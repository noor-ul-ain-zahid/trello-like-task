import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../../styles/Task.scss'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Task extends React.Component {
    render() {
        const { task, index, listId } = this.props
        return (
            <Draggable draggableId={task.id} index={index}>
                {(provided, snapshot) =>
                    <div className="task"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <div className='content'>
                            <p className='title'>{task.content}</p>
                            <br />
                            <EditIcon className='icon' onClick={() => this.props.edit(task.id, task.content)} />
                            <DeleteIcon className='icon' onClick={() => this.props.delete(task.id, listId)} />
                        </div>
                    </div>
                }
            </Draggable>
        )
    }
}