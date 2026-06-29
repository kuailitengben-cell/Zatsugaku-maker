import { GoogleGenAI, Type } from "@google/genai";
import { manualTriviaList, TriviaItem } from "../data/manualTrivia.ts";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

/**
 * 雑学を取得する関数。
 * 50%の確率で手動リストから、50%の確率でAIから取得します（リストが空の場合はAIのみ）。
 */
export async function getCombinedTrivia(): Promise<TriviaItem> {
  // 50%の確率、またはAIキーがない場合に手動リストを使用
  const useManual = Math.random() > 0.5 || !process.env.GEMINI_API_KEY;

  if (useManual && manualTriviaList.length > 0) {
    const randomIndex = Math.floor(Math.random() * manualTriviaList.length);
    return manualTriviaList[randomIndex];
  }

  return getAiTrivia();
}

async function getAiTrivia(): Promise<TriviaItem> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "誰もが驚くような、興味深く、かつ正確な雑学を1つ教えてください。日本語でお願いします。既存の有名な雑学（キリンの首の骨など）は避けてください。",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "雑学の核心を一言で表したもの",
            },
            detail: {
              type: Type.STRING,
              description: "その雑学に関する詳細な説明",
            },
          },
          required: ["title", "detail"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // AIが失敗した場合は予備として手動リストから取得
    if (manualTriviaList.length > 0) {
      return manualTriviaList[Math.floor(Math.random() * manualTriviaList.length)];
    }

    return {
      title: "雑学の取得に失敗しました",
      detail: "申し訳ありませんが、現在は雑学を表示できません。ページを更新してみてください。"
    };
  }
}
