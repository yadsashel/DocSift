import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// هـنا غـانـتـأكـدو واش الـ Root كـايـن بـالـصـح
const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(<App />); 
  console.log("React is trying to render..."); // ✅ شـوف واش هاد الـمـيـساج كـايـبان فـ الـ Console
} else {
  alert("CRITICAL ERROR: No root element found in index.html!");
}