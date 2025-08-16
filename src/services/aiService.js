<<<<<<< HEAD
const API_URL = "https://proxyserver-r7js.onrender.com/proxy";
 // Call your proxy, not OpenRouter
=======
const API_URL = "http://localhost:5000/proxy"; // Call your proxy, not OpenRouter
>>>>>>> 98d024b7b03d022a5cc3a9fdb1df27a4ab4b948f

export const generateSummary = async (text, prompt) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        messages: [
          {
            role: "system",
            content:
              "You are an expert at processing and summarizing text content. Follow the user's instructions precisely and provide clear, well-structured summaries."
          },
          {
            role: "user",
            content: `Please process the following text according to these instructions: "${prompt}"\n\nText to process:\n${text}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Proxy request failed with status ${response.status}`);
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
