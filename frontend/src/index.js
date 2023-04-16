import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import KommunicateChat from "components/Komunicate";

// Bootstrap Paradox Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <VisionUIControllerProvider>
      <App />
      <KommunicateChat />
    </VisionUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
