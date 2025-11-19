import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'completada';
}

const taskSchema = new Schema<ITask>({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  estado: { type: String, enum: ['pendiente', 'completada'], default: 'pendiente' }
}, { timestamps: true });

export default mongoose.model<ITask>('Task', taskSchema);
