import { retrieveContext } from "./vector.service";
import { getFromCache, setCache } from "./cache.service";
import { getOpenAIClient } from "../clients/clients";

export async function callExternalLLM(query: string): Promise<string> {
  const client = getOpenAIClient();

  // retrieve from cache
  const cachedResponse = await getFromCache(query);
  if (cachedResponse) {
    return cachedResponse;
  }

  //Retrieve relevant document context from Pinecone
  const docContext = await retrieveContext(query);

  const instructions = `You are an AI assistant who knows everything about law and legal cases.
    Use the given context to assist you.
    If the context doesn't include the information you need, 
    answer it based on what you already know.
    Don't expose the source of your information or 
    what context does or doesn't include.
    Format the response using markdown where necessary and don't return images.
    `;

  const input = `START CONTEXT ${docContext} END CONTEXT 
                Question: ${query}`;

  const response = await client.responses.create({
    model: "gpt-5-nano",
    instructions: instructions,
    input: input,
  });

  if (!response) {
    throw new Error("Failed to call LLM API");
  }

  // store in cache
  await setCache(query, response.output_text);

  return response.output_text;

  //   process.env.EXTERNAL_API_KEY as string
}
