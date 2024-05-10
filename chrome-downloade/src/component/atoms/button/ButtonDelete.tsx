import { RiDeleteBin6Line } from "react-icons/ri";
interface props {
   setIsMatch: (isMatch: boolean) => void;
   setCatchId: (catchId: number) => void;
   id: number;
}

function ButtonDelete({ setIsMatch, setCatchId, id }: props) {
   return (
      <>
         {/* <button
            className=" cursor-pointer px-2 hover:bg-green-300 hover:text-white"
            onClick={() => {
               setIsMatch(true);
               setCatchId(id);
            }}
         >
            Delete
         </button> */}
         <RiDeleteBin6Line 
         className="absolute right-2 top-1 hover:text-red-500"
         onClick={() => {
          setIsMatch(true);
          setCatchId(id);
         }}
         />
      </>
   );
}

export default ButtonDelete;
