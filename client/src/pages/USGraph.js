import { MyChoropleth }from "../charts/chloropleth"
//import USChloroplethData from '../chartData/gz_2010_us_050_00_20m.json'
import {county_data} from '../chartData/county_formatted2'
import US_county_features from '../chartData/county_features.json'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function USGraph() {

  const [xTranslate, setXTranslate] = useState(1.95);
  const [yTranslate, setYTranslate] = useState(1.7);
  const [zoom, setZoom] = useState(1270);

  const handleXChange = (event, newValue) => {
    setXTranslate(newValue);
  };

  const handleYChange = (event, newValue) => {
    setYTranslate(newValue);
  };

  const handleZoomChange = (event, newValue) => {
    setZoom(newValue);
  };


  useEffect(() => {}, [xTranslate, yTranslate, zoom])


  const tooltip = (feature) => {
    //console.log(feature);
    if (feature.feature && feature.feature.properties && feature.feature.properties.NAME
        && feature.feature.data && feature.feature.data.value && feature.feature.properties.CENSUSAREA) {
      return (
        <div className="us-map-tooltip">  
            <table>
                <tbody>
                <tr>
                     <td className="map-tooltip-name" style={{ fontWeight: 'bold',  }}>{feature.feature.properties.NAME + ' County'}</td>
                </tr>
                <tr>
                    <td className="map-tooltip-value" style={{  }}>Median Income</td>
                    <td className="map-tooltip-value" style={{  }}>${feature.feature.data.value}</td>
                </tr>
                <tr>
                    <td className="map-tooltip-value" style={{ }}>Land Area (km)</td>
                    <td className="map-tooltip-value" style={{  }}>{feature.feature.properties.CENSUSAREA}</td>
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
    US data by county
    <MyChoropleth data={county_data} domain={[30000, 65000]} mapFeatures={US_county_features} scale={zoom} 
    projectionTranslation={[xTranslate,yTranslate]} tooltip={tooltip} />




    <Box width={300}>
      <Box>
        <span>
          Zoom Out/In
          <Slider
            defaultValue={zoom}
            aria-label="Small"
            onChange={handleZoomChange}
            min = {800}
            max = {1500}
            valueLabelDisplay="auto"
          />
        </span>
      </Box>
      <Box>
        <span>
          X translate
          <Slider defaultValue={xTranslate} min={1} max={3} onChange={handleXChange} aria-label="Default" valueLabelDisplay="auto" />
        </span>
      </Box>
      <Box>
        <span>
          Y translate
          <Slider defaultValue={yTranslate} min={1} max={3} onChange={handleYChange} aria-label="Default" valueLabelDisplay="auto" />
        </span>
      </Box>
    </Box>


  </div>)
}