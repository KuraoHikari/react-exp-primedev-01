import { createBrowserRouter } from "react-router-dom";
import LayoutMain, { loader as loaderMain } from "./layout/mainLayout";
import AnimePage, { action as actionAnime } from "./pages/animePage";
import AnimeDetailPage, { loader as loaderDetail, action as actionDetail } from "./pages/animeDetailPage";
import LandingPage from "./pages/landingPage";
import AuthLayout, { action as actionAuth, loader as loaderAuth } from "./layout/authLayout";
import BookmarkPage from "./pages/bookmarkPage";

export const routes = [
 {
  name: "anime",
  path: "/anime",
  element: <LayoutMain />,
  loader: loaderMain,

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
    action: actionDetail,
   },
  ],
 },
 {
  name: "bookmark",
  path: "/bookmark",
  element: <LayoutMain />,
  loader: loaderMain,
  children: [
   {
    index: true,
    element: <BookmarkPage />,
   },
  ],
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
