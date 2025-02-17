import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import ErrorPage from "./pages/ErrorPage"; // ✅ 에러 페이지 추가
import "./index.css";

// ✅ React Query 클라이언트 생성
const queryClient = new QueryClient();

// ✅ Router 설정
const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
    errorElement: <ErrorPage />, // ✅ 모든 하위 라우트에서 에러 발생 시 ErrorPage 적용
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
