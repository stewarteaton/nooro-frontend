"use client";
import { useState } from "react";
import { useConnect } from "./hooks/useConnect";
import { Modal } from "./components/Modal";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { TaskForm } from "./components/TaskForm";
import { DeleteConfirmation } from "./components/DeleteConfirmation";
import { ViewEnum, Task } from "@/types/index";
import { useLogic } from "./hooks/useLogic";

export default function Home() {
  const { tasks, addTask, editTask, toggleTask, deleteTask, getTaskStats } =
    useConnect();

  const {
    setCurrentView,
    setIsDeleteModalOpen,
    setSelectedTask,
    currentView,
    selectedTask,
    isDeleteModalOpen,
    handleCreateTask,
    handleEditTask,
    handleDeleteTask,
    openEditView,
    openDeleteModal,
    goBack,
  } = useLogic({
    addTask,
    editTask,
    toggleTask,
    deleteTask,
  });

  return (
    <div className="min-h-screen  text-white">
      <Header
        setIsCreateEditFormOpen={() => setCurrentView(ViewEnum.CREATE)}
        currentView={currentView}
      />

      {/* Conditionally render MainContent or TaskFormView in the same space */}
      <div className="px-8 py-6 max-w-4xl mx-auto mt-14">
        {currentView === "list" ? (
          <MainContent
            tasks={tasks}
            onCreateTask={() => setCurrentView(ViewEnum.CREATE)}
            onEditTask={openEditView}
            onToggleTask={toggleTask}
            onDeleteTask={openDeleteModal}
          />
        ) : (
          <TaskForm
            task={currentView === "edit" ? selectedTask : null}
            mode={currentView}
            onSubmit={
              currentView === "create" ? handleCreateTask : handleEditTask
            }
            onCancel={goBack}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTask(null);
        }}
        title="Confirm Deletion"
        size="sm"
      >
        <DeleteConfirmation
          taskText={selectedTask?.text || ""}
          onConfirm={handleDeleteTask}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setSelectedTask(null);
          }}
        />
      </Modal>
    </div>
  );
}
