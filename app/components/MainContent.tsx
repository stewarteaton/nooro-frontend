"use client";

import { Check, Trash2, ClipboardList, Edit, CirclePlus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { Task } from "@/types";

interface MainContentProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (task: Task) => void;
}

export function MainContent({
  tasks,
  onEditTask,
  onToggleTask,
  onDeleteTask,
}: MainContentProps) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.isCompleted).length;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent-blue-light)] font-medium">
            Tasks
          </span>
          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
            {total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent-purple)] font-medium">
            Completed
          </span>
          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
            {completed} of {total}
          </span>
        </div>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center py-16 text-gray-400">
          <div className="w-16 h-16 ">
            <ClipboardList className="w-full h-full" />
          </div>
          <p className="text-lg text-gray-400">
            You don't have any tasks registered yet
          </p>
          <p className="text-base text-gray-600">
            Create tasks and organize your to-do items
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEditTask={onEditTask}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </>
  );
}
