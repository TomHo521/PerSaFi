
import { ResponsiveChoropleth } from '@nivo/geo';
import worldMap from '../chartData/world_countries.json'
import { chloroplethData } from '../chartData/globalincome.js'
//import { chloroplethData } from '../chartData/chloroplethData'



const handleClick = (geography) => {
    // Find the matching feature in the data
    // const matchingFeature = data.find((feature) => feature.id === geography.id);
    
    // // Set the selected feature state
    // setSelectedFeature(matchingFeature);

    // Log the selected feature to the console
    //console.log('You clicked: ', geography);
  };


// const tooltip = (feature) => {
//     //console.log(feature.feature.properties.NAME);

//     //let name1 = feature.feature.properties.name
//     if (feature.feature && feature.feature.properties && feature.feature.properties.name
//         && feature.feature.data && feature.feature.data.medianIncome) {
//       return (
//         // <div className="map-tooltip">
//         //   {/* <div className="map tooltip color" style={{ backgroundColor: feature.feature.color }} /> */}
//         //     <div style={{fontweight: 'bold'}} className="map-tooltip name">{feature.feature.properties.name}</div>
//         //     <div className="map-tooltip value">
//         //         Median Income 
//         //         ${feature.feature.data.medianIncome}
//         //     </div>
//         //     <div className="map-tooltip value">
//         //     Land Area (km) {feature.feature.data.landAreaKm}
//         //     </div>
//         //     <div className="map-tooltip value">
//         //     Population {feature.feature.data.pop2023}
//         //     </div>
//         // </div>
//         <div className="map-tooltip">  
//             <table>
//                 <tbody>
//                 <tr>
//                      <td className="map-tooltip-name" style={{ fontWeight: 'bold',  }}>{feature.feature.properties.name}</td>
//                 </tr>
//                 <tr>
//                     <td className="map-tooltip-value" style={{  }}>Median Income</td>
//                     <td className="map-tooltip-value" style={{  }}>${feature.feature.data.medianIncome}</td>
//                 </tr>
//                 <tr>
//                     <td className="map-tooltip-value" style={{ }}>Land Area (km)</td>
//                     <td className="map-tooltip-value" style={{  }}>{feature.feature.data.landAreaKm}</td>
//                 </tr>
//                 <tr>
//                     <td className="map-tooltip-value" style={{  }}>Population</td>
//                     <td className="map-tooltip-value" style={{  }}>{feature.feature.data.pop2023}</td>
//                 </tr>
  
            
//                 </tbody>
//             </table>
//         </div>
//       );
//     } else {
//       return <span>No Data Available</span>; // or some default tooltip text
//     }
//   };
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyChoropleth = (props) => {
    
    return (
    <ResponsiveChoropleth
        data={props.data}
        onClick={handleClick}
        features={props.mapFeatures.features}
        projectionScale={props.scale}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={props.domain}
        unknownColor="#666666"
        label='"feature.properties.name"'
        valueFormat=".2s"
        projectionTranslation={props.projectionTranslation}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            },
            {
                id: 'gradient',
                type: 'linearGradient',
                colors: [
                    {
                        offset: 0,
                        color: '#000'
                    },
                    {
                        offset: 100,
                        color: 'inherit'
                    }
                ]
            }
        ]}
        fill={[
            {
                match: {
                    id: 'CAN'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'CHN'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'ATA'
                },
                id: 'gradient'
            }
        ]}
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                //itemTextColor: '#444444',
                itemTextColor:'#ffffff',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#2b3452',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        tooltip={props.tooltip}
    />
)}