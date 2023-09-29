document.getElementById('triggerExtension').addEventListener('click', () => {
  chrome.action.triggerAction({tabId: chrome.tabs.TAB_ID_NONE});
});
