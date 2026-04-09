import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const DocsLayout = lazy(() =>
  import("./docs/DocsLayout.tsx").then((m) => ({ default: m.DocsLayout }))
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/docs" element={<Navigate to="/docs/installation" replace />} />
        <Route
          path="/docs/:slug"
          element={
            <Suspense>
              <DocsLayout />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
