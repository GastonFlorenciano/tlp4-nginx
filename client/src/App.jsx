import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "./api/tasksRequests";
import {
  FaEdit,
  FaRegTrashAlt,
  FaCheck,
  FaTimes,
  FaClipboardList
} from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    titulo: "",
    descripcion: "",
    estado: "",
  });
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    estado: "Pendiente",
  });

  const handleDelete = async (id) => {
    await deleteTask(id);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleUpdate = async (id, updates) => {
    const updatedTask = await updateTask(id, updates);
    const newTasks = tasks.map((task) =>
      task._id === id ? updatedTask : task,
    );
    setTasks(newTasks);
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditFormData({
      titulo: task.titulo,
      descripcion: task.descripcion,
      estado: task.estado,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    await handleUpdate(id, editFormData);
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const handleCreate = async (newTask) => {
    const task = await createTask(newTask);
    setTasks([...tasks, task]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    async function fetchTasks() {
      const tasks = await getTasks();
      setTasks(tasks);
    }
    fetchTasks();
  }, [handleDelete, handleUpdate, handleCreate]);

  return (
    <>
      <div className="min-h-screen max-h-screen grid grid-cols-8 grid-rows-8 bg-slate-500">
        <div className="col-start-2 col-span-5 m-4 flex justify-center items-center gap-2 animate-fadeIn">
          <h1 className="h-fit text-6xl text-white font-bold">Mis tareas</h1>
          <FaClipboardList size={60} className="text-white p-2" />
        </div>
        <div className="bg-slate-300 col-start-2 col-span-5 row-start-2 row-span-6 m-4 p-4 rounded-lg shadow-md overflow-y-auto flex justify-center items-center flex-wrap animate-fadeIn ">
          {tasks ? (
            tasks.map((task) => (
              <div
                className="bg-white w-52 h-52 m-4 p-4 rounded-lg shadow-lg flex flex-col justify-center items-start gap-4 animate-fadeIn"
                key={task._id}
              >
                {editingTaskId === task._id ? (
                  <form
                    onSubmit={(e) => handleEditSubmit(e, task._id)}
                    className="w-full h-full flex flex-col justify-between"
                  >
                    <input
                      type="text"
                      name="titulo"
                      value={editFormData.titulo}
                      onChange={handleEditChange}
                      className="w-full p-1 mb-1 border border-gray-300 rounded"
                      required
                    />
                    <textarea
                      name="descripcion"
                      value={editFormData.descripcion}
                      onChange={handleEditChange}
                      className="w-full p-1 mb-1 border border-gray-300 rounded text-sm"
                      rows="3"
                      required
                    />
                    <select
                      name="estado"
                      value={editFormData.estado}
                      onChange={handleEditChange}
                      className="w-full p-1 mb-2 border border-gray-300 rounded text-sm"
                      required
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Completada">Completada</option>
                    </select>
                    <div className="h-1/4 p-1 gap-2 w-full flex justify-between items-center">
                      <button
                        type="submit"
                        className="bg-green-500 h-full p-2 w-1/2 cursor-pointer text-white rounded-lg hover:bg-green-600 transition-all flex items-center justify-center"
                      >
                        <FaCheck />
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="bg-red-500 h-full p-2 w-1/2 cursor-pointer text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex flex-col gap-4 h-3/4">
                      <h2 className="font-bold text-2xl">{task.titulo}</h2>
                      <p>{task.descripcion}</p>
                      <p>
                        Estado: <b>{task.estado}</b>
                      </p>
                    </div>
                    <div className="h-1/4 p-1 gap-2 w-full flex justify-between items-center">
                      <FaEdit
                        className="bg-blue-400 h-full p-2 w-1/2 cursor-pointer text-white rounded-lg hover:bg-blue-500 transition-all"
                        onClick={() => handleEditClick(task)}
                      />
                      <FaRegTrashAlt
                        className="bg-red-400 h-full p-2 w-1/2 cursor-pointer text-white rounded-lg hover:bg-red-500 transition-all"
                        onClick={() => handleDelete(task._id)}
                      />
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="bg-slate-300 col-start-2 col-span-5 row-start-2 row-span-6 m-4 p-4 rounded-lg shadow-lg flex justify-center items-center">
              <p className="font-bold text-3xl">AÚN NO HAY TAREAS</p>
            </div>
          )}
        </div>
        <div className="bg-slate-300 col-start-7 col-span-2 row-start-2 row-span-4 m-4 p-4 rounded-lg shadow-lg animate-fadeIn">
          <div className="border-b-2">
            <h1 className="text-center text-lg font-bold">
              Crea una nueva tarea
            </h1>
          </div>
          <form
            className="bg-white shadow-md rounded-lg p-2 my-3  flex flex-col justify-between"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate(formData);
              setFormData({ titulo: "", descripcion: "", estado: "pendiente" });
            }}
          >
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Título"
                className="w-full p-2 mb-2 rounded border border-gray-300"
                required
              />
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
                className="w-full p-2 mb-2 rounded border border-gray-300"
                required
              />
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full p-2 mb-2 rounded border border-gray-300"
                required
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Crear Tarea
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
