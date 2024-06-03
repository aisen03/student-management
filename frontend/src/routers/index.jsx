import Login from "../views/log-in/Login";
import { createBrowserRouter, Navigate } from "react-router-dom";
import SignUp from "../views/sign-up/Signup";
import Home from "../views/home/Home";
import Root from "../views/root/Root";
import Class from "../views/classes/Class";
import Subject from "../views/subjects/Subject";
import AddStudent from "../views/addstu/AddStudent";
import Dashboard from "../views/dashboard/Dashboard";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import Edit from "../views/editstu/Edit";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "classes",
        element: (
          <ProtectedRoute>
            <Class />
          </ProtectedRoute>
        ),
      },
      {
        path: "subjects",
        element: (
          <ProtectedRoute>
            <Subject />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-student",
        element: (
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-student",
        element: (
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
const router = createBrowserRouter(routes);

export default router;
