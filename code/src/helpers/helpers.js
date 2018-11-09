import {
  remove,
  set,
  dissoc,
  reject,
  compose,
  insert,
  propOr,
  replace,
  append,
  lens,
  prop,
  assoc,
} from "ramda";

export const addList = (Lists, listName, listOrder) => {
  const listsKeys = Object.keys(Lists)
  let lastListId = listsKeys[listsKeys.length - 1];
  lastListId = propOr("list-1", lastListId)(Lists);
  if (lastListId !== "list-1") {
    const lastIdDigit = lastListId.id.substring(lastListId.id.length - 1)
    const nextIdDigit = parseInt(lastIdDigit) + 1;
    lastListId = replace(lastIdDigit, nextIdDigit, lastListId.id);
  }
  const newListOrder = append(lastListId, listOrder);
  return {
    Lists: { ...Lists, [lastListId]: { id: lastListId, title: listName, taskIds: [] } },
    listOrder: newListOrder
  }
}

export const editListTitle = (listId, title, Lists) => {
  return { Lists: { ...Lists, [listId]: { ...Lists[listId], title: title } } }
}

export const deleteList = (listId, Lists, listOrder) => {
  const allLists = dissoc(listId, Lists);
  const newListsOrder = reject(list => list === listId, listOrder)
  return { Lists: allLists, listOrder: newListsOrder }
}

export const addTask = (title, listId, tasks, Lists) => {
  const tasksKeys = Object.keys(tasks)
  let lastTaskId = tasksKeys[tasksKeys.length - 1]
  lastTaskId = propOr("task-1", lastTaskId)(tasks);
  if (lastTaskId !== "task-1") {
    const lastIdDigit = lastTaskId.id.substring(lastTaskId.id.length - 1);
    const nextIdDigit = parseInt(lastIdDigit) + 1;
    lastTaskId = replace(lastIdDigit, nextIdDigit, lastTaskId.id);
  }
  const updatedTasks = { ...tasks, [lastTaskId]: { id: lastTaskId, content: title } }
  const residantList = Lists[listId];
  const updatedTaskIds = residantList['taskIds'].concat(lastTaskId);
  const updatedList = set(lens(prop("taskIds"), assoc("taskIds")), updatedTaskIds, residantList)
  return { tasks: updatedTasks, Lists: { ...Lists, [residantList.id]: updatedList } }
}

export const editTaskTitle = (taskId, title, tasks) => {
  return { tasks: { ...tasks, [taskId]: { ...tasks[taskId], content: title } } }
}

export const deleteTask = (taskId, listId, Lists, tasks) => {
  const newTasks = dissoc(taskId, tasks);
  const residantListTasks= reject(task => task === taskId, Lists[listId].taskIds)
  return { tasks: newTasks, Lists: { ...Lists, [listId]: { ...Lists[listId], taskIds: residantListTasks } } }
}

export const dragAndDropLists = (destination, source, draggableId, listOrder) =>
  compose(insert(destination.index, draggableId), remove(source.index, 1))(listOrder)

export const dragAndDropTasks = (destination, source, draggableId, Lists) => {
  const startList = Lists[source.droppableId]
  const endList = Lists[destination.droppableId]

  //if being dragged and dropped in same list
  if (startList === endList) {
    let newTaskIds = Array.from(startList.taskIds)
    newTaskIds = remove(source.index, 1, newTaskIds)
    newTaskIds.splice(destination.index, 0, draggableId)
    const newList = { ...startList, taskIds: newTaskIds }
    return { ...Lists, [newList.id]: newList }
  }

  let startTaskIds = Array.from(startList.taskIds)
  startTaskIds = remove(source.index, 1, startTaskIds)
  const newStartList = { ...startList, taskIds: startTaskIds }
  const endTaskIds = Array.from(endList.taskIds)
  endTaskIds.splice(destination.index, 0, draggableId)
  const newEndList = { ...endList, taskIds: endTaskIds }
  return { ...Lists, [newStartList.id]: newStartList, [newEndList.id]: newEndList }
}