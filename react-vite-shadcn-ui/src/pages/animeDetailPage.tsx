import { Button } from "@/components/ui/button";
import DataAnimeExample from "@/dataAnimeExample";
import DataAnimeImageExample from "@/dataAnimeImageEx";
import clsx from "clsx";

const PageDetailAnime = () => {
  const anime = DataAnimeExample[0];
  const animeImage = DataAnimeImageExample;
  return (
    <>
      <div className="overflow-hidden">
        <div style={{ backgroundImage: `url(/anime-bg.jpg)` }} className="md:h-full h-[600px] overflow-hidden bg-cover">
          <div className=" bg-gray-300 bg-opacity-80 text-gray-900 transform z-20 h-full px-20 py-10">
            <div
              className="text-center mb-4  
        font-bold text-3xl sm:text-5xl lg:text-6xl "
            >
              <h1>{anime?.title}</h1>
            </div>
            <div className="flex justify-center">
              <div className="md:w-1/4 md:me-10">
                <img
                  width={215}
                  height={316}
                  src={anime?.images?.webp?.image_url}
                  alt={anime?.title}
                  className={clsx("dark:border-gray-200 border-gray-900 border-2 h-[300px] mx-auto")}
                />
                <div className="text-center my-2">
                  <Button className=" px-4 font-semibold text-gray-100 bg-gray-900 hover:bg-gray-200 hover:text-gray-900">
                    Add to Bookmark
                  </Button>

                  <p className="text-center text-gray-500 text-sm capitalize my-2">
                    {anime?.aired?.string} {anime?.season}
                  </p>
                  <div className="text-sm text-left text-gray-500 hidden md:block">
                    <h4 className="text-gray-900 font-bold"> Information:</h4>
                    <p>Type: {anime?.type}</p>
                    <p>Episodes: {anime?.episodes}</p>
                    <p>Status: {anime?.status}</p>
                    <p>Aired: {anime?.aired?.string}</p>

                    <p>Broadcast: {anime?.broadcast?.string}</p>
                    <p>Rating: {anime?.rating}</p>

                    <p>Source: {anime?.source}</p>
                  </div>
                </div>
              </div>

              <div className="w-3/4 hidden md:block">
                <h4 className="text-gray-900 font-bold">Synopsis:</h4>
                <p className="text-gray-700">{anime?.synopsis}</p>
                <h4 className="text-gray-900 font-bold">Background:</h4>
                <p className="text-gray-700">{anime?.background}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
     flex flex-col items-center justify-between min-h-screen
         "
        >
          <div className="wrapper pt-10">
            <div className="box-border max-w-7xl mx-4 sm:columns-1 md:columns-2 lg:columns-3 xl:columns-3">
              {animeImage.map((animeI) => (
                <div
                  className="
                    break-inside
                    bg-clip-border
                  bg-white
                    flex 
                    flex-col 
                    mb-4 
                    p-6 
                  "
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
