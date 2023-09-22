import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "./layout/mainLayout";
import AnimePage from "./pages/animePage";
import AnimeDetailPage from "./pages/animeDetailPage";
import LandingPage from "./pages/landingPage";
import AuthLayout, { action as actionAuth } from "./layout/authLayout";

export const routes = [
 {
  name: "anime",
  path: "/anime",
  element: <LayoutMain />,
  children: [
   {
    index: true,
    element: <AnimePage />,
   },
   {
    path: ":id",
    element: <AnimeDetailPage />,
   },
  ],
 },
 {
  name: "bookmark",
  path: "/bookmark",
  element: <LayoutMain />,
 },
];

const router = createBrowserRouter([
 ...routes,
 {
  path: "auth",
  element: <AuthLayout />,
  action: actionAuth,
 },
 {
  path: "/",
  element: <LayoutMain />,
  children: [
   {
    index: true,
    element: <LandingPage />,
   },
  ],
 },
]);

export default router;
