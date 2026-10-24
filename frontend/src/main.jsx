import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Maintenance from "./Maintenance.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Maintenance />
  </StrictMode>
);
