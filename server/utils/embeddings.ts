import { pipeline } from "@xenova/transformers";

let embedder: any = null;

export async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}

export async function embedText(text: string): Promise<number[]> {
  const extractor = await getEmbedder();
  const result = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(result.data);
}

export async function embedDocuments(texts: string[]): Promise<number[][]> {
  const extractor = await getEmbedder();
  const results = await extractor(texts, { pooling: "mean", normalize: true });
  return results.map((res: any) => Array.from(res.data));
}
