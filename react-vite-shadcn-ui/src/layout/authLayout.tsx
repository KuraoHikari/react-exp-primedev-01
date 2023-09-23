import baseApi from "@/api/baseApi";
import AuthForm from "@/components/AuthForm";
import { MegaTextTitle } from "@/components/MegaTextTitle";

import { GithubIcon } from "lucide-react";
import { Link, redirect } from "react-router-dom";

export async function action({ request }: { request: Request }) {
 const formData = await request.formData();
 const payload = Object.fromEntries(formData);

 const response = await baseApi.post(`auth/${payload.auth}`, {
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
 });

 const json = await response.json();
 console.log(json);

 return redirect("/anime");
}

const AuthLayout = () => {
 return (
  <section className="min-h-screen flex items-stretch text-white bg-gradient-to-r from-slate-500 to-slate-900">
   <div
    className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
    style={{
     backgroundImage: "url(/anime-bg.jpg)",
    }}
   >
    <div className="absolute bg-black opacity-60 inset-0 z-0" />
    <div className="w-full px-24 z-10">
     <MegaTextTitle text1="オタク" text2="-" text3="⸜(｡˃" text4={" ᵕ ˂ )⸝♡"} />

     <p className="text-3xl my-4">"Weebs control the world, and Never lose HOPE"</p>
    </div>
    <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
     <Link to="https://github.com/KuraoHikari/react-exp-primedev-01" target="_blank" rel="noopener noreferrer">
      <GithubIcon className="hover:text-gray-500 h-10 w-10" />
     </Link>
    </div>
   </div>
   <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
    <div
     className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
     style={{
      backgroundImage: "url(/anime-bg.jpg)",
     }}
    >
     <div className="absolute bg-black opacity-60 inset-0 z-0" />
    </div>
    <AuthForm />
   </div>
  </section>
 );
};

export default AuthLayout;
