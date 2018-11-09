import React from 'react'
import "@atlaskit/css-reset"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Modal from './Modal/Modal'
import Board from './Board/Board'
import AppBar from './AppBar/AppBar'
import '../styles/Main.scss'
import {
  dragAndDropLists,
  dragAndDropTasks,
  addList,
  editListTitle,
  deleteList,
  addTask,
  editTaskTitle,
  deleteTask
} from '../actions/actions'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showListModal: false,
      action: '',
      title: '',
      id: ''
    };
  }

  userInput = event => { this.setState({ title: event.target.value }) }

  toggleState = action => { this.setState({ showListModal: !this.state.showListModal, action }) }

  addList = title => {
    this.props.addList(title)
    this.toggleState('')
  }

  showEditModal = (id, title) => {
    this.setState({ id: id, title: title, showListModal: !this.state.showListModal, action: 'edit' })
  }

  editList = title => {
    this.props.editListTitle(title, this.state.id)
    this.toggleState('')
  }

  deleteList = listId => { this.props.deleteList(listId) }

  onDragEnd = results => {
    const { destination, source, draggableId, type } = results;

    if (!destination) return;

    if (destination.droppableId === source.droppableId
      &&
      destination.index === source.index
    )
      return;

    if (type === "list") {
      this.props.dragAndDropLists(destination, source, draggableId);
      return;
    }

    this.props.dragAndDropTasks(destination, source, draggableId);
  }
  render() {
    const { action, showListModal } = this.state,
      { listOrder, tasks, Lists } = this.props
    return (
      <div className='main'>
        <AppBar/>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="container">
            <Droppable droppableId='all-lists' direction="horizontal" type="list">
              {provided =>
                <div className='board' ref={provided.innerRef} {...provided.droppableProps}>
                  <Board
                    listOrder={listOrder}
                    Lists={Lists}
                    tasks={tasks}
                    showEditModal={this.showEditModal}
                    deleteList={this.deleteList}
                    addTask={this.props.addTask}
                    editTaskTitle={this.props.editTaskTitle}
                    deleteTask={this.props.deleteTask}
                  />
                  {provided.placeholder}
                </div>
              }
            </Droppable>
            <div className='add-list-btn'>
              <p onClick={() => this.toggleState('add')}>
                <span className="add-list-text">+</span>
                Add List
              </p>
            </div>
          </div>
        </DragDropContext>
        <Modal
          action={action}
          onSubmit={action === 'add' ? this.addList : this.editList}
          type='list'
          title={action === 'add' ? 'Add List' : 'Edit List'}
          open={showListModal}
          onchange={this.userInput}
          hideModal={this.toggleState}
          data={this.state.title}
        />
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    listOrder: state.listOrder,
    Lists: state.Lists,
    tasks: state.tasks
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    dragAndDropLists,
    dragAndDropTasks,
    addList,
    editListTitle,
    deleteList,
    addTask,
    editTaskTitle,
    deleteTask
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);