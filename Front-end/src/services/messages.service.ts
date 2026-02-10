// api/messages.ts
import type QueryMessage from "../classes/QueryMessage";
import type Response from "../classes/Response";

export async function sendMessage(content: QueryMessage): Promise<Response> {
  const response = await fetch("http://localhost:3000/api/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  });

  if (!response.ok) {
    throw new Error("Request failed with status");
  }

  return await response.json();
}

export default sendMessage;
