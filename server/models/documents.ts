import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

export type DocumentType = "assignment" | "material";
export type statusType = "complete" | "incomplete";

export interface Document {
  title: string;
  content: string;
  deadline: string;
  type: DocumentType;
  userEmail: string;
  status: statusType;
  embedding: number[];
}

const documentSchema = new Schema<Document>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  deadline: { type: String, required: true },
  type: { type: String, enum: ["assignment", "material"], required: true },
  userEmail: { type: String, required: true },
  status: {
    type: String,
    enum: ["incomplete", "complete"],
    default: "incomplete",
  },
  embedding: { type: [Number], required: true },
});

const DocumentModel = mongoose.model<Document>("Document", documentSchema);

export { DocumentModel };
