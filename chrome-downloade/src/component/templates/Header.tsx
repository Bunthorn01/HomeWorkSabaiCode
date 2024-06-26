import LogoChromeAndTitle from "../moleules/headers/LogoChromeAndTitle";
import SearchBox from "../moleules/headers/SearchBox";
import { IoMdMore } from "react-icons/io";

export interface setSearchDataProp {
   setSearchData: (search: string) => void;
}

function Header({ setSearchData }: setSearchDataProp) {
   return (
      <header>
         <div className="z-10 fixed w-full flex items-center justify-between bg-black p-4">
            <LogoChromeAndTitle />
            <SearchBox setSearchData={setSearchData} />
            <div className=" ml-auto">
               {/* 25% width */}
               <IoMdMore className="text-white text-2xl" />
            </div>
         </div>
      </header>
   );
}

export default Header;
