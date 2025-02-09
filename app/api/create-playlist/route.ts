import OpenAI from "openai";
import { NextResponse } from "next/server";

/**
 *  Majority of source code altered from OpenAI documentation pages.
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is missing from response" },
        { status: 400 }
      );
    }
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Generate a 25 song playlist with only the song title and author based on the following keywords: ${prompt}`,
      max_tokens: 500,
    });

    return NextResponse.json({ playlist: response.choices[0]?.text.trim() });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
