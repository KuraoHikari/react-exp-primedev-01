import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "./layout/mainLayout";
import AnimePage, { action as actionAnime } from "./pages/animePage";
import AnimeDetailPage, { loader as loaderDetail } from "./pages/animeDetailPage";
import LandingPage from "./pages/landingPage";
import AuthLayout, { action as actionAuth, loader as loaderAuth } from "./layout/authLayout";

export const routes = [
 {
  name: "anime",
  path: "/anime",
  element: <LayoutMain />,

  children: [
   {
    index: true,
    element: <AnimePage />,
    action: actionAnime,
   },
   {
    path: ":id",
    element: <AnimeDetailPage />,
    loader: loaderDetail,
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
  path: "/auth",
  element: <AuthLayout />,
  action: actionAuth,
  loader: loaderAuth,
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
