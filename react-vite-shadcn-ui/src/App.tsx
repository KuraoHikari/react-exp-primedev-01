import CountBtn from "@/components/CountBtn";
import ReactSVG from "@/assets/react.svg";
import { Badge } from "@/components/ui/badge";
import {
 Alert,
 AlertDescription,
 AlertTitle,
} from "@/components/ui/alert";
import { Terminal } from "lucide-react";

function App() {
 return (
  <main className="flex flex-col items-center justify-center h-screen">
   <div className="flex flex-col items-center gap-y-4">
    <div className="inline-flex items-center gap-x-4">
     <img
      src={ReactSVG}
      alt="React Logo"
      className="w-32"
     />
     <span className="text-6xl">+</span>
     <img
      src={"/vite.svg"}
      alt="Vite Logo"
      className="w-32"
     />
    </div>
    <a
     href="https://ui.shadcn.com"
     rel="noopener noreferrer nofollow"
     target="_blank"
    >
     <Badge variant="outline">shadcn/ui</Badge>
    </a>
    <Alert>
     <Terminal className="h-4 w-4" />
     <AlertTitle>Heads up!</AlertTitle>
     <AlertDescription>
      You can add components and dependencies to your app
      using the cli.
     </AlertDescription>
    </Alert>

    <CountBtn />
   </div>
  </main>
 );
}

export default App;
