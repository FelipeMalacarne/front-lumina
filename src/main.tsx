import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from "@/pages/RegisterPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import LandingPage from "@/pages/LandingPage.tsx";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.tsx";
import { AuthProvider } from "./providers/AuthProvider";
import { GuestLayout } from "./layouts/GuestLayout";
import { NotFoundPage } from "./pages/NotFoundPage";
import { DashboardPage } from "./pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <GuestLayout />,
    children: [
     {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/secure",
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
