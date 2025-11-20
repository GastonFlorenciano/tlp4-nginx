import { fetchAPI } from "./api.js";

// Obtener todas las tareas
export const getTasks = async () => {
  return await fetchAPI("/tasks");
};

// Crear nueva tarea
export const createTask = async (data) => {
  console.log(data)
  return await fetchAPI("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

// Actualizar tarea existente
export const updateTask = async (id, updates) => {
  return await fetchAPI(`/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
};

// Eliminar tarea
export const deleteTask = async (id) => {
  return await fetchAPI(`/tasks/${id}`, {
    method: "DELETE",
  });
};
