
import { ResponsiveLine } from '@nivo/line'
import { myTheme } from '../chartData/myTheme'
import * as d3 from 'd3';


const CustomTooltip = ({ point }) => {
    return (
      <div
        style={{
          background: 'rgba(218, 165, 32, 0.5)',
          borderRadius: '5px',
          fontSize: '12px',
          padding: '5px',
          margin: '3px',
          border: '1px solid white'
        }}
      >
        <p style={{ fontWeight: 'bold', margin: 0 }}>ID: {point.serieId}</p>
        <p style={{ margin: 0 }}>X: {point.data.xFormatted}</p>
        <p style={{ margin: 0 }}>Y: {point.data.yFormatted}</p>
      </div>
    );
  };

  const formatCurrency = (value) => {
    return '$' + d3.format(',.2f')(Number(value.replace(/[^0-9.-]+/g,"")))
  }
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const LineChart = ({ data /* see data tab */ }) => {
    
    // Define the date ranges for the x-axis
const startDate = new Date('2017-12-01');
const endDate = new Date('2018-12-01');

// Convert the dates to timestamps
const startTimestamp = startDate.getTime();
const endTimestamp = endDate.getTime();

// Compute the number of milliseconds between the two dates
const delta = endTimestamp - startTimestamp;

// Divide the delta by 10 to get the step size
const step = delta / 10;

// Create an array of tick values by adding the step size to the start timestamp
const tickValues = Array.from({ length: 11 }, (_, i) => startTimestamp + i * step);

// Convert the tick values back to dates and format them as strings
const tickLabels = tickValues.map(timestamp => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
});


    return (
    <ResponsiveLine
        theme = {myTheme}
        data={data}
        tooltip={CustomTooltip}
        margin={{ top: 50, right: 110, bottom: 80, left: 100 }}
        xScale={{ 
            // type: 'point',
            type: 'time',
            format: '%Y-%m-%d',
            precision: 'month',
            useUTC:false,
        
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',

        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            // orient: 'bottom',
            //tickValues: data[0].data.filter((d, i) => i % 30 === 0).map(d => d.x),
      
            // tickValues: 'every 1 month',
            format:'%b-%y',
            //tickValues: 5,
            tickSize: 6,
            tickPadding: 5,
            tickRotation: 90,
            legend: 'Dates',
            legendOffset: 0,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'price',
            legendOffset: -60,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 10,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)}