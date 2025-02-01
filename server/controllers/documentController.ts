import { Request, Response } from "express";
import { DocumentModel } from "../models/documents";
import { embedText } from "../utils/embeddings";
import { cosineSimilarity } from "../utils/same";
import { v4 as uuidv4 } from "uuid";

export async function addDocuments(req: Request, res: Response): Promise<void> {
  try {
    const { title, content, type, date, deadline } = req.body;
    if (!title || !content || !type || !date) {
      res
        .status(400)
        .json({ error: "title, content, type, and date are required." });
      return;
    }
    const embedding = await embedText(`${title} ${content}`);

    const newDoc = new DocumentModel({
      id: uuidv4(),
      title,
      content,
      type,
      deadline: deadline || null,
      embedding,
    });

    await newDoc.save();

    res
      .status(201)
      .json({ message: "Document added successfully", document: newDoc });
  } catch (error) {
    console.error("Error in addDocument:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function searchDocuments(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { query, type } = req.body;
    if (!query) {
      res.status(400).json({ error: "Query is required." });
      return;
    }

    const queryEmbedding = await embedText(query);
    let documents = await DocumentModel.find();

    if (type) {
      documents = documents.filter((doc) => doc.type === type);
    }

    const scoredDocs = documents.map((doc) => {
      const keywordMatch =
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.content.toLowerCase().includes(query.toLowerCase());

      const score = cosineSimilarity(queryEmbedding, doc.embedding);
      return { ...doc.toObject(), score: keywordMatch ? score + 0.1 : score };
    });

    scoredDocs.sort((a, b) => b.score - a.score);
    res.json({ results: scoredDocs.slice(0, 5) });
  } catch (error) {
    console.error("Error in searchDocuments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getDocuments(req: Request, res: Response): Promise<void> {
  try {
    const documents = await DocumentModel.find();
    res.json({ documents });
  } catch (error) {
    console.error("Error in getDocuments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
