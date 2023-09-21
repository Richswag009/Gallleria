/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ImageCard = ({ item }) => {
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({ id: item.id });
  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <div className="border-2 border-black relative duration-150 ">
      <img
        src={item.imagePath}
        alt=""
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        draggable="true"
        className=" w-full h-full  border-2  hover:shadow-lg border-white bg-black"
      />
      <span className="absolute top-1 right-2 text-lg text-white font-extrabold ">
        {item.tags}
      </span>
    </div>
  );
};
export default ImageCard;
