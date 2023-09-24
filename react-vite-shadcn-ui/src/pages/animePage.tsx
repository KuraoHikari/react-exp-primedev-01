import baseJikanApi from "@/api/jikanApi";
import { MegaTextTitle } from "@/components/MegaTextTitle";
import { SearchBar } from "@/components/SearchBar";
import { AnimeCard } from "@/components/animeCard";
import { useEffect, useState } from "react";
import { redirect, useActionData } from "react-router-dom";

export async function action({ request }: { request: Request }) {
 try {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const response = await baseJikanApi.get(`anime?q=${payload.anime}`);

  if (!response.ok) {
   console.log(response);
  }

  const json = await response.json();

  redirect("/anime");
  return { anime: json };
 } catch (error) {
  return { anime: {} };
 }
}

interface IAnime {
 mal_id: number;
 images: {
  webp: {
   image_url: string;
  };
 };
 title: string;
 year: number;
 season: string;
 aired: {
  string: string;
 };
}

const AnimePage = () => {
 const [animeDataExample, setAnimeDataExample] = useState<{
  anime?: {
   data: IAnime[];
  };
 }>({});

 const actionData: { anime?: { data: IAnime[] } } | unknown = useActionData();
 useEffect(() => {
  if (actionData) {
   setAnimeDataExample(actionData);
  }
 }, [actionData]);

 return (
  <>
   <div className="px-4 sm:px-6 lg:px-8 rounded-xl overflow-hidden">
    <div
     style={{ backgroundImage: `url(/anime-bg.jpg)` }}
     className="relative aspect-[2/1] md:aspect-[2.4/1] overflow-hidden bg-cover"
    >
     <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
      <div
       className=" bg-gray-50 text-gray-900
        bg-opacity-80 font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs"
      >
       オタク
      </div>
     </div>
    </div>
   </div>
   <MegaTextTitle className="text-center" text1="THE" text2=" ANI" text3="ME SE" text4="ARCH" />
   <SearchBar />
   <div className="md:mx-5 grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-3 md:grid-cols-4 grid-cols-1">
    {animeDataExample?.anime?.data?.map((anime) => (
     <AnimeCard
      key={anime?.mal_id}
      id={anime?.mal_id}
      image_url={anime?.images?.webp?.image_url}
      title={anime?.title}
      year={anime?.year}
      season={anime?.season}
      aired={anime?.aired?.string}
     />
    ))}
   </div>
  </>
 );
};

export default AnimePage;
