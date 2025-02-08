import { Request, Response } from "express";
import { DocumentModel } from "../models/documents";
import { embedText, embedTexts } from "../utils/embeddings";
import { cosineSimilarity } from "../utils/same";

export async function addDocuments(req: Request, res: Response): Promise<void> {
  try {
    const { title, content, deadline, type, userEmail, status } = req.body;
    if (!title || !content || !deadline || !userEmail || !type || !status) {
      res
        .status(400)
        .json({
          error:
            "title, content, type, deadline, userEmail, and status are required.",
        });
      return;
    }
    const embedding = await embedText(`${title} ${content}`);
    const newDoc = new DocumentModel({
      title,
      content,
      deadline: deadline || null,
      userEmail,
      status,
      type,
      embedding,
    });
    await newDoc.save();
    res
      .status(201)
      .json({ message: "Document added successfully", document: newDoc });
  } catch (error) {
    console.error("Error in addDocuments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addDocumentsBulk(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const documents = req.body;
    if (!Array.isArray(documents) || documents.length === 0) {
      res
        .status(400)
        .json({ error: "A non-empty array of documents is required." });
      return;
    }
    const texts = documents.map((doc) => `${doc.title} ${doc.content}`);
    const embeddings = await embedTexts(texts);
    const docsToSave = documents.map(
      (doc, i) =>
        new DocumentModel({
          title: doc.title,
          content: doc.content,
          deadline: doc.deadline || null,
          userEmail: doc.userEmail,
          status: doc.status,
          type: doc.type,
          embedding: embeddings[i],
        })
    );
    await Promise.all(docsToSave.map((doc) => doc.save()));
    res
      .status(201)
      .json({
        message: "Bulk documents added successfully",
        count: docsToSave.length,
      });
  } catch (error) {
    console.error("Error in addDocumentsBulk:", error);
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
    const queryEmbedding = await embedText(query);
    const filter: any = { userEmail };
    if (type) {
      filter.type = type;
    }
    const documents = await DocumentModel.find(filter);
    const lowerQuery = query.toLowerCase();
    const similarityThreshold = 0.1;
    const scoredDocs = documents
      .map((doc) => {
        if (!doc.embedding || !Array.isArray(doc.embedding)) {
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
        const similarityScore = cosineSimilarity(queryEmbedding, doc.embedding);
        const finalScore = keywordMatch
          ? similarityScore * 1.1
          : similarityScore;
        return {
          ...doc.toObject(),
          score: finalScore,
          keywordMatch,
          similarityScore,
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
