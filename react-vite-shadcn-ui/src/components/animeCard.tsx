import clsx from "clsx";
import { Link } from "react-router-dom";

interface AnimeCardProps {
 image_url: string;
 title: string;
 year: number;
 season: string;
 aired: string;
 id: number;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ image_url, title, year = 0, season, aired, id }) => {
 return (
  <div className={clsx("xl:w-72 lg:w-48  w-44 my-2", "duration-300 hover:-translate-y-1 hover:opacity-80 mx-auto")}>
   <Link className="cursor-pointer" to={`/anime/${String(id)}`}>
    <figure>
     <img
      width={115}
      height={105}
      src={image_url}
      alt={title}
      className={clsx("xl:h-[400px] h-[300px] dark:border-gray-200 border-gray-900 border-2", "w-full object-cover")}
     />

     <figcaption className="p-2 text-center">
      <p
       className="text-lg font-bold leading-relaxed text-gray-800 dark:text-gray-300"
       style={{
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "1",
        whiteSpace: "pre-wrap",
       }}
      >
       {title}
      </p>

      <small className="leading-5 text-gray-500 dark:text-gray-400">
       <span>{year === 0 ? "" : year}</span> <span>{season}</span> (<span>{aired}</span>)
      </small>
     </figcaption>
    </figure>
   </Link>
  </div>
 );
};
