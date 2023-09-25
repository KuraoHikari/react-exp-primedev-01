import { Link, Outlet, redirect, useLocation, useNavigation } from "react-router-dom";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { routes } from "@/route";
import { Loader2 } from "lucide-react";

export async function loader() {
 if (!localStorage.getItem("access_token")) {
  return redirect("/auth");
 }

 return {};
}

const LayoutMain = () => {
 const navigation = useNavigation();
 console.log("🚀 ~ file: mainLayout.tsx:17 ~ LayoutMain ~ navigation:", navigation);
 if (navigation.state === "loading") {
  return (
   <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden opacity-75 flex flex-col items-center justify-center">
    <Loader2 className="ms-2 h-10 w-10 animate-spin" />
    <h2 className="text-center text-gray-500 dark:text-gray-200 text-xl font-semibold">Loading...</h2>
    <p className="w-1/3 text-center text-gray-500 dark:text-gray-200">
     This may take a few seconds, please don't close this page.
    </p>
   </div>
  );
 }
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
