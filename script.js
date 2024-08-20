/**
 * The iframe element that you want to message.
 * @type {HTMLIFrameElement}
 */
const iframe = document.querySelector("#embed-frame");

/**
 * The target origin for postMessage.
 * @type {string}
 */
const figmaOrigin = "https://staging.figma.com";

/**
 * Sends a message to the iframe to navigate to the next page in the prototype.
 */
function nextPage() {
  iframe.contentWindow.postMessage(
    {
      type: "NAVIGATE_FORWARD" // message that controls the prototype
    },
    figmaOrigin
  );
}

/**
 * Sends a message to the iframe to navigate to the previous page in the prototype.
 */
function previousPage() {
  iframe.contentWindow.postMessage(
    {
      type: "NAVIGATE_BACKWARD"
    },
    figmaOrigin
  );
}

/**
 * Sends a message to the iframe to restart the prototype.
 */
function restartPrototype() {
  iframe.contentWindow.postMessage(
    {
      type: "RESTART"
    },
    figmaOrigin
  );
}

/**
 * The restart button element.
 * @type {HTMLButtonElement}
 */
const restartButton = document.querySelector("#restart");

/**
 * The next button element.
 * @type {HTMLButtonElement}
 */
const nextButton = document.querySelector("#next");

/**
 * The previous button element.
 * @type {HTMLButtonElement}
 */
const prevButton = document.querySelector("#prev");

// Set up event listeners for the buttons
restartButton.addEventListener("click", restartPrototype);
nextButton.addEventListener("click", nextPage);
prevButton.addEventListener("click", previousPage);

/**
 * Event listener to capture messages from the iframe.
 * @param {MessageEvent} event - The message event from the iframe.
 */
window.addEventListener("message", (event) => {
  // Ensure the message is coming from the expected iframe origin
  if (event.origin === figmaOrigin) {
    outputEvent(event);

    if (event.data.type === "INITIAL_LOAD") {
      restartButton.removeAttribute("disabled");
      nextButton.removeAttribute("disabled");
    }

    if (event.data.type === "PRESENTED_NODE_CHANGED") {
      const nodeId = event.data.data.presentedNodeId;
      
      if (nodeId === "5019:210") {
        prevButton.setAttribute("disabled", "");
      } else if (prevButton.hasAttribute("disabled")) {
        prevButton.removeAttribute("disabled");
      }

      if (nodeId === "5019:72") {
        nextButton.setAttribute("disabled", "");
      } else if (nextButton.hasAttribute("disabled")) {
        nextButton.removeAttribute("disabled");
      }
    }
  } else {
    console.warn(
      "Received message from an unexpected origin:",
      event.origin
    );
  }
});

/**
 * Outputs the event data to a list element in the DOM.
 * @param {MessageEvent} event - The message event from the iframe.
 */
function outputEvent(event) {
  const eventsList = document.querySelector("#events");
  const eventText = document.createTextNode(JSON.stringify(event.data, null, 2));
  const eventPre = document.createElement("pre");
  eventPre.append(eventText);
  eventsList.prepend(eventPre);
}