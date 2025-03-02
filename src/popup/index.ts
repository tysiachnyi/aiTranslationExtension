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

  translatePageBtn.addEventListener("click", () => {
    console.log("Translate Page button clicked");
    chrome.runtime.sendMessage({ action: "sendPostRequest" }, (response) => {
      console.log("Response from background:", response);
      responseChrome.innerText = response?.error
        ? `Error: ${response.error}`
        : JSON.stringify(response, null, 2);
    });
  });

  translateSelectionBtn.addEventListener("click", () => {
    console.log("Translate Selection button clicked");
  });
});
