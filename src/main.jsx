import { jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4";               // ← ушул сап кошулду
import App from "./app/App.jsx";
import "./styles/index.css";

ReactGA.initialize("G-S654NTY1PT");           // ← ушул сап кошулду

createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsx(App, {}));