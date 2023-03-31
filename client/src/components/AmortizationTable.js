import React, { useState, useEffect } from 'react';
import {pmt, ipmt, ppmt} from '../mymodules/amortization';
import StickyHeadTable from './myStickyHeader';
import LoanForm from './subcomponents/loanForm';
import ConclusionTable from './ConclusionTable';


function AmortizationTable() {
  const [tableParams, setTableParams] = useState({
    principal: 0,
    interestRate: 0.00,
    loanTerm: 0,
    paymentsPerYear: 0,
  });

  const [totalInterest, setTotalInterest] = useState(0);

  const [amortizationTable, setAmortizationTable] = useState([]);

  const handleCompute = () => {
  
    const { principal, interestRate, loanTerm, paymentsPerYear } = tableParams;

    // calculate the monthly payment and create an array of arrays representing the amortization table
    const monthlyInterestRate = interestRate / (12 * 100);
    const totalPayments = loanTerm * paymentsPerYear;
    const monthlyPayment = pmt(monthlyInterestRate, totalPayments, principal) * -1;
    var table = [];
    var interestAccumulator = 0;
    let principalRemaining = principal;
    for (let i = 1; i <= totalPayments; i++) {
      const interest = principalRemaining * monthlyInterestRate;
      interestAccumulator += interest;
      const principalPayment = monthlyPayment - interest;
      principalRemaining -= principalPayment;
      let ratio = `${((interest*100)/monthlyPayment).toFixed(2)}%`;
      table.push({
        period:i,
        pmt:`$${monthlyPayment.toFixed(2)}`,
        ppmt:`$${principalPayment.toFixed(2)}`,
        ipmt:`$${interest.toFixed(2)}`,
        ratio_i: ratio,
        loan:`$${principalRemaining.toFixed(2)}`,
    });
    }
  
    setAmortizationTable(table);
    setTotalInterest(interestAccumulator);
  };

  useEffect(() => {
    handleCompute(); // call handleCompute function when tableParams changes
  }, [tableParams]);

  // const handleCompute = (e) => {
  //   e.preventDefault();
  //   const { principal, interestRate, loanTerm, paymentsPerYear } = tableParams;

  //   // calculate the monthly payment and create an array of arrays representing the amortization table
  //   const monthlyInterestRate = interestRate / (12 * 100);
  //   const totalPayments = loanTerm * paymentsPerYear;
  //   const monthlyPayment = pmt(monthlyInterestRate, totalPayments, principal);
  //   const table = [];
  //   let principalRemaining = principal;
  //   for (let i = 1; i <= totalPayments; i++) {
  //     const interest = principalRemaining * monthlyInterestRate;
  //     const principalPayment = monthlyPayment - interest;
  //     principalRemaining -= principalPayment;
  //     table.push([
  //       i,
  //       monthlyPayment.toFixed(2),
  //       principalPayment.toFixed(2),
  //       interest.toFixed(2),
  //       principalRemaining.toFixed(2),
  //     ]);
  //   }
  //   setAmortizationTable(table);
  // };

  console.log('parent call: ', amortizationTable);
  return (
    <div>
      <LoanForm setTable={setTableParams} initialVals={tableParams} />
     
      <div className='table-box'>
        <StickyHeadTable rows={amortizationTable} />
      </div>
      <div>
        <h2>Conclusions:</h2>
      </div>
      <div className='conclusion-table'>
        <ConclusionTable d={tableParams} totalInterest={totalInterest}/>
      </div>
    </div>
  );
}

export default AmortizationTable;