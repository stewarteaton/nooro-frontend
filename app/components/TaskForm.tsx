"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "../hooks/useConnect";

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: { text: string; completed: boolean }) => void;
  onCancel: () => void;
  mode: "create" | "edit";
}

export function TaskForm({ task, onSubmit, onCancel, mode }: TaskFormProps) {
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (task) {
      setText(task.text);
      setCompleted(task.completed);
    }
  }, [task]);

  useEffect(() => {
    setIsValid(text.trim().length > 0);
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({ text: text.trim(), completed });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="task-text"
          className="text-sm font-medium text-gray-300"
        >
          Task Description
        </label>
        <Input
          id="task-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your task description..."
          className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-[var(--accent-blue-light)]"
          autoFocus
        />
      </div>

      {mode === "edit" && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="task-completed"
            checked={completed}
            onCheckedChange={(checked) => setCompleted(checked as boolean)}
            className="border-gray-600 data-[state=checked]:bg-[var(--accent-purple)] data-[state=checked]:border-[var(--accent-purple)]"
          />
          <label htmlFor="task-completed" className="text-sm text-gray-300">
            Mark as completed
          </label>
        </div>
      )}

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
          type="submit"
          disabled={!isValid}
          className="bg-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mode === "create" ? "Create Task" : "Update Task"}
        </Button>
      </div>
    </form>
  );
}
