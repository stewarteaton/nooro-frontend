"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationProps {
  taskText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmation({
  taskText,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-amber-400">
        <AlertTriangle className="w-5 h-5" />
        <span className="font-medium">Delete Task</span>
      </div>

      <p className="text-gray-300">
        Are you sure you want to delete this task? This action cannot be undone.
      </p>

      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
        <p className="text-gray-400 text-sm font-medium">Task to delete:</p>
        <p className="text-gray-300 mt-1">
          {taskText.length > 60 ? `${taskText.substring(0, 60)}...` : taskText}
        </p>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Delete Task
        </Button>
      </div>
    </div>
  );
}
