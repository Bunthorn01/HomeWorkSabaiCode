import { createContext, useContext, useState } from "react";
import { dataType } from "../pages/ChromeDownload";

interface childType {
    child: React.ReactNode;
}

//create context object
interface ContextProviderProps {
    data: dataType[];
    setData: (data: dataType[]) => void;
    search: string;
    setSearch: (search: string) => void;
    catchId: number | undefined;
    setCatchId: (catchId: number) => void;
    isMatch: boolean;
    setIsMatch: (isMatch: boolean) => void;
    isUpdate: boolean;
    setIsUpdate: (isUpdate: boolean) => void;
    isPopup: boolean;
    setIsPopup: (isPopup: boolean) => void;
    isPopupEdit: boolean;
    setIsPopupEdit: (isPopupEdit: boolean) => void;
}
const Context = createContext<ContextProviderProps> (
    {} as ContextProviderProps
);

export const Provider = () => useContext(Context);

function ContextProvider({ child }: childType) {
    const [data, setData] = useState<dataType[]> ([]);
    const [search, setSearch] = useState<string> ("");
    const [catchId, setCatchId] = useState<number | undefined> ();
    const [isMatch, setIsMacth] = useState<boolean> (false);
    const [isUpdate, setIsUpdate] = useState<boolean> (false);
    const [isPopup, setIsPopup] = useState<boolean> (false);
    const [isPopupEdit, setIsPopupEdit] = useState<boolean> (false);

    return (
        <Context.Provider
            value={{
                data: data,
                setData: setData,
                search: search,
                setSearch: setSearch,
                catchId: catchId,
                setCatchId: setCatchId,
                isMatch: isMatch,
                setIsMatch: setIsMacth,
                isUpdate: isUpdate,
                setIsUpdate: setIsUpdate,
                isPopup: isPopup,
                setIsPopup: setIsPopup,
                isPopupEdit: isPopupEdit,
                setIsPopupEdit: setIsPopupEdit
            }} 
        >
            {child}
        </Context.Provider>
    )
}

export default ContextProvider;

