import { createBrowserRouter } from "react-router-dom";
import LayoutMain from "./layout/mainLayout";

export const routes = [
 {
  name: "anime",
  path: "/anime",
  element: <LayoutMain />,
  children: [
   {
    index: true,
    element: <>main anime</>,
   },
   {
    path: ":id",
    element: <>detail anime</>,
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
  element: <LayoutMain />,
 },
]);

export default router;
