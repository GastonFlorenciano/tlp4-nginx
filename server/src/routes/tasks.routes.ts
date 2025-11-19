import { Router } from 'express';
import Task, { ITask } from '../models/Task.js';

const router = Router();

// Listar todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo tareas', error: err });
  }
});

// Crear tarea
router.post('/', async (req, res) => {
  try {
    const task: ITask = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: 'Error creando tarea', error: err });
  }
});

// Actualizar tarea
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Error actualizando tarea', error: err });
  }
});

// Eliminar tarea
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Error eliminando tarea', error: err });
  }
});

export default router;
