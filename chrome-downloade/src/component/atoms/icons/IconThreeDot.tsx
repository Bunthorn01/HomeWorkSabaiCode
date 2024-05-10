import { BsThreeDots } from "react-icons/bs";
interface props {
  prop?: string;
}

function IconThreeDot({ prop }: props) {
  return (
    <>
      <BsThreeDots className={prop} />
    </>
  );
}

export default IconThreeDot;
