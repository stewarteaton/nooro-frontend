import React from "react";
import { Check, Edit, Trash2 } from "lucide-react";
import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onEditTask: (task: Task) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (task: Task) => void;
}

export const TaskCard = ({
  task,
  onEditTask,
  onToggleTask,
  onDeleteTask,
}: TaskCardProps) => {
  return (
    <div
      key={task.id}
      className="flex items-center gap-4 bg-[var(--gray-secondary)] p-4 rounded-lg hover:cursor-pointer"
      onClick={() => onEditTask(task)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents the card click from firing
          onToggleTask(task.id);
        }}
        className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
          task.isCompleted
            ? "bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/80"
            : "border-2 border-[var(--accent-blue-light)] hover:border-[var(--accent-blue-light)]/80"
        }`}
      >
        {task.isCompleted && <Check className="w-3 h-3 text-white" />}
      </button>
      <div className="flex items-center gap-3 flex-1">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: task.color }}
        />
        <p
          className={`${
            task.isCompleted ? "text-gray-500 line-through" : "text-gray-300"
          }`}
        >
          {task.title}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTask(task);
          }}
          className="text-gray-400 hover:text-red-400 transition-colors p-1 hover:cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
