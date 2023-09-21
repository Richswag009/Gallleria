/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { data } from "../../../data";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  // Sortable,
  arraySwap,
  rectSwappingStrategy,
  // rectSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import styled from "styled-components";
const Home = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      return arraySwap(filteredList, oldIndex, newIndex);
    });
  };

  const filterBySearch = (event) => {
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

  useEffect(() => {
    setFilteredList(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="mt-10">
      <div className="flex flex-col justify-center mx-auto items-center align-middle">
        <input
          id="search-box"
          type="text"
          className="w-[82%] md:w-[50%]"
          onChange={filterBySearch}
          placeholder="Search for tags "
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
          // strategy={rectSwappingStrategy}
          // useDragOverlay={false}
          {...filteredList}
          strategy={rectSwappingStrategy}
          reorderItems={arraySwap}
          getNewIndex={({ id, filteredList, activeIndex, overIndex }) =>
            arraySwap(filteredList, activeIndex, overIndex).indexOf(id)
          }
        >
          {" "}
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="px-10 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
              {filteredList.map((item, i) => (
                <ImageCard key={i} item={item} />
              ))}
            </div>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Home;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  margin-top: 50px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
