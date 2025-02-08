import { pipeline } from "@xenova/transformers";

let embedder: any = null;

export async function getEmbedder() {
  if (!embedder) {
    try {
      embedder = await pipeline("feature-extraction", "sentence-transformers/all-MiniLM-L6-v2");
    } catch (err) {
      console.error("Error initializing embedder:", err);
      throw err;
    }
  }
  return embedder;
}

export async function embedText(text: string): Promise<number[]> {
  const extractor = await getEmbedder();
  try {
    const result = await extractor(text, { pooling: "mean", normalize: true });
    return Array.from(result.data);
  } catch (err) {
    console.error("Error embedding text:", err);
    throw err;
  }
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const extractor = await getEmbedder();
  try {
    const results = await extractor(texts, { pooling: "mean", normalize: true });
    return results.data.map((emb: any) => Array.from(emb));
  } catch (err) {
    console.error("Error embedding texts:", err);
    throw err;
  }
}
