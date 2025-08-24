"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Task, TaskUpdate } from "@/types";
import { taskColors } from "@/lib/utils";
import { ArrowLeft, CheckIcon, CirclePlus } from "lucide-react";

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: TaskUpdate) => void;
  onCancel: () => void;
  mode: "create" | "edit";
}

export function TaskForm({ task, onSubmit, onCancel, mode }: TaskFormProps) {
  const [text, setText] = useState("");
  const [isCompleted, setisCompleted] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (task) {
      setText(task.title);
      setisCompleted(task.isCompleted);
      setSelectedColor(task.color);
    } else {
      setSelectedColor(taskColors.get("blue") || "#3b82f6"); // Default to blue
    }
  }, [task, taskColors]);

  useEffect(() => {
    setIsValid(text.trim().length > 0);
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit({ title: text.trim(), isCompleted, color: selectedColor });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <ArrowLeft
        className="w-5 h-5 text-white hover:cursor-pointer"
        onClick={onCancel}
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="task-text"
            className="text-sm font-medium text-[var(--accent-blue-light)]"
          >
            Title
          </label>
          <Input
            id="task-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex. Brush your teeth"
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-[var(--accent-blue-light)]"
            autoFocus
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--accent-blue-light)]">
            Color
          </label>
          <div className="flex gap-3 flex-wrap">
            {[...taskColors.values()].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:cursor-pointer hover:scale-110 ${
                  selectedColor === color
                    ? "border-white scale-110 shadow-lg"
                    : "border-gray-600 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isValid}
          variant="action"
          size="lg"
          className="w-full py-5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2">
            {mode === "create" ? (
              <>
                <p>Add Task</p>
                <CirclePlus className="w-4 h-4" />
              </>
            ) : (
              <>
                <p>Save</p>
                <CheckIcon className="w-5 h-4 font-bold" />
              </>
            )}
          </span>
        </Button>
      </form>
    </div>
  );
}
