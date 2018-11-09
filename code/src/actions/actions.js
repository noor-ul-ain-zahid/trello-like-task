import * as ActionType from '../constants/actionTypes'

export function addList(title) {
  return {
    type: ActionType.ADD_LIST,
    payload: title
  };
}

export function editListTitle(title, listId) {
  return {
    type: ActionType.EDIT_LIST_TITLE,
    payload: {
      title,
      listId
    }
  };
}

export function deleteList(list) {
  return {
    type: ActionType.DELETE_LIST,
    payload: list
  };
}

export function addTask(title, listId) {
  return {
    type: ActionType.ADD_TASK,
    payload: {
      title,
      listId
    }
  };
}

export function editTaskTitle(title, taskId) {
  return {
    type: ActionType.EDIT_TASK_TITLE,
    payload: {
      title,
      taskId
    }
  };
}

export function deleteTask(taskId, listId) {
  return {
    type: ActionType.DELETE_TASK,
    payload: {
      taskId,
      listId
    }
  };
}

export function dragAndDropLists(destination, source, draggableId) {
  return {
    type: ActionType.DRAG_AND_DROP_LISTS,
    payload: {
      destination,
      source,
      draggableId
    }
  };
}

export function dragAndDropTasks(destination, source, draggableId) {
  return {
    type: ActionType.DRAG_AND_DROP_TASKS,
    payload: {
      destination,
      source,
      draggableId
    }
  };
}