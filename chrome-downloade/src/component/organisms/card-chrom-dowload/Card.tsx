import { useState } from "react";
import ButtonDelete from "../../atoms/button/ButtonDelete";

interface CardProps {
   props: {
      id: number;
      creator: string;
      fileName: string;
      fileImage: string;
      date: string;
      setIsMatch: (isMatch: boolean) => void;
      setCatchId: (catchId: number) => void;
      setIsUpdate: (isUpdate: boolean) => void;
   };
}

const formatDate = (dateString: string): string => {
   const date = new Date(dateString);
   const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
   };
   return date.toLocaleDateString("en-US", options);
};

function Card({ props }: CardProps) {
   const [clickCount, setClickCount] = useState<number>(0);
   const setIsMatch = props.setIsMatch;
   const setCatchId = props.setCatchId;
   const setIsUpdate = props.setIsUpdate;

   const handleClick = () => {
      setClickCount((prevCount) => prevCount + 1);

      // If double-clicked, toggle between Update mode and default mode
      if (clickCount === 1) {
         setIsUpdate(true);
         setCatchId(props.id);
      } else if (clickCount === 2) {
         setIsUpdate(false);
         setClickCount(0); // Reset click count
      }
   };

   return (
      <div
         className="h-[120px] w-full border-solid border-[2px] rounded-lg  flex items-center overflow-hidden cursor-pointer"
         onDoubleClick={handleClick}
      >
         <div className="w-[30%] p-10 border-r-[2px] ">
            <img src={props.fileImage} alt={props.fileImage} />
         </div>
         <div className=" w-[100%] flex flex-col relative p-5 text-xl">
            <div className="absolute right-20">
               <p>{props.creator}</p>
            </div>
            <div>
               <p>{props.fileName}</p>
            </div>
            <div className="mt-10">
               <small> {formatDate(props.date)} </small>
            </div>
            <div className=" cursor-pointer absolute right-3 top-5">
               <ButtonDelete
                  setIsMatch={setIsMatch}
                  setCatchId={setCatchId}
                  id={props.id}
               />
            </div>
         </div>
      </div>
   );
}

export default Card;
