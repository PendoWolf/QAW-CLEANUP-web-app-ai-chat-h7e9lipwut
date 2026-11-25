import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import "./styles.css";

// Boot Novus by Pendo once, as an anonymous visitor. AuthProvider identifies the
// signed-in user. An empty id lets the SDK reuse a previous visitor if it has one.
pendo.initialize({
  visitor: {
    id: "",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
