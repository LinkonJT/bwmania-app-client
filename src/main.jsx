import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/router.jsx";
import { ToastContainer } from "react-toastify";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
         <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
