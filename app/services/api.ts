const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = {
  // Tasks
  getTasks: async () => {
    console.log("Fetching tasks");
    const response = await fetch(`${API_BASE_URL}/api/tasks`);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  },

  createTask: async (task: { title: string; color: string }) => {
    console.log("Creating task", { task });
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  },

  updateTask: async (
    id: string,
    updates: { title?: string; completed?: boolean; color?: string }
  ) => {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
  },

  deleteTask: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
    return response.json();
  },
};
