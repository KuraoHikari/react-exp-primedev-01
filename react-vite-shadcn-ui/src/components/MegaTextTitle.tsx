import clsx from "clsx";

interface MegaTextTitleProps {
 text1: string;
 text2: string;
 text3: string;
 text4: string;
 className?: string;
}

export const MegaTextTitle: React.FC<MegaTextTitleProps> = ({ text1, text2, text3, text4, className = "" }) => {
 return (
  <div className={clsx("text-6xl dark:text-gray-200  my-5 font-extrabold", className)}>
   <h1 className=" hover:text-gray-500">
    <span className="text-gray-500 hover:dark:text-gray-200 hover:text-gray-900">{text1}</span>
    {text2}
    <span className="text-gray-500 hover:dark:text-gray-200 hover:text-gray-900">{text3}</span>
    {text4}
   </h1>
  </div>
 );
};
