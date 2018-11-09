const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook Dinner" }
  },
  Lists: {
    "list-1": {
      id: "list-1",
      title: "To- do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    },
    "list-2": {
      id: "list-2",
      title: "In Progress",
      taskIds: []
    }
    ,
    "list-3": {
      id: "list-3",
      title: "done",
      taskIds: []
    }
  },
  listOrder: ["list-1", "list-2", "list-3"]
};

export default initialData;
