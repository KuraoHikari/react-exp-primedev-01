import baseApi from "@/api/baseApi";
import { AnimeCard } from "@/components/animeCard";
import { animeBookmark, responseBookmarks } from "@/types/responseType";
import { useLoaderData } from "react-router-dom";

export async function loader() {
 const responseImages = await baseApi.get(`bookmark`, {
  headers: {
   authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
 });

 const json: responseBookmarks = await responseImages.json();

 return { anime: json.metaData };
}

const BookmarkPage = () => {
 const data = useLoaderData() as { anime: animeBookmark[] };

 return (
  <>
   <div className="md:mx-5 grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-3 md:grid-cols-4 grid-cols-1">
    {data?.anime?.map((anime) => (
     <AnimeCard
      key={anime?.id}
      id={anime?.malId}
      image_url={anime?.imageUrl}
      title={anime?.title}
      year={0}
      season={anime?.season}
      aired={anime?.aired}
     />
    ))}
   </div>
  </>
 );
};

export default BookmarkPage;
