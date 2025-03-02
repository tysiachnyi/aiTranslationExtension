console.log("Popup script loaded!");

document.addEventListener("DOMContentLoaded", () => {
  const translatePageBtn = document.getElementById(
    "translatePage"
  ) as HTMLButtonElement | null;
  const translateSelectionBtn = document.getElementById(
    "translateSelection"
  ) as HTMLButtonElement | null;
  const sendRequest = document.getElementById(
    "sendRequest"
  ) as HTMLButtonElement | null;
  const responseChrome = document.getElementById(
    "response"
  ) as HTMLDivElement | null;

  if (
    !translatePageBtn ||
    !translateSelectionBtn ||
    !sendRequest ||
    !responseChrome
  ) {
    console.error("One or more buttons not found in popup.");
    return;
  }

  sendRequest.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "sendPostRequest" }, (response) => {
      console.log("Response from background:", response);
      responseChrome.innerText = response?.error
        ? `Error: ${response.error}`
        : JSON.stringify(response, null, 2);
    });
  });

  translatePageBtn.addEventListener("click", async () => {
    console.log("Translate Page button clicked");
    let pageContent;
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

      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          console.log("Executing content script");
          return document.body.innerHTML;
        },
      });
      pageContent = result[0].result;
    } catch (error) {
      console.error("Error accessing tab content:", error);
      alert(`Error accessing page content: ${error}`);
    }

    chrome.runtime.sendMessage(
      { action: "sendPostRequest", content: pageContent },
      (response) => {
        console.log("Response from background:", response);
        responseChrome.innerText = response?.error
          ? `Error: ${response.error}`
          : JSON.stringify(response, null, 2);
      }
    );
  });

  translateSelectionBtn.addEventListener("click", () => {
    console.log("Translate Selection button clicked");
  });
});
