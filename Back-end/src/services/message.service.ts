import { Request, Response, NextFunction } from "express-serve-static-core";
import { CreateQueryDto } from "../dtos/CreateQuery.dto";
import { message } from "../types/response";
import { callExternalLLM } from "./llm.service";

// export function sendMessage(req: Request, res: Response, next: NextFunction) {
//     res.send('Hello, LawGPT!');
// }

export async function createQuery(
  req: Request<{}, {}, CreateQueryDto>,
  res: Response<message>,
) {
  // res.send(req.body.query);

  try {
    // const externalResponse = await callExternalLLM(req.body.query);

    return res
      .status(200)
      .json({ reply: "This is a mock response for the query." });
  } catch (error) {
    res.status(500).json({ reply: "Failed to process the query" });
  }
}
