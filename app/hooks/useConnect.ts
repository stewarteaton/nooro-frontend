"use client";
import { Task } from "@/types";
import { useState } from "react";

export const useConnect = () => {
  // Available colors for tasks


  // Mock data for now - will be replaced with backend calls
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      completed: false,
      createdAt: new Date("2024-01-01"),
      color: "#3b82f6",
    },
    {
      id: "2",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      completed: false,
      createdAt: new Date("2024-01-02"),
      color: "#22c55e",
    },
    {
      id: "3",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      completed: false,
      createdAt: new Date("2024-01-03"),
      color: "#8b5cf6",
    },
    {
      id: "4",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      completed: true,
      createdAt: new Date("2024-01-04"),
      color: "#f97316",
    },
    {
      id: "5",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      completed: true,
      createdAt: new Date("2024-01-05"),
      color: "#eab308",
    },
  ]);

  const addTask = (text: string, color: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
      color,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const editTask = (
    id: string,
    updates: { text: string; completed: boolean; color: string }
  ) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
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
