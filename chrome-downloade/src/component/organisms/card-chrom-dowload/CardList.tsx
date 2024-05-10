import { dataType } from "../../../pages/ChromeDownload";
import Card from "./Card";

export interface CardListProps {
  props: {
    data: dataType[];
    setIsMatch: (isMatch: boolean)=> void,
    setCatchId: (catchId: number)=> void
    setIsUpdate: (isUpdate: boolean) => void
  };
}

function CardList({ props }: CardListProps) {
 const data = props.data;
 const handleSetIsMatch = props.setIsMatch;
 const handleSetCatchId = props.setCatchId;
 const handleSetIsUpdate = props.setIsUpdate
  return (
    <div key={""} className=" grid grid-cols-1 gap-5 mt-20">
      {data.map((item, key) => (
        <Card
          key={key}
          props={{
            ...item,
            setIsMatch: handleSetIsMatch,
            setCatchId: handleSetCatchId,
            setIsUpdate: handleSetIsUpdate
          }}
        />
      ))}
    </div>
  );
}

export default CardList;
