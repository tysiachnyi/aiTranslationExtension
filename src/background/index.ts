const promptAI =
  "You are a professional translator, translate this page to Russian";
async function makePostRequest(content: string) {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: `${promptAI} page data - ${content}`, // ❌ Fixed typo from "promt" to "prompt"
        stream: false,
      }),
    });

    console.log("Raw Response:", response);

    // Check if the response is empty
    const text = await response.text();
    if (!text) {
      console.error("Error: Empty response from server.");
      return { error: "Empty response from server" };
    }

    // Parse JSON safely
    const data = JSON.parse(text);
    console.log("Response:", data);
    return data;
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
        sendResponse(data); // Send the response back to popup.js
      })
      .catch((err) => {
        console.error("Error in makePostRequest:", err);
        sendResponse({ error: err.message });
      });

    return true; // 🔥 Keeps the channel open for async response
  }
});
