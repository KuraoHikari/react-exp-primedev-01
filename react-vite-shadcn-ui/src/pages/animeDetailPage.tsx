import baseApi from "@/api/baseApi";
import baseJikanApi from "@/api/jikanApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useBookmarksList from "@/store/useBookmarklist";
import { animeBookmark, animeDetailRes, responseAnimeImages } from "@/types/responseType";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { redirect, useLoaderData, useSubmit } from "react-router-dom";

interface Params {
 id: string;
}

export async function loader({ params }: any) {
 try {
  const typeParams = params as unknown as Params;
  const response = await baseJikanApi.get(`anime/${typeParams.id}`);

  if (!response.ok) {
   console.log(response);
  }

  const json: { data: animeDetailRes } = await response.json();

  const responseImages = await baseApi.get(`animewall?title=${json.data.title}`, {
   headers: {
    authorization: `Bearer ${localStorage.getItem("access_token")}`,
   },
  });

  const jsonImages: responseAnimeImages = await responseImages.json();

  return { anime: json.data, animeImages: jsonImages.metaData };
 } catch (error: any) {
  if (error.name === "HTTPError") {
   const errorJson = await error.response.json();

   if (errorJson.status === 401) {
    localStorage.removeItem("access_token");
    return redirect("/auth");
   }
  }

  return { anime: {}, animeImages: [] };
 }
}

export async function action({ request, params }: { request: Request; params: any }) {
 try {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  await baseApi.post(`bookmark/${params.id}`, {
   headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("access_token")}`,
   },
   body: JSON.stringify(payload),
  });

  return redirect("/bookmark");
 } catch (error: any) {
  if (error.name === "HTTPError") {
   const errorJson = await error.response.json();

   if (errorJson.status === 401) {
    localStorage.removeItem("access_token");
    return redirect("/auth");
   }
  }
  return false;
 }
}

const PageDetailAnime = () => {
 const [isBookmark, setIsBookmark] = useState<animeBookmark | undefined>(undefined);

 const { bookmarks } = useBookmarksList();

 const data = useLoaderData() as { anime: animeDetailRes; animeImages: { image: string }[] };

 useEffect(() => {
  const bookmark = bookmarks.find((bookmarkAnime) => bookmarkAnime.malId === data.anime.mal_id);
  setIsBookmark(bookmark);
 }, [bookmarks]);

 const submit = useSubmit();
 function handleSubmit(event: any) {
  event.preventDefault();

  submit(event.currentTarget);
 }
 return (
  <>
   <div className="overflow-hidden">
    <div style={{ backgroundImage: `url(/anime-bg.jpg)` }} className="md:h-full h-[600px] overflow-hidden bg-cover">
     <div className=" bg-gray-300 bg-opacity-80 text-gray-900 transform z-20 h-full px-20 py-10">
      <div
       className="text-center mb-4  
        font-bold text-3xl sm:text-5xl lg:text-6xl "
      >
       <h1>{data?.anime?.title}</h1>
      </div>
      <div className="flex justify-center">
       <div className="md:w-1/4 md:me-10">
        <img
         width={215}
         height={316}
         src={data?.anime?.images?.webp?.image_url}
         alt={data?.anime?.title}
         className={clsx("dark:border-gray-200 border-gray-900 border-2 h-[300px] mx-auto")}
        />
        <div className="text-center my-2">
         <form
          method="post"
          onSubmit={(event) => {
           handleSubmit(event);
          }}
         >
          <Input className="hidden" type="text" name="season" id="season" defaultValue={data?.anime?.season} />
          <Input className="hidden" type="text" name="aired" id="aired" defaultValue={data?.anime?.aired?.string} />
          <Input className="hidden" type="text" name="desc" id="desc" defaultValue={data?.anime?.synopsis} />
          <Input className="hidden" type="text" name="title" id="title" defaultValue={data?.anime?.title} />
          <Input className="hidden" type="text" name="malUrl" id="malUrl" defaultValue={data?.anime?.url} />
          <Input
           className="hidden"
           type="text"
           name="imageUrl"
           id="imageUrl"
           defaultValue={data?.anime?.images?.webp?.image_url}
          />
          <Button
           type="submit"
           className=" px-4 font-semibold text-gray-100 bg-gray-900 hover:bg-gray-200 hover:text-gray-900"
          >
           {isBookmark ? "Remove from Bookmark" : "Add to Bookmark"}
          </Button>
         </form>

         <p className="text-center text-gray-500 text-sm capitalize my-2">
          {data?.anime?.aired?.string} {data?.anime?.season}
         </p>
         <div className="text-sm text-left text-gray-500 hidden md:block lg:hidden">
          <h4 className="text-gray-900 font-bold"> Information:</h4>
          <p>Type: {data?.anime?.type}</p>
          <p>Episodes: {data?.anime?.episodes}</p>
          <p>Status: {data?.anime?.status}</p>
          <p>Aired: {data?.anime?.aired?.string}</p>

          <p>Broadcast: {data?.anime?.broadcast?.string}</p>
          <p>Rating: {data?.anime?.rating}</p>

          <p>Source: {data?.anime?.source}</p>
         </div>
        </div>
       </div>

       <div className="w-3/4 hidden md:block">
        <div className="text-sm text-left text-gray-500 hidden lg:block">
         <h4 className="text-gray-900 font-bold"> Information:</h4>
         <p>Type: {data?.anime?.type}</p>
         <p>Episodes: {data?.anime?.episodes}</p>
         <p>Status: {data?.anime?.status}</p>
         <p>Aired: {data?.anime?.aired?.string}</p>

         <p>Broadcast: {data?.anime?.broadcast?.string}</p>
         <p>Rating: {data?.anime?.rating}</p>

         <p>Source: {data?.anime?.source}</p>
        </div>
        <h4 className="text-gray-900 font-bold">Synopsis:</h4>
        <p className="text-gray-700">{data?.anime?.synopsis}</p>
        <h4 className="text-gray-900 font-bold">Background:</h4>
        <p className="text-gray-700">{data?.anime?.background}</p>
       </div>
      </div>
     </div>
    </div>

    <div className="flex flex-col items-center justify-between min-h-screen">
     <div className="wrapper pt-10">
      <div className="box-border max-w-7xl mx-4 sm:columns-1 md:columns-2 lg:columns-3 xl:columns-3">
       {data?.animeImages?.map((animeI) => (
        <div
         key={animeI.image}
         className="break-inside bg-clip-border bg-gray-500 bg-opacity-50 dark:bg-gray-200 flex flex-col mb-4 p-6"
        >
         <div className="flex items-center justify-center">
          <img className="max-w-full " alt="Avatar" src={animeI.image} loading="lazy" />
         </div>
        </div>
       ))}
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

export default PageDetailAnime;
