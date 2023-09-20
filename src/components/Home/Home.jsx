/* eslint-disable react/prop-types */
// import React, { useEffect, useState } from "react";
import { useState } from "react";
// import { useUserAuth } from "../store/useUserAuth";
// import { useNavigate } from "react-router-dom";
import { data } from "../../../data";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

const ImageCard = ({ item }) => {
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({ id: item.id });
  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <div className="border-2 border-black  hover:bg-white hover:border-white transition-all ease-in-out delay-100 duration-150 ">
      <img
        src={item.imagePath}
        alt=""
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        draggable="true"
        className=" w-full max-h-[150] border-2 border-white bg-white"
      />
    </div>
  );
};
const Home = () => {
  // const navigate = useNavigate();
  // const [error, setError] = useState(null);
  // const [datas, setData] = useState(data);
  const [filteredList, setFilteredList] = new useState(data);
  // const { currentUser } = useUserAuth();
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const onDragEnd = (e) => {
    const { active, over } = e;
    if (active.id === over.id) {
      return;
    }
    setFilteredList((filteredList) => {
      const oldIndex = filteredList.findIndex((item) => item.id === active.id);
      const newIndex = filteredList.findIndex((item) => item.id === over.id);
      return arrayMove(filteredList, oldIndex, newIndex);
    });
  };
  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...data];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.tags.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  return (
    <div className=" bg-[#100]">
      <div className="search-header flex flex-col justify-center mx-auto items-center align-middle">
        <div className="">Search:</div>
        <input
          id="search-box"
          type="text"
          className="w-[50%]"
          onChange={filterBySearch}
        />
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        modifiers={[restrictToWindowEdges]}
        sensors={sensors}
      >
        <SortableContext
          items={filteredList}
          strategy={rectSwappingStrategy}
          useDragOverlay={true}
          {...filteredList}
        >
          {filteredList.length > 0 ? (
            <div className="px-10 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {filteredList.map((item, i) => (
                <ImageCard key={i} item={item} />
              ))}
            </div>
          ) : (
            <p className=" text-red-700">No Result found</p>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Home;
