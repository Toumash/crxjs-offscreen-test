(async () => {
  // NOTE: Function simplified for posting
  const existingContexts = await chrome.runtime.getContexts({});
  const offscreenDocument = existingContexts.find(
    (c) => c.contextType === "OFFSCREEN_DOCUMENT"
  );
  if (offscreenDocument) return;

  await chrome.offscreen.createDocument({
    url: "src/offscreen/index.html",
    justification: "This is an offscreen document for background tasks.",
    reasons: ["DOM_PARSER"],
  });
});