let creating: Promise<void> | undefined | null; // A global promise to avoid concurrency issues
async function setupOffscreenDocument(path: string) {
  // Check all windows controlled by the service worker to see if one
  // of them is the offscreen document with the given path
  const offscreenUrl = chrome.runtime.getURL(path);
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [offscreenUrl],
  });

  if (existingContexts.length > 0) {
    return;
  }

  console.log('creating');
  // create offscreen document
  if (creating) {
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: path,
      reasons: ["CLIPBOARD"],
      justification: "reason for needing the document",
    });
    await creating;
    creating = null;
  }
}

chrome.action.onClicked.addListener(async () => {
  await setupOffscreenDocument("src/offscreen/index.html");

  // Send message to offscreen document
  chrome.runtime.sendMessage({
    type: "...",
    target: "offscreen",
    data: "...",
  });
});
