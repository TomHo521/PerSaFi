import { MyResponsiveBar } from "../charts/MyResponsiveBar"
import { barChartData } from "../chartData/barChartData"
import { useState, useEffect} from 'react'
import BarChartForm from "../components/subcomponents/barChartForm"

export default function BarChartPage() {

  const [barChartParams, setBarChartParams] = useState({
    interestRate: 5.5,
    principal: 100000,
    term: 30,
    startRange: 4,
    endRange: 7,
    stepSize: .5,
  })

  const [barChartState, setBarChartState] = useState(barChartData)

  //helper function
  function calculateTotalInterest(loanAmount, interestRate, term) {
    interestRate/=100
    const nPeriods = term * 12; // convert years to months
    const monthlyRate = interestRate / 12.0;
    const monthlyPayment = (monthlyRate * loanAmount) / (1 - Math.pow(1 + monthlyRate, -nPeriods));
    const totalInterest = (monthlyPayment * nPeriods) - loanAmount;
    return totalInterest;
  }

  function computeNewBarChartState() {

    const newStateArray = [];

    for (var i = barChartParams.startRange; i <= barChartParams.endRange; i+= barChartParams.stepSize) {
      let newBar = {
          "Interest Rate": i.toFixed(2),
          "principal": Math.floor(barChartParams.principal/1000),
          "principalColor": "hsl(88, 60%, 50%)",
          "interest": Math.floor(calculateTotalInterest(barChartParams.principal, i, barChartParams.term)/1000),
          "interestColor": "hsl(48, 60%, 50%)",
        };
  
      newStateArray.push(newBar);
    }

    return newStateArray;
  }

  useEffect(() => {
    setBarChartState(computeNewBarChartState())
  }, [barChartParams]);
  
  useEffect(() => {
  }, [barChartState]);





  return (
  <div className="barChart">
    <h2>Total Interest Paid over the life of a 30 yr loan @ various rates</h2>
    <h4>Values in thousands</h4>
    <MyResponsiveBar data={barChartState}/>
    <BarChartForm setBarChartParams={setBarChartParams}/> 
  </div>)
}