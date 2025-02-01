import mongoose, { Schema, Document as MongooseDocument } from 'mongoose';

export type DocumentType = 'assignment' | 'material';

export interface Document {
  id: string;
  title: string;
  content: string;
  type: DocumentType;
  deadline?: string;
  embedding: number[];
}

const documentSchema = new Schema<Document>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['assignment', 'material'], required: true },
  deadline: { type: String, default: null },
  embedding: { type: [Number], required: true },
});

const DocumentModel = mongoose.model<Document>('Document', documentSchema);

export { DocumentModel };
