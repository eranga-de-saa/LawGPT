import "dotenv/config";
import fs from "fs";
import csv from "csv-parser";

import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { InferenceClient } from "@huggingface/inference";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";

const { PINECONE_API_KEY, PINECONE_INDEX, HF_API_KEY, CSV_PATH } = process.env;

if (!PINECONE_API_KEY || !PINECONE_INDEX || !HF_API_KEY || !CSV_PATH) {
  throw new Error("Missing environment variables");
}

/* ---------- Clients ---------- */

const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

const index = pinecone.index(PINECONE_INDEX);

const hf = new InferenceClient(HF_API_KEY);

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 128,
});

/* ---------- CSV Loader ---------- */

async function readCsvToDocuments(csvPath: string): Promise<Document[]> {
  return new Promise((resolve, reject) => {
    const docs: Document[] = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        const text = `${row.case_title} ${row.case_text}`;

        docs.push(
          new Document({
            pageContent: text,
            metadata: {
              case_id: row.case_id ?? undefined,
              outcome: row.case_outcome ?? undefined,
            },
          }),
        );
      })
      .on("end", () => resolve(docs))
      .on("error", reject);
  });
}

/* ---------- Embedding ---------- */

async function embed(text: string): Promise<number[]> {
  const res = await hf.featureExtraction({
    model: "BAAI/bge-base-en-v1.5",
    inputs: text,
  });

  return res as number[];
}

/* ---------- Seeder ---------- */

async function loadData() {
  console.log("Reading CSV...");
  const docs = await readCsvToDocuments(CSV_PATH!);
  console.log(`Loaded ${docs.length} documents`);

  const chunks = await splitter.splitDocuments(docs);
  console.log(`Split into ${chunks.length} chunks`);

  //   const vectors: PineconeRecord[] = []

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await embed(chunks[i]?.pageContent!);

    const record: PineconeRecord = {
      id: `doc-${i}`,
      values: embedding,
      metadata: {
        text: chunks[i]?.pageContent!,
        case_id: chunks[i]?.metadata?.case_id ?? "",
        outcome: chunks[i]?.metadata?.outcome ?? "",
      },
    };

    await index.upsert({ records: [record] });
  }

  //   console.log("Upserting to Pinecone...")
  //   await index.upsert({records: vectors})

  console.log("Seeding completed");
}

loadData().catch(console.error);
