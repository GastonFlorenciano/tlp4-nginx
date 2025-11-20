import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  titulo: string;
  descripcion: string;
  estado: 'Pendiente' | 'Completada';
}

const taskSchema = new Schema<ITask>({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  estado: { type: String, enum: ['Pendiente', 'Completada'], default: 'Pendiente' }
}, { timestamps: true });

export default mongoose.model<ITask>('Task', taskSchema);
