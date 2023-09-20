import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";

export const SearchBar = () => {
 return (
  <div className="mb-5 flex items-center justify-center">
   <div className="flex sm:w-[30rem] md:w-[40rem] dark:bg-white bg-gray-500">
    <input
     type="search"
     className="font-semibold w-full border-none bg-transparent px-4 py-1 dark:text-gray-900 text-gray-200 focus:outline-none"
     placeholder="Search"
     x-model="Search"
    />
    <Button className="m-2 px-4 py-2 font-semibold text-gray-100 bg-gray-900 hover:bg-gray-200 hover:text-gray-900">
     Search
     <SearchIcon className="ms-2 h-3 w-3" />
    </Button>
   </div>
  </div>
 );
};
