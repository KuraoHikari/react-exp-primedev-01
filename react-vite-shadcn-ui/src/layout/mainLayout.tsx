import { Link, Outlet, useLocation } from "react-router-dom";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { routes } from "@/route";

export type RouteType = "anime" | "bookmark" | "";

const LayoutMain = () => {
 const location = useLocation();

 return (
  <>
   <div className="">
    <Container>
     <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
      <Link to="/" className="ml-4 flex lg:ml-0 gap-x-2">
       <p className="font-bold text-xl">ANIME SEARCH REBORN</p>
      </Link>
      <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
       {routes.map((route) => (
        <Link
         key={route.name}
         to={`/${route.name}`}
         className={cn(
          "capitalize text-sm font-medium transition-colors hover:text-black hover:dark:text-neutral-200",
          location.pathname?.includes(route.name) ? "text-black dark:text-neutral-200" : "text-neutral-500"
         )}
        >
         {route.name}
        </Link>
       ))}
      </nav>
      <div className="ml-auto flex items-center gap-x-4">
       <ModeToggle />
      </div>
     </div>
    </Container>
   </div>
   <Outlet />
   <footer className="footer footer-center  w-full py-5 text-gray-500">
    <div className="text-center">
     <p>Copyright © 2023 - Kurao Hikari</p>
    </div>
   </footer>
  </>
 );
};

export default LayoutMain;
