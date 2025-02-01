import mongoose, { Document, Schema } from "mongoose";

interface ICodeSnippet extends Document {
  title: string;
  language: string;
  code: string;
  description: string;
  name: string;
  email: string;
}

const CodeSnippetSchema: Schema<ICodeSnippet> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const CodeSnippet = mongoose.model<ICodeSnippet>(
  "CodeSnippet",
  CodeSnippetSchema,
);

export default CodeSnippet;
