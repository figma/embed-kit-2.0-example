const iframe = document.querySelector("#embed-frame"); // iframe you want to message
const figmaOrigin = "https://staging.figma.com"; // target origin

function nextPage() {
  iframe.contentWindow.postMessage(
    {
      type: "NAVIGATE_FORWARD" // message that controls the prototype
    },
    figmaOrigin
  );
}

function previousPage() {
  iframe.contentWindow.postMessage(
    {
      type: "NAVIGATE_BACKWARD" // message that controls the prototype
    },
    figmaOrigin
  );
}

function restartPrototype() {
  iframe.contentWindow.postMessage(
    {
      type: "RESTART"
    },
    figmaOrigin
  );
}

const restartButton = document.querySelector("#restart");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");

restartButton.addEventListener("click", restartPrototype);
nextButton.addEventListener("click", nextPage);
prevButton.addEventListener("click", previousPage);

// Event listener to capture messages from the iframe
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

function outputEvent(event) {
  const eventsList = document.querySelector("#events");
  const eventText = document.createTextNode(JSON.stringify(event.data, null, 2));
  const eventPre = document.createElement("pre");
  eventPre.append(eventText);
  eventsList.prepend(eventPre);
}