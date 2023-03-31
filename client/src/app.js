import About from './pages/about';
import Home from './pages/home';
import StockChart from './pages/StockChart';
import RootLayout from './pages/RootLayout';
import PieChart from './pages/PieChart';
import React, { useState } from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import BarChartPage from './pages/barChartPage';
import WorldGraph from './pages/WorldGraph';
import LoanCalculator from './pages/LoanCalculator';
import NetworkGraph from './pages/NetworkGraph';
import USGraph from './pages/USgraph';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="stocks" element={<StockChart/>}/>
      <Route path="progress" element={<PieChart/>}/>
      <Route path="barChartPage" element={<BarChartPage/>}/>
      <Route path="world" element={<WorldGraph/>}/>
      <Route path="loancalculator" element={<LoanCalculator/>}/>
      <Route path="networkGraph" element={<NetworkGraph/>}/>
      <Route path="USgraph" element={<USGraph/>}/>
    </Route>
  )
);


export function App() {
  return (
    <RouterProvider router={router}/>
  );
}

// export default App;
// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const initialList = [
//   {
//     id: 'p1',
//     title: 'Project #1',
//     description: 'Description of project 1',
//   },
//   {
//     id: 'p2',
//     title: 'Project #2',
//     description: 'Description of project 2',
//   },
//   {
//     id: 'p3',
//     title: 'Project #3',
//     description: 'Description of project 3',
//   },

// ];

// function App() {



//   const [resumeItems, updateCharacters] = useState(initialList);

//   function handleOnDragEnd(result) {
//     if (!result.destination) return;

//     const items = Array.from(resumeItems);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     updateCharacters(items);
//   }

//     return ( 
//       <div>
//         my resume:

//         <DragDropContext onDragEnd={handleOnDragEnd}>

//           <Droppable droppableId="resumeItems">

//             {(provided) => (
//               <ul {...provided.droppableProps} ref={provided.innerRef}>
//                 {resumeItems.map(({title, description, id}, index) => {
//                   return (
//                     <Draggable key={id} draggableId={id} index={index}>
//                       {(provided) => (
//                         <li className="resumeItems" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                           <div>{title}</div>
//                           <div>{description}</div>
//                         </li>
//                       )}
//                     </Draggable>
//                   );
//                 })}
//                 {provided.placeholder}
//               </ul>
//             )}

//           </Droppable>
//         </DragDropContext> 
//       </div>
//   ); 
// }
export default App;
