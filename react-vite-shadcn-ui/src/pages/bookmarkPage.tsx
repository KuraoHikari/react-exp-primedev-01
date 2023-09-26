import { MegaTextTitle } from "@/components/MegaTextTitle";
import { AnimeCard } from "@/components/animeCard";
import useBookmarksList from "@/store/useBookmarklist";

const BookmarkPage = () => {
 const { bookmarks } = useBookmarksList();

 return (
  <>
   <MegaTextTitle className="text-center" text1="BOOK" text2="MARKS" text3="⸜(｡˃" text4={" ᵕ ˂ )⸝♡"} />
   <div className="md:mx-5 grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-3 md:grid-cols-4 grid-cols-1">
    {bookmarks?.map((anime) => (
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
