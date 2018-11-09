import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import TaskList from './taskList/TaskList'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Modal from '../Modal/Modal'
import '../../styles/List.scss'

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTaskModal: false,
      action: '',
      title: '',
      taskId: '',
      listId: ''
    };
  }
  
  userInput = event => { this.setState({ title: event.target.value }) }

  toggleState = action => { this.setState({ showTaskModal: !this.state.showTaskModal, action }) }

  showAddModal = listId => {
    this.setState({ listId: listId, showTaskModal: !this.state.showTaskModal, action: 'add' })
  }

  addTask = title => {
    this.props.addTask(title, this.state.listId)
    this.toggleState('')
  }

  showEditModal = (id, title) => {
    this.setState({ taskId: id, title: title, showTaskModal: !this.state.showTaskModal, action: 'edit' })
  }

  editTask = title => {
    this.props.editTaskTitle(title, this.state.taskId)
    this.toggleState('')
  }

  deleteTask = (taskId, boardId) => { this.props.deleteTask(taskId, boardId) }

  render() {
    const { action, showTaskModal } = this.state,
      { list, index, tasks, edit, deleteList } = this.props
    return (
      <div className="list">
        <Draggable draggableId={list.id} index={index}>
          {(provided, snapshot) =>
            <div className="list-container"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <div className='header'>
                <h3 className="title">{list.title}</h3>
                <EditIcon className='icon' onClick={() => edit(list.id, list.title)} />
                <DeleteIcon className='icon' onClick={() => deleteList(list.id)} />
              </div>
              <Droppable droppableId={list.id} index={index} type='task'>
                {(provided, snapshot) =>
                  <div className="task-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    <TaskList
                      edit={this.showEditModal}
                      delete={this.deleteTask}
                      tasks={tasks}
                      listId={list.id}
                    />
                    {provided.placeholder}
                  </div>
                }
              </Droppable>
              <div className='add-btn'>
                <p onClick={() => this.showAddModal(list.id)}>
                  <span className='add'>+</span>
                  AddTask
                </p>
              </div>
            </div>
          }
        </Draggable>
        <Modal
          action={action}
          onSubmit={action === 'add' ? this.addTask : this.editTask}
          type='task'
          title={action === 'add' ? 'Add Task' : 'Update Task Title'}
          open={showTaskModal}
          onchange={this.userInput}
          hideModal={this.toggleState}
          data={this.state.title}
        />
      </div>
    )
  }
}
export default List;