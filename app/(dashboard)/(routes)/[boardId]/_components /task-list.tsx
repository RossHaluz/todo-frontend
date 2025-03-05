import { Task } from "@/lib/types";
import React from "react";
import TaskListItem from "./task-list-item";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="flex flex-col gap-4">
     {tasks?.map(item => {
        return <TaskListItem key={item?.id} item={item}/>;
     })}
    </div>
  );
};

export default TaskList;
