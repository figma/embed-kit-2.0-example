# Embed Kit example site

An example site that has an embedded Figma prototype and uses the Embed API to send messages and handle events.

View this repository's version of the site [here](https://figma.github.io/embed-kit-2.0-example/).

For learning purposes, the example site is built with a simple combination of HTML, JavaScript, and CSS. Generally, for production, you'll want to implement your embed tooling with consideration for things such as reusable components and type safety.

The example site includes three files:

* [index.html](#indexhtml)
* [script.js](#scriptjs)
* [styles.css](#stylescss)

## index.html

[index.html](index.html) contains the HTML for the example site. The site features an embedded Figma prototype with control buttons for navigation and a section for displaying events.

The structure consists of a main container with a flex display that includes the following:
- An `iframe` with the ID `embed-frame` that embeds the Figma prototype.
- A control panel (`#panel`) with two main sections:
  - A controls section (`#controls`) that contains a header and three buttons (`#prev`, `#restart`, and `#next`) for navigating and restarting the prototype. These buttons are initially disabled.
  - An event viewer section (`#event-viewer`) that contains a header and a container (`#events`) where event messages from the prototype will be displayed.

## script.js

[script.js](script.js) contains the JavaScript that implements the site's functionality.

This JavaScript script interacts with an embedded Figma prototype within an iframe. It allows users to control the prototype's navigation and restart functionalities through buttons on the webpage. The script sends messages to the iframe using the `postMessage` API, targeting the origin "https://www.figma.com" to ensure secure communication.

The script defines three functions: `nextPage`, `previousPage`, and `restartPrototype`. These functions send messages to the iframe to navigate forward, navigate backward, and restart the prototype, respectively.

Three button elements, identified by their IDs (`#restart`, `#next`, and `#prev`), are set up with event listeners to trigger the corresponding functions when clicked.

An event listener is also added to the window to capture messages received from the iframe. It processes events from the expected origin and performs actions based on the message type, such as enabling/disabling buttons depending on the prototype's state. Additionally, the script outputs the received event data to a designated section in the DOM for debugging and informational purposes.

## styles.css

[styles.css](styles.css) contains the CSS styles for the embedded Figma prototype's iframe and its control panel, along with general site styling.
