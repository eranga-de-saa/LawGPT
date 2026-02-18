import { Pinecone } from "@pinecone-database/pinecone";
import { InferenceClient } from "@huggingface/inference";
import { getHFClient, getPineconeIndex } from "../clients/clients";

export async function retrieveContext(
  query: string,
  topK = 5,
): Promise<string> {
  const hf = getHFClient();
  const index = getPineconeIndex();

  /* ---------- Embedding ---------- */
  const embedding = (await hf.featureExtraction({
    model: "BAAI/bge-base-en-v1.5",
    inputs: query,
  })) as number[];

  /* ---------- pinecone query ---------- */
  const result = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
  });

  console.log("Pinecone query result:", result);

  /* ---------- text extraction ---------- */
  const texts = result.matches
    ?.map((match) => match.metadata?.text)
    .filter(Boolean);

  // Build context string
  return texts?.join("\n\n") ?? "";
}
