"use client";
import { useState } from "react";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const useConnect = () => {
  // Mock data for now - will be replaced with backend calls
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      completed: false,
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      completed: false,
      createdAt: new Date("2024-01-02"),
    },
    {
      id: "3",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      completed: false,
      createdAt: new Date("2024-01-03"),
    },
    {
      id: "4",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      completed: true,
      createdAt: new Date("2024-01-04"),
    },
    {
      id: "5",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      completed: true,
      createdAt: new Date("2024-01-05"),
    },
  ]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (
    id: string,
    updates: { text: string; completed: boolean }
  ) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    return { total, completed };
  };

  return {
    tasks,
    addTask,
    editTask,
    toggleTask,
    deleteTask,
    getTaskStats,
  };
};
