import { RxCross2 } from "react-icons/rx";
import { dataType } from "../pages/ChromeDownload";
import { useState } from "react";
interface PopupProps {
   setIsMatch: (isMatch: boolean) => void;
   deleteItem: (
      index: number,
      deleteFilename: string,
      fileName: string
   ) => void;
   data: dataType[];
   id: number | undefined;
}

export default function PopupConfirmDelete({
   setIsMatch,
   deleteItem,
   data,
   id,
}: PopupProps): JSX.Element {
   const [fileNameDelete, setFileNameDelete] = useState<string>("");
   const filteredFileNames = data.filter(
      (item) => item.fileName === fileNameDelete
   );
   const fileName: string | undefined =
      filteredFileNames.length > 0 ? filteredFileNames[0].fileName : undefined;

   return (
      <>
         <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setIsMatch(false)}
         ></div>
         <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 shadow-lg bg-white rounded-lg p-6">
            <div
               onClick={() => setIsMatch(false)}
               className="absolute top-3 right-3 w-6 h-6 cursor-pointer"
            >
               <RxCross2 />
            </div>
            <h2 className="text-xl font-bold mb-4 text-center">
               Rewrite your<span className="text-red-500">file's name {fileName} </span> toconfirm to delete
            </h2>
            <form className="space-y-4">
               <div>
                  <label htmlFor="creator" className="text-lg text-gray-900">
                     File's name
                  </label>
                  <input
                     id="creator"
                     name="creator"
                     type="text"
                     autoComplete="off"
                     required
                     className="w-full bg-gray-200 p-2 rounded-xl focus:outline-none pl-5 pr-5"
                     onChange={(e) => setFileNameDelete(e.target.value)}
                  />
               </div>
               <div className="flex justify-end gap-5">
                  <button
                     className=" bg-blue-400 px-5 py-2 rounded-lg text-white hover:bg-blue-500"
                     onClick={() => setIsMatch(false)}
                  >
                     Cancel
                  </button>
                  <button
                     type="button"
                     onClick={() => {
                        id !== undefined &&
                           deleteItem(id, fileNameDelete, fileName || " ");
                        setIsMatch(false);
                     }}
                     className="bg-red-400 px-5 py-2 rounded-lg text-white hover:bg-red-500"
                  >
                     Delete
                  </button>
               </div>
            </form>
         </div>
      </>
   );
}
