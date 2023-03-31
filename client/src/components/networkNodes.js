import { ResponsiveNetwork} from '@nivo/network';
import { useState } from 'react';
import adjList from '../chartData/adjList.json';

export default function MyNetworkGraph() {
  const [activeNode, setActiveNode] = useState(null);

  const graphData = {
    nodes: [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' },
      { id: 'D' },
      { id: 'E' },
      { id: 'F' },
    ],
    links: [
      { source: 'A', target: 'B', distance: 10 },
      { source: 'A', target: 'C', distance: 20 },
      { source: 'B', target: 'D', distance: 30 },
      { source: 'C', target: 'E', distance: 40 },
      { source: 'D', target: 'F', distance: 50 },
      { source: 'E', target: 'F', distance: 60 },
    ],
  };

  function handleNodeClick(node) {
    setActiveNode(node.id);
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  return (
    <ResponsiveNetwork
      data={adjList}
      //fit={true}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      linkDistance={function(e){return e.distance}}
      centeringStrength={0.3}
      repulsivity={60}
      // nodeSize={function(n){return n.size}}
      nodeSize={24}
      activeNodeSize={50}
      //activeNodeSize={function(n){return 1.5*n.size}}
      //nodeColor={function(e){return e.color}}
      nodeBorderWidth={1}
      nodeColor={getRandomColor}
      nodeBorderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  0.8
              ]
          ]
      }}
      linkThickness={function(n){return 2+2*n.target.data.height}}
      linkBlendMode="multiply"
      motionConfig="wobbly"
      
    />


    
  );
}
