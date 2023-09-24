import { Loader2, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigation, useSubmit } from "react-router-dom";

export const SearchBar = () => {
 const submit = useSubmit();

 const navigation = useNavigation();
 const isSubmitting = navigation.state === "submitting";

 function handleSubmit(event: any) {
  event.preventDefault();

  submit(event.currentTarget);
 }
 return (
  <div className="mb-5 flex items-center justify-center">
   <form
    method="post"
    className="flex sm:w-[30rem] md:w-[40rem] dark:bg-white bg-gray-500"
    onSubmit={(event) => {
     handleSubmit(event);
    }}
   >
    <Input
     type="search"
     name="anime"
     id="anime"
     className="font-semibold w-full border-none bg-transparent px-4 py-1 dark:text-gray-900 text-gray-200 focus:outline-none"
     placeholder="Search"
     x-model="Search"
    />
    <Button
     type="submit"
     disabled={isSubmitting}
     className="m-2 px-4 py-2 font-semibold text-gray-100 bg-gray-900 hover:bg-gray-200 hover:text-gray-900"
    >
     Search
     {isSubmitting ? <Loader2 className="ms-2 h-3 w-3 animate-spin" /> : <SearchIcon className="ms-2 h-3 w-3" />}
    </Button>
   </form>
  </div>
 );
};
