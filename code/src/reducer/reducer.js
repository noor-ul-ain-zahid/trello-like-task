import initialData from "../Data/initialData";
import * as ActionType from '../constants/actionTypes'
import {
  dragAndDropLists,
  dragAndDropTasks,
  addList,
  deleteList,
  deleteTask,
  addTask,
  editListTitle,
  editTaskTitle
} from '../helpers/helpers'

export default function reducer(state = initialData, action) {

  switch (action.type) {

    case ActionType.ADD_LIST: {
      const newLists = addList(state.Lists, action.payload, state.listOrder)
      return { ...state, ...newLists }
    }
    case ActionType.EDIT_LIST_TITLE: {
      const { listId, title } = action.payload,
        newLists = editListTitle(listId, title, state.Lists)
      return { ...state, ...newLists }
    }
    case ActionType.DELETE_LIST: {
      const newState = deleteList(action.payload, state.Lists, state.listOrder)
      return { ...state, ...newState };
    }
    case ActionType.ADD_TASK: {
      const { title, listId } = action.payload,
        newState = addTask(title, listId, state.tasks, state.Lists, state.listOrder)
      return { ...state, ...newState }
    }
    case ActionType.EDIT_TASK_TITLE: {
      const { taskId, title } = action.payload,
        newTasks = editTaskTitle(taskId, title, state.tasks)
      return { ...state, ...newTasks }
    }
    case ActionType.DELETE_TASK: {
      const { taskId, listId } = action.payload,
        newState = deleteTask(taskId, listId, state.Lists, state.tasks)
      return { ...state, ...newState };
    }
    case ActionType.DRAG_AND_DROP_LISTS: {
      const { destination, source, draggableId } = action.payload,
        newListOrder = dragAndDropLists(destination, source, draggableId, state.listOrder)
      return { ...state, listOrder: newListOrder };
    }
    case ActionType.DRAG_AND_DROP_TASKS: {
      const { destination, source, draggableId } = action.payload,
        newLists = dragAndDropTasks(destination, source, draggableId, state.Lists)
      return { ...state, Lists: newLists }
    }
    default: // need this for default case
      return state
  }
}