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
    await alert("Translate page button clicked");
    // Add your translation logic here
  });

  // Add click event listener for translating selection
  translateSelectionBtn.addEventListener("click", async () => {
    await alert("Translate selection button clicked");
    // Add your translation logic here
  });
});
