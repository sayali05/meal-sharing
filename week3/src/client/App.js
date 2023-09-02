import React from "react";
import Layout from "./pages/HomePage/Layout";
import Mealspage from "./pages/MealsPage/Mealspage";
import Home from "./pages/HomePage/Home";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import Reservation from "./pages/Reservation/ReservationPage";
import { MealsProvider } from "./contexts/MealsContext";
import ReviewPage from "./pages/ReviewPage/ReviewPage";

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meal",
        element: <Mealspage />,
      },
      {
        path: "/meals/:mealId",
        element: <Reservation />,
      },
      {
        path: "/review",
        element: <ReviewPage />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

function App() {
  return (
    <MealsProvider limit={4}>
      <RouterProvider router={router} />
    </MealsProvider>
  );
}

export default App;
