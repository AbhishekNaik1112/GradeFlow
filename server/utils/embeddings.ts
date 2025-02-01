import { pipeline } from '@xenova/transformers';

let embedder: any = null;

export async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline('embeddings', 'Xenova/all-MiniLM-L6-v2');
  }
  return embedder;
}

export async function embedText(text: string): Promise<number[]> {
  const embedder = await getEmbedder();
  const result = await embedder(text);
  return result.data;
}

export async function embedDocuments(texts: string[]): Promise<number[][]> {
  const embedder = await getEmbedder();
  const results = await embedder(texts);
  return results.map((res: any) => res.data);
}
