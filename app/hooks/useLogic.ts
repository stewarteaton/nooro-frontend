import { Task, TaskData, ViewEnum } from "@/types";
import React, { useState } from "react";

export const useLogic = ({
  addTask,
  editTask,
  toggleTask,
  deleteTask,
}: {
  addTask: (text: string, color: string) => void;
  editTask: (
    id: string,
    updates: { text: string; completed: boolean; color: string }
  ) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}) => {
  const [currentView, setCurrentView] = useState<ViewEnum>(ViewEnum.LIST);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCreateTask = (taskData: TaskData) => {
    addTask(taskData.text, taskData.color);
    setCurrentView(ViewEnum.LIST);
  };

  const handleEditTask = (taskData: {
    text: string;
    completed: boolean;
    color: string;
  }) => {
    if (selectedTask) {
      editTask(selectedTask.id, {
        text: taskData.text,
        completed: taskData.completed,
        color: taskData.color,
      });
      setCurrentView(ViewEnum.LIST);
      setSelectedTask(null);
    }
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    }
  };

  const openEditView = (task: Task) => {
    setSelectedTask(task);
    setCurrentView(ViewEnum.EDIT);
  };

  const openDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const goBack = () => {
    setCurrentView(ViewEnum.LIST);
    setSelectedTask(null);
  };

  return {
    setIsDeleteModalOpen,
    setSelectedTask,
    setCurrentView,
    currentView,
    selectedTask,
    isDeleteModalOpen,
    handleCreateTask,
    handleEditTask,
    handleDeleteTask,
    openEditView,
    openDeleteModal,
    goBack,
  };
};
