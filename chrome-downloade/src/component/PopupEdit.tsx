import { RxCross2 } from "react-icons/rx";
import { dataType } from "../pages/ChromeDownload";
import { useEffect, useState } from "react";
// import { dataType } from "../pages/ChromeDownload";
interface popupType {
  setIsPopupEdit: (isPopupEdit: boolean) => void;
  data: dataType[];
  setData: (datas: dataType[]) => void;
  id: number | undefined;
}

export default function PopupEdit({
  setIsPopupEdit,
  data,
  id,
  setData,
}: popupType): JSX.Element {
  // State for form inputs
  const [creator, setCreator] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileImage, setFileImage] = useState<string>("");

  // Find the item with the matching id
  const selectedItem = data.find((item) => item.id === id);
 // Populate input fields with existing data when component mounts
 useEffect(() => {
  if (selectedItem) {
    setCreator(selectedItem.creator);
    setFileName(selectedItem.fileName);
    setFileImage(selectedItem.fileImage);
  }
}, [selectedItem]);

  // If no item found or id is undefined, return null or handle it accordingly
  if (!selectedItem || id === undefined) {
    return null; // You can customize the behavior if needed
  }

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the item with the new values
    const updatedItem = { ...selectedItem, creator, fileName, fileImage };
    // Update the data array with the updated item
    const updatedData = data.map((item) =>
      item.id === id ? updatedItem : item
    );
    // Update the state with the new data
    setData(updatedData);
    // Close the popup
    setIsPopupEdit(false);
  };

  return (
    <>
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={() => setIsPopupEdit(false)}
    ></div>
    <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 shadow-lg bg-white rounded-lg p-6">
      <div
        onClick={() => {
          setIsPopupEdit(false);
        }}
        className="absolute top-3 right-3 w-6 h-6 cursor-pointer"
      >
        <RxCross2 />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Form update</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="creator"
            className="block font-medium text-gray-900"
          >
            Creator Name
          </label>
          <input
            id="creator"
            name="creator"
            type="text"
            autoComplete="off"
            required
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="fileName"
            className="block font-medium text-gray-900"
          >
            File Name
          </label>
          <input
            id="fileName"
            name="fileName"
            type="text"
            autoComplete="off"
            required
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block font-medium text-gray-900"
          >
            Choose Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            autoComplete="off"
            required
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFileImage(reader.result as string); // Set Base64 encoded data (type casting)
                };
                reader.readAsDataURL(file);
              } else {
                setFileImage(""); // Clear fileImage if no file selected
              }
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {fileImage && (
            <img
              src={fileImage}
              alt="Selected"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 py-2 px-4 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </>
  );
}
