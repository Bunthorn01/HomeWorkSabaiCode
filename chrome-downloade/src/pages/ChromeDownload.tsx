// import { useState } from "react";
import Popup from "../component/Popup";
import PopupConfirmDelete from "../component/PopupConfirmDelete";
import CardList from "../component/organisms/card-chrom-dowload/CardList";
import Header from "../component/templates/Header";
import PopupEdit from "../component/PopupEdit";
import { IoIosAddCircle } from "react-icons/io";


// contextAPI
import { Provider } from "../contextPAI/provider";

export interface dataType {
   id: number;
   creator: string;
   fileName: string;
   fileImage: string;
   date: string;
}
export interface verifyDelete {
   id: number;
   fileName: string;
}

function ChromeDownload() {
   //props
   // const [datas, setDatas] = useState<dataType[]>([]);
   // const [search, setSearchData] = useState<string>("");
   // const [catchId, setCatchId] = useState<number | undefined>();
   // const [isMatch, setIsMatch] = useState<boolean>(false);
   // const [isUpdate, setIsUpdate] = useState<boolean>(false);
   // const [isPopup, setIsPopup] = useState<boolean>(false);
   // const [isPopupEdit, setIsPopupEdit] = useState<boolean>(false);

   //contextAPI
   const {
      data,
      setData,
      search,
      setSearch,
      catchId,
      setCatchId,
      isMatch,
      setIsMatch,
      isUpdate,
      setIsUpdate,
      isPopup,
      setIsPopup,
      isPopupEdit,
      setIsPopupEdit
   } = Provider();

   const addNewItem = (newItem: dataType) => {
      const newId = data.length + 1;
      const newItemWithId = { ...newItem, id: newId };
      setData([...data, newItemWithId]);
   };

   // function searching creatorName and fileName
   const filterData = () => {
      let filtered = data;
      // filter
      if (search !== "") {
         filtered = filtered.filter((item) =>
            item.creator
               .toLocaleLowerCase()
               .includes(search.toLocaleLowerCase())
            || item.fileName
               .toLocaleLowerCase()
               .includes(search.toLocaleLowerCase())
         );
      }
      return filtered;
   };
   const filterDatas = filterData();

   // Function to delete an existing item
   const deleteItem = (
      index: number,
      deleteFilename: string,
      fileName: string
   ) => {
      if (deleteFilename !== fileName) {
         alert("incorrect delete filename");
         return;
      }
      const updatedDatas = data.filter((i) => i.id !== index);
      setData(updatedDatas);
   };

   // Function to handle clicking the Update button
   const handleUpdateClick = () => {
      setIsPopupEdit(true);
      setIsUpdate(false); // Set isUpdate back to false when Update button is clicked
   };

   return (
      <>
         <Header setSearch={setSearch} />
         <section className="wrap-page">
            <div className="w-[800px] mt-5">
               <CardList
                  props={{
                     data: filterDatas,
                     setIsMatch: setIsMatch,
                     setCatchId: setCatchId,
                     setIsUpdate: setIsUpdate,
                  }}
               />
            </div>
         </section>

         {isUpdate ? (
            <button
               type="button"
               className="absolute bottom-5 right-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
               onClick={handleUpdateClick} // Call handleUpdateClick instead of directly setting setIsPopupEdit to true
            >
               Update
            </button>
         ) : (
            <div
               className="fixed bottom-5 right-5 text-white bg-blue-500 px-4 py-4 rounded-lg hover:bg-blue-600"

               onClick={() => {
                  setIsPopup(true);
               }}
            >
               <IoIosAddCircle className="w-8 h-8 text-black" />
            </div>
         )}
         {isPopup && (
            <Popup
               props={{
                  setIsPopup: setIsPopup,
                  addNewItem: addNewItem,
                  data: data,
               }}
            />
         )}
         {isMatch && (
            <PopupConfirmDelete
               setIsMatch={setIsMatch}
               deleteItem={deleteItem}
               data={data}
               id={catchId}
            />
         )}

         {isPopupEdit && (
            <PopupEdit
               setIsPopupEdit={setIsPopupEdit}
               data={data}
               setData={setData}
               id={catchId}
            />
         )}
      </>
   );
}

export default ChromeDownload;
