// Import other files (this is the main entry point for offscreen stuff)
// TODO: Figure out how to support either HMR or auto-reloads for changes in these files!

const initializeExtension = async () => {
  // Do stuff
};
initializeExtension();

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  // Do stuff
  console.log('Received message in offscreen:', message);
});
