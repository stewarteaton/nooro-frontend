"use client";
import { Task, TaskUpdate, ViewEnum } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../services/api";
import { toast } from "sonner";

export const useConnect = () => {
  const queryClient = useQueryClient();

  // UI state
  const [currentView, setCurrentView] = useState<ViewEnum>(ViewEnum.LIST);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch tasks
  const {
    data: tasks = [],
    isLoading: isLoadingTasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: api.getTasks,
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: api.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setCurrentView(ViewEnum.LIST);
      toast.success("Task created successfully!");
    },
    onError: (error) => {
      console.error("Error creating task:", error);
      toast.error(error.message || "Failed to create task");
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: TaskUpdate }) =>
      api.updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setCurrentView(ViewEnum.LIST);
      setSelectedTask(null);
      toast.success("Task updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating task:", error);
      toast.error(error.message || "Failed to update task");
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
      toast.success("Task deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
      toast.error(error.message || "Failed to delete task");
    },
  });

  const handleToggleTask = (id: string) => {
    const task = tasks.find((t: Task) => t.id === id);
    if (!task) {
      return alert("Task not found");
    }
    updateTaskMutation.mutate({
      id,
      updates: {
        isCompleted: !task.isCompleted,
        title: task.title,
        color: task.color,
      },
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
    const completed = tasks.filter((task: Task) => task.isCompleted).length;
    return { total, completed };
  };

  const handleTaskSubmit = (taskData: {
    title: string;
    isCompleted: boolean;
    color: string;
  }) => {
    if (currentView === "create") {
      createTaskMutation.mutate({
        title: taskData.title,
        color: taskData.color,
      });
    } else if (currentView === "edit" && selectedTask) {
      updateTaskMutation.mutate({ id: selectedTask.id, updates: taskData });
    }
  };

  const isLoading =
    createTaskMutation.isPending ||
    deleteTaskMutation.isPending ||
    isLoadingTasks;

  return {
    // Data
    tasks,
    isLoadingTasks,
    error,

    // UI state
    currentView,
    selectedTask,
    isDeleteModalOpen,

    // Task operations
    handleTaskSubmit,
    handleToggleTask,
    handleDeleteTask,

    // UI operations
    openEditView,
    openDeleteModal,
    goBack,
    closeDeleteModal,
    setCurrentView,
    setSelectedTask,
    setIsDeleteModalOpen,

    // Stats
    getTaskStats,

    // Loading states
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
    isLoading,
  };
};
