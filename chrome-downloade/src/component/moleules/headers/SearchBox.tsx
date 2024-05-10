import { IconSearch } from "../../atoms/icons";
import { setSearchDataProp } from "../../templates/Header";
function SearchBox({ setSearchData }: setSearchDataProp) {
  return (
    <div className="flex items-center w-1/2 bg-gray-500 px-4 rounded-3xl focus-within:ring-2 focus-within:ring-blue-500">
      <IconSearch prop={"text-white bg-gray-500"} />
      <input
        type="text"
        name=""
        id=""
        placeholder="Search downloads"
        className="ml-2 px-2 py-2 bg-gray-500 text-white focus:outline-none flex-grow"
        onChange={(e) => setSearchData(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;
