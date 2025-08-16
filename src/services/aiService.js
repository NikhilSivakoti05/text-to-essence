const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export const generateSummary = async (text, prompt) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "AI Text Summarizer",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
        "messages": [
          {
            "role": "system",
            "content": "You are an expert at processing and summarizing text content. Follow the user's instructions precisely and provide clear, well-structured summaries."
          },
          {
            "role": "user",
            "content": `Please process the following text according to these instructions: "${prompt}"\n\nText to process:\n${text}`
          }
        ],
        "temperature": 0.7,
        "max_tokens": 2000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error("No response generated");
    }
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary. Please try again.");
  }
};