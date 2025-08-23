"use client";
import Image from "next/image";
import { useConnect } from "./hooks/useConnect";
import { Plus, Check, Trash2, ClipboardList } from "lucide-react";

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask, getTaskStats } = useConnect();
  const { total, completed } = getTaskStats();

  return (
    <div className="min-h-screen  text-white">
      {/* Top black section with button positioned halfway down */}
      <div className="relative h-32 sm:h-48 bg-black">
        {/* Header - centered in the top black section */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/assets/Logo@2x.png"
            alt="Todo App Logo"
            width={120}
            height={40}
            className="h-8 w-auto sm:h-10 md:h-12 lg:h-14"
            sizes="(max-width: 640px) 96px, (max-width: 768px) 120px, (max-width: 1024px) 144px, 168px"
            priority
          />
        </div>

        {/* Create Task Button - overlays the black section, bottom edge of black section goes through middle of button */}
        <div className="absolute w-full max-w-4xl mx-auto px-8 -bottom-6 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() =>
              addTask("New task added at " + new Date().toLocaleTimeString())
            }
            className="flex w-full items-center justify-center gap-3 bg-[var(--accent-blue-dark)] hover:bg-[var(--accent-blue-dark)]/80 px-6 py-3 rounded-lg transition-colors shadow-lg text-center hover:cursor-pointer"
          >
            <span className="text-white font-medium">Create Task</span>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-[var(--accent-blue-dark)]" />
            </div>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="px-8 py-6 max-w-4xl mx-auto mt-14">
        {/* Task Summary */}
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
              {completed} de {total}
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
              <div
                key={task.id}
                className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-colors ${
                    task.completed
                      ? "bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/80"
                      : "border-2 border-[var(--accent-blue-light)] hover:border-[var(--accent-blue-light)]/80"
                  }`}
                >
                  {task.completed && <Check className="w-3 h-3 text-white" />}
                </button>
                <p
                  className={`flex-1 ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-300"
                  }`}
                >
                  {task.text}
                </p>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
