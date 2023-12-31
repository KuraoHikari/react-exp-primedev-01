const LandingPage = () => {
 return (
  <>
   <div className="px-4 sm:px-6 lg:px-8 rounded-xl overflow-hidden">
    <div
     style={{ backgroundImage: `url(/anime-bg.jpg)` }}
     className="relative aspect-[2/1] md:aspect-[2.4/1] overflow-hidden bg-cover"
    >
     <div className="h-full  bg-opacity-80 bg-gray-50 text-gray-900 w-full flex flex-col justify-center items-center text-center gap-y-8">
      <div
       className=" 
        font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs"
      >
       KURAO SEARCH REBORN
      </div>
      <div
       className="  
         font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs"
      >
       {"⸜(｡˃ ᵕ ˂ )⸝♡"}
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

export default LandingPage;
