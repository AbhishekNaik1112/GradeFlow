import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

export interface Task {
  title: string;
  content: string;
  deadline?: string;
  type: string;
  userEmail: string;
  embedding: number[];
}

const taskSchema = new Schema<Task>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  deadline: { type: String, default: null },
  type: { type: String, enum: ["assignment", "material"], required: true },
  userEmail: { type: String, required: true },
  embedding: { type: [Number], required: true },
});

const DocumentModel = mongoose.model<Task>("tasks", taskSchema);

export { DocumentModel };
