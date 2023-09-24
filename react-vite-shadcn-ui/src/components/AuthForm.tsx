import { Link, useSubmit } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { MegaTextTitle } from "./MegaTextTitle";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
 const [variant, setVariant] = useState<Variant>("LOGIN");

 const toggleVariant = useCallback(() => {
  if (variant === "LOGIN") {
   setVariant("REGISTER");
  } else {
   setVariant("LOGIN");
  }
 }, [variant]);

 const submit = useSubmit();

 function handleSubmit(event: any) {
  event.preventDefault();

  submit(event.currentTarget);
 }

 return (
  <div className="w-full py-6 z-20">
   {variant === "LOGIN" ? (
    <h1 className="my-6">
     <MegaTextTitle className="text-center" text1="Log" text2="-" text3="In " text4="オタク" />
    </h1>
   ) : (
    <h1 className="my-6">
     <MegaTextTitle className="text-center" text1="Regis" text2="ter" text3=" " text4="オタク" />
    </h1>
   )}

   <form
    method="post"
    className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
    onSubmit={(event) => {
     handleSubmit(event);
    }}
   >
    {variant === "LOGIN" ? null : (
     <div className="pb-2 pt-4">
      <Input
       type="name"
       name="name"
       id="name"
       placeholder="Name"
       className="flex h-10 w-full border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  bg-black"
      />
     </div>
    )}

    <div className="pb-2 pt-4">
     <Input
      type="email"
      name="email"
      id="email"
      placeholder="Email"
      className="flex h-10 w-full border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  bg-black"
     />
    </div>
    <div className="pb-2 pt-4">
     <Input
      className="flex h-10 w-full border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-black"
      type="password"
      name="password"
      id="password"
      placeholder="Password"
     />
    </div>
    <Input className="hidden" type="text" name="auth" id="auth" value={variant === "LOGIN" ? "login" : "register"} />

    <div className="pb-2 pt-4">
     <Button
      type="submit"
      name="_action"
      className="w-full py-6 text-xl font-semibold text-gray-100 bg-gray-900 hover:bg-gray-200 hover:text-gray-900"
     >
      {variant === "LOGIN" ? "Login" : "Register"}
     </Button>
    </div>
    <div
     className="
        flex
        gap-2
        justify-center
        text-sm
        mt-6
        px-2
        text-gray-500
    "
    >
     <div>{variant === "LOGIN" ? "Don't have an Account?" : "Already have an account?"}</div>
     <div onClick={toggleVariant} className="underline cursor-pointer">
      {variant === "LOGIN" ? "Create an account" : "Login"}
     </div>
    </div>
    <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
     <Link to="https://github.com/KuraoHikari/react-exp-primedev-01" target="_blank" rel="noopener noreferrer">
      <GithubIcon className="hover:text-gray-500 h-10 w-10" />
     </Link>
    </div>
   </form>
  </div>
 );
};

export default AuthForm;
