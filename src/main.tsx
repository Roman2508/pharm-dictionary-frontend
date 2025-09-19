import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router/dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./index.css"
import { router } from "./router.tsx"
import { Toaster } from "./components/ui/sonner.tsx"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <RouterProvider router={router} />,
  </QueryClientProvider>,
)
