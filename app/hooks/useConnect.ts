"use client";
import { Task, ViewEnum } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../services/api";

export const useConnect = () => {
  const queryClient = useQueryClient();

  // UI state
  const [currentView, setCurrentView] = useState<ViewEnum>(ViewEnum.LIST);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch tasks
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: api.getTasks,
  });

  console.log("tasks", tasks);

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: api.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setCurrentView(ViewEnum.LIST);
    },
    onError: (error) => {
      console.error("Error fetching tasks:", error);
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      api.updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setCurrentView(ViewEnum.LIST);
      setSelectedTask(null);
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    },
  });

  // Task operations
  const handleCreateTask = ({
    text,
    color,
  }: {
    text: string;
    color: string;
  }) => {
    createTaskMutation.mutate({ text, color });
  };

  const handleEditTask = (
    id: string,
    updates: { text: string; completed: boolean; color: string }
  ) => {
    updateTaskMutation.mutate({ id, updates });
  };

  const handleToggleTask = (id: string) => {
    updateTaskMutation.mutate({
      id,
      updates: { completed: !tasks.find((t: Task) => t.id === id)?.completed },
    });
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      deleteTaskMutation.mutate(selectedTask.id);
    }
  };

  // UI operations
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

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((task: Task) => task.completed).length;
    return { total, completed };
  };

  const handleTaskSubmit = (taskData: {
    text: string;
    completed: boolean;
    color: string;
  }) => {
    if (currentView === "create") {
      handleCreateTask({ text: taskData.text, color: taskData.color });
    } else if (currentView === "edit" && selectedTask) {
      handleEditTask(selectedTask.id, taskData);
    } else {
      alert("Problem submitting task");
    }
  };

  return {
    // Data
    tasks,
    isLoading,
    error,

    // UI state
    currentView,
    selectedTask,
    isDeleteModalOpen,

    // Task operations
    handleCreateTask,
    handleEditTask,
    handleToggleTask,
    handleDeleteTask,
    handleTaskSubmit,

    // UI operations
    setCurrentView,
    setSelectedTask,
    setIsDeleteModalOpen,
    openEditView,
    openDeleteModal,
    goBack,
    closeDeleteModal,

    // Stats
    getTaskStats,

    // Loading states
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
};
