import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialList = [
  {
    id: 'p1',
    title: 'Project #1',
    description: 'Description of project 1',
  },
  {
    id: 'p2',
    title: 'Project #2',
    description: 'Description of project 2',
  },
  {
    id: 'p3',
    title: 'Project #3',
    description: 'Description of project 3',
  },

];

function App() {



  const [resumeItems, updateCharacters] = useState(initialList);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(resumeItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

    return ( 
      <div>
        my resume:

        <DragDropContext onDragEnd={handleOnDragEnd}>

          <Droppable droppableId="resumeItems">

            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {resumeItems.map(({title, description, id}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li className="resumeItems" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div>{title}</div>
                          <div>{description}</div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}

          </Droppable>
        </DragDropContext> 
      </div>
  ); 
}
export default App;
