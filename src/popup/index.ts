console.log("Popup script loaded!");

document.addEventListener("DOMContentLoaded", () => {
  // Get button elements with type assertion
  const translatePageBtn = document.getElementById(
    "translatePage"
  ) as HTMLButtonElement;
  const translateSelectionBtn = document.getElementById(
    "translateSelection"
  ) as HTMLButtonElement;

  if (!translatePageBtn || !translateSelectionBtn) {
    alert("Button not found");
    return;
  }

  // Add click event listener for translating page
  translatePageBtn.addEventListener("click", async () => {
    console.log("Button clicked - starting translation process");
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      console.log("Current tab:", tab);

      if (!tab.id) {
        throw new Error("Tab ID is undefined");
      }
      console.log("Tab ID:", tab.id);

      // Execute script in the tab to get page content
      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          console.log("Executing content script");
          return document.body.innerText;
        },
      });
      console.log("Script execution result:", result);

      const pageContent = result[0].result;
      console.log("Page content:", pageContent);
    } catch (error) {
      console.error("Error accessing tab content:", error);
      alert(`Error accessing page content: ${error}`);
    }
  });

  // Add click event listener for translating selection
  translateSelectionBtn.addEventListener("click", async () => {
    await alert("Translate selection button clicked");
    // Add your translation logic here
  });
});
