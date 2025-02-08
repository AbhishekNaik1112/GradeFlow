import { Request, Response } from "express";
import { DocumentModel } from "../models/documents";
import { embedText } from "../utils/embeddings";
import { cosineSimilarity } from "../utils/same";

export async function addDocument(req: Request, res: Response): Promise<void> {
  try {
    const { title, content, deadline, type, userEmail, status } = req.body;
    if (!title || !content || !deadline || !userEmail || !type || !status) {
      res.status(400).json({
        error:
          "title, content, type, deadline, userEmail, and status are required.",
      });
      return;
    }
    const fullEmbedding = await embedText(`${title} ${content}`);
    const titleEmbedding = await embedText(title);
    const newDoc = new DocumentModel({
      title,
      content,
      deadline: deadline || null,
      userEmail,
      status,
      type,
      embedding: fullEmbedding,
      titleEmbedding: titleEmbedding,
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

export async function updateDocument(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const { title, content, deadline, type, userEmail, status } = req.body;
    const doc = await DocumentModel.findById(id);
    if (!doc) {
      res.status(404).json({ error: "Document not found." });
      return;
    }
    if (title) doc.title = title;
    if (content) doc.content = content;
    if (deadline) doc.deadline = deadline;
    if (type) doc.type = type;
    if (userEmail) doc.userEmail = userEmail;
    if (status) doc.status = status;
    if (title || content) {
      doc.embedding = await embedText(`${doc.title} ${doc.content}`);
      doc.titleEmbedding = await embedText(doc.title);
    }
    await doc.save();
    res
      .status(200)
      .json({ message: "Document updated successfully", document: doc });
  } catch (error) {
    console.error("Error in updateDocument:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteDocument(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const doc = await DocumentModel.findByIdAndDelete(id);
    if (!doc) {
      res.status(404).json({ error: "Document not found." });
      return;
    }
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error in deleteDocument:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function searchDocuments(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { query, userEmail, type } = req.body;
    if (!query || !userEmail) {
      res.status(400).json({ error: "Query and userEmail are required." });
      return;
    }
    const queryFullEmbedding = await embedText(query);
    const queryTitleEmbedding = await embedText(query);
    const filter: any = { userEmail };
    if (type) filter.type = type;
    const documents = await DocumentModel.find(filter);
    const lowerQuery = query.toLowerCase();
    const similarityThreshold = 0.1;
    const scoredDocs = documents
      .map((doc) => {
        if (
          !doc.embedding ||
          !doc.titleEmbedding ||
          !Array.isArray(doc.embedding) ||
          !Array.isArray(doc.titleEmbedding)
        ) {
          return {
            ...doc.toObject(),
            score: 0,
            keywordMatch: false,
            similarityScore: 0,
          };
        }
        const keywordMatch =
          doc.title.toLowerCase().includes(lowerQuery) ||
          doc.content.toLowerCase().includes(lowerQuery);
        const titleSim = cosineSimilarity(
          queryTitleEmbedding,
          doc.titleEmbedding
        );
        const fullSim = cosineSimilarity(queryFullEmbedding, doc.embedding);
        const combinedScore = 0.7 * titleSim + 0.3 * fullSim;
        const finalScore = keywordMatch ? combinedScore * 1.1 : combinedScore;
        return {
          ...doc.toObject(),
          score: finalScore,
          keywordMatch,
          similarityScore: combinedScore,
        };
      })
      .filter(
        (doc) => doc.keywordMatch || doc.similarityScore >= similarityThreshold
      );
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
