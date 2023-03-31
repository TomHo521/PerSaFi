import { LineChart } from "../charts/linechart"
import { lineChartData } from "../chartData/LineChartData"
import BoxComponent from "./box";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React, { useState, useEffect } from 'react';
import defaultTickerState from '../chartData/spymonthly.json';
// import secondDefaultTickerState from '../chartData/
import StockForm from '../components/subcomponents/stockForm'

import defaultState from '../chartData/spyDefault.json';




function generateHslaColors (saturation, lightness, alpha, amount) {
  let colors = []
  let huedelta = Math.trunc(360 / amount)

  for (let i = 0; i < amount; i++) {
    let hue = i * huedelta
    colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`)
  }

  return colors;
}




export default function StockChart() {

  const [stockParams, setStockParams] = useState({
    ticker: 'SPY',
    startDate: '2010-01-29',
    endDate: '2023-03-12',
  });

  const [tickerStates, setTickerStates] = useState({
    'SPY':defaultTickerState,
  });

  const [defaultGraphState, setDefaultGraphState] = useState(defaultState);

  //useEffect(() => {}, [defaultGraphState]);


  useEffect(() => {
    //console.log('useeffect tickerStates called');
    const startDate = new Date(stockParams.startDate);
    const endDate = new Date(stockParams.endDate);

    let temp = Object.keys(tickerStates[stockParams.ticker]["Monthly Time Series"])
      .filter(e => {
              let thisDate = new Date(e);
              return thisDate <= endDate && thisDate >= startDate
              })

      let formattedData = temp.map(marketDate => {
      //let t = new Date(marketDate);
      let singleTickerDateInfo = {
      x: marketDate,
      y: tickerStates[stockParams.ticker]["Monthly Time Series"][marketDate]["4. close"]
      }
      return singleTickerDateInfo;
      });

      let final =  [{
      "id": stockParams.ticker,
      "color": "hsl(149, 70%, 50%)",
      "data": formattedData
      }]
      
      setDefaultGraphState(final);

  }, [tickerStates])

  useEffect(() => {
      //console.log('useeffect stockParams called');
      fetchTickerState().then((apiResponse) => {
      var updatedTickerStates = {...tickerStates};
      updatedTickerStates[stockParams.ticker] = apiResponse;
      setTickerStates(updatedTickerStates)

    }).catch((error) => {
      console.log('async call for fetch not working');
    });

  }, [stockParams]);

  
  async function fetchTickerState() {
    const apiKey = 'HLEJL64941S8WXTM'
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stockParams.ticker}&outputsize=full&apikey=${apiKey}`;
    //console.log('fetch function called w url, ', url);
    try {
      const response = await fetch(url);
      const tickerState = await response.json();
      //console.log('exact tickerState returned: ', tickerState);

      return tickerState;
    } catch (error) {
      console.log(`Error fetching data for ticker ${stockParams.ticker}`, error);
    }
  }

  return (<div className="stocks">
    <LineChart data={defaultGraphState}/> 
    <StockForm setStockParams={setStockParams}/>
  </div>)
}



    // const timeSeriesData = data['Time Series (Monthly))'];
    // const formattedData = [];

    // for (const date in timeSeriesData) {
    //   const formattedDate = new Date(date);
    //   const formattedMonthYear = `${formattedDate.getMonth() + 1}/${formattedDate.getFullYear().toString().slice(-2)}`;
    //   const formattedObject = {
    //     x: formattedMonthYear,
    //     y: parseFloat(timeSeriesData[date]['4. close'])
    //   };
    //   formattedData.push(formattedObject);
    // }

    // const spData = [
    //   {
    //     "id": "SP 500",
    //     "color": "hsl(149, 70%, 50%)",
    //     "data": formattedData
    //   }];


    //***fake data */
    // var generateFakeStockData = (numGraphs, numPoints, range = 0) => {
    //   let selectableColors = generateHslaColors(50, 100, 1.0, 9);
      
    //   var fakeStockData = [];
    //   let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  
    //   for (var i = 0; i < numGraphs; i++) {
    //     var nextObj = {};
    //     let id = "stock #" + `${i}`;
    //     nextObj.id = id;
    //     nextObj.color = selectableColors[i];
    //     nextObj.data = [];
    //     let rate = 1 + Math.random()/8;
    //     let portfolio = 1000;
  
    //     for (var j = 0; j < numPoints; j++) {
    //       portfolio *= rate;
    //       var newDataPoint = {
    //         x: months[j % 12],
    //         y: portfolio,
    //       }
    //       nextObj.data.push(newDataPoint)
    //     }
    //     fakeStockData.push(nextObj);
    //   }
  
    //   return fakeStockData;
      
    // }
  
    // var ldata = generateFakeStockData(5, 10);