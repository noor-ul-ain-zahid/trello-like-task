import React from "react";
import Task from "../../Task/Task";

const TaskList=(props)=>{
    return props.tasks.map((task, index) => (
      <Task
        key={task.id}
        task={task}
        index={index}
        edit={props.edit}
        delete={props.delete}
        listId={props.listId}
      />
    ));
}
export default TaskList;
 