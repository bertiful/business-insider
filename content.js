const elementsAdded = {
  "tp-modal": null,
  "tp-backdrop": null,
  "tp-modal-open": false,
};

function setupMutationObserver() {
  const observerCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            checkForTargetElement(node);
          }
        }
      } else if (
        mutation.type === "attributes" &&
        mutation.target.tagName === "BODY"
      ) {
        if (mutation.target.classList.contains("tp-modal-open")) {
          elementsAdded["tp-modal-open"] = true;
        }
      }
    }

    handleTargetElement();
  };

  const observer = new MutationObserver(observerCallback);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });
}

function checkForTargetElement(node) {
  for (const className in elementsAdded) {
    if (node.classList.contains(className)) {
      elementsAdded[className] = node;
    }
  }

  if (Object.values(elementsAdded).every((value) => value !== null)) {
    handleTargetElement();
    return true;
  }

  return false;
}

function handleTargetElement() {
  if (elementsAdded["tp-modal"]) {
    elementsAdded["tp-modal"].remove();
  }

  if (elementsAdded["tp-backdrop"]) {
    elementsAdded["tp-backdrop"].remove();
  }

  if (elementsAdded["tp-modal-open"]) {
    document.body.classList.remove("tp-modal-open");
  }

  const styleElement = document.createElement("style");
  styleElement.textContent = `
        #piano-inline-content-wrapper {
            display: block !important;
        }
    `;
  document.head.appendChild(styleElement);
}

setupMutationObserver();
