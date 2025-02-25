import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const api_key = process.env.GOOGLE_API_KEY;

if (api_key) {
  const genAI = new GoogleGenerativeAI(api_key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Explain how AI works";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
} else {
  console.log("api_key is missing");
}
