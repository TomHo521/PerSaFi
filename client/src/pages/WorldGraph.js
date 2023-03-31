import { MyChoropleth }from "../charts/chloropleth"
//import { chloroplethData} from '../chartData/chloroplethData';

import worldMap from '../chartData/world_countries.json'
import { chloroplethData as globalIncomeData} from '../chartData/globalincome.js'


export default function World() {
 
  const tooltip = (feature) => {

    if (feature.feature && feature.feature.properties && feature.feature.properties.name
        && feature.feature.data && feature.feature.data.medianIncome) {
      return (

        <div className="map-tooltip">  
            <table>
                <tbody>
                <tr>
                     <td className="map-tooltip-name" style={{ fontWeight: 'bold',  }}>{feature.feature.properties.name}</td>
                </tr>
                <tr>
                    <td className="map-tooltip-value" style={{  }}>Median Income</td>
                    <td className="map-tooltip-value" style={{  }}>${feature.feature.data.medianIncome}</td>
                </tr>
                <tr>
                    <td className="map-tooltip-value" style={{ }}>Land Area (km)</td>
                    <td className="map-tooltip-value" style={{  }}>{feature.feature.data.landAreaKm}</td>
                </tr>
                <tr>
                    <td className="map-tooltip-value" style={{  }}>Population</td>
                    <td className="map-tooltip-value" style={{  }}>{feature.feature.data.pop2023}</td>
                </tr>
  
            
                </tbody>
            </table>
        </div>
      );
    } else {
      return <span>No Data Available</span>; // or some default tooltip text
    }
  };

  return (<div className="worldData">
    Global Annual Median Income (USD)
    <MyChoropleth data={globalIncomeData} mapFeatures={worldMap} domain={[0,26000]} scale={180}
      projectionTranslation={[0.5, 0.5]} tooltip={tooltip} />
  </div>)
}
