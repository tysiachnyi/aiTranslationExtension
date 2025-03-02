const promptAI =
  "You are a professional translator. Translate the following text to Russian:";

async function makePostRequest(content: string) {
  try {
    // Optional: Add max_tokens to help limit output length
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: `${promptAI}\n${content}`,
        stream: false,
        max_tokens: 2000, // Adjust as needed
      }),
    });

    console.log("Raw Response:", response);
    const text = await response.text();

    if (!text) {
      console.error("Error: Empty response from server.");
      return { error: "Empty response from server" };
    }

    // Parse safely
    const data = JSON.parse(text);
    console.log("Response:", data);
    return data.response;
  } catch (error) {
    console.error("Error:", error);
    return { error: error };
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);

  if (message.action === "sendPostRequest") {
    makePostRequest(message.content)
      .then((data) => {
        console.log("Sending response back:", data);
        sendResponse(data);
      })
      .catch((err) => {
        console.error("Error in makePostRequest:", err);
        sendResponse({ error: err.message });
      });

    // Keep the message channel open for async reply
    return true;
  }
});
