// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';

const Dashboard = () => {
  const [homeValue, setHomeValue] = useState(6600);
  const [downPayment, setDownPayment] = useState(2500);
  const [loanAmount, setLoanAmount] = useState(4100);
  const [interestRate, setInterestRate] = useState(7);
  const [tenure, setTenure] = useState(25);

  useEffect(() => {
    // Update loan amount to ensure it's always valid
    const newLoanAmount = homeValue - downPayment;
    if (loanAmount > newLoanAmount) {
      setLoanAmount(newLoanAmount);
    }
  }, [homeValue, downPayment, loanAmount]);

  const totalLoanMonths = tenure * 12;
  const interestPerMonth = interestRate / 100 / 12;
  const monthlyPayment = (loanAmount * interestPerMonth * Math.pow((1 + interestPerMonth), totalLoanMonths)) / (Math.pow((1 + interestPerMonth), totalLoanMonths) - 1);
  const totalInterestGenerated = (monthlyPayment * totalLoanMonths) - loanAmount;

  const data = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [loanAmount, totalInterestGenerated],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <>
      <h1>Bank of React</h1>
      <div className="dashboard">
        <div className="controls">
          <label>
            Home Value: ${homeValue}
            <input
              type="range"
              min="1000"
              max="10000"
              value={homeValue}
              onChange={(e) => setHomeValue(Number(e.target.value))}
            />
          </label>
          <label>
            Down Payment: ${downPayment}
            <input
              type="range"
              min="0"
              max={homeValue}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
            />
          </label>
          <label>
            Loan Amount: ${loanAmount}
            <input
              type="range"
              min="0"
              max={homeValue - downPayment}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </label>
          <label>
            Interest Rate: {interestRate}%
            <input
              type="range"
              min="2"
              max="18"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
            />
          </label>
          <label>
            Tenure: {tenure} years
            <select className='options' value={tenure} onChange={(e) => setTenure(Number(e.target.value))}>
              <option value="10">10 years</option>
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="25">25 years</option>
              <option value="30">30 years</option>
            </select>
          </label>
        </div>
        <div className="chart">
          <h2>Monthly Payment: ${monthlyPayment.toFixed(2)}</h2>
          <Pie data={data} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
