import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [annualIncome, setAnnualIncome] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [hourlyPay, setHourlyPay] = useState(null);
  const [monthlyPay, setMonthlyPay] = useState(null);
  const [weeklyPay, setWeeklyPay] = useState(null);
  const [biWeeklyPay, setBiWeeklyPay] = useState(null);

  const [currentHourlyRate, setCurrentHourlyRate] = useState('');
  const [currentHoursPerWeek, setCurrentHoursPerWeek] = useState('');
  const [currentAnnualIncome, setCurrentAnnualIncome] = useState(null);
  const [currentMonthlyPay, setCurrentMonthlyPay] = useState(null);
  const [currentWeeklyPay, setCurrentWeeklyPay] = useState(null);
  const [currentBiWeeklyPay, setCurrentBiWeeklyPay] = useState(null);

  // Function to format number with commas
  const formatNumber = (number) => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Handle changes in annual income input
  const handleAnnualIncomeChange = (e) => {
    const value = e.target.value.replace(/,/g, ''); // Remove commas for calculation
    if (!isNaN(value)) {
      setAnnualIncome(formatNumber(value));
    }
  };

  // Handle changes in hours per week input
  const handleHoursPerWeekChange = (e) => {
    const value = e.target.value.replace(/,/g, ''); // Remove commas for calculation
    if (!isNaN(value)) {
      setHoursPerWeek(formatNumber(value));
    }
  };

  // Handle changes in current hourly rate input
  const handleCurrentHourlyRateChange = (e) => {
    const value = e.target.value.replace(/,/g, ''); // Remove commas for calculation
    if (!isNaN(value)) {
      setCurrentHourlyRate(formatNumber(value));
    }
  };

  // Handle changes in current hours per week input
  const handleCurrentHoursPerWeekChange = (e) => {
    const value = e.target.value.replace(/,/g, ''); // Remove commas for calculation
    if (!isNaN(value)) {
      setCurrentHoursPerWeek(formatNumber(value));
    }
  };

  // Calculate income from annual and hours per week
  useEffect(() => {
    if (annualIncome && hoursPerWeek) {
      const weeksPerYear = 52;
      const income = parseFloat(annualIncome.replace(/,/g, '')); // Remove commas for calculation
      const hours = parseFloat(hoursPerWeek.replace(/,/g, '')); // Remove commas for calculation
      const monthlyIncome = income / 12;
      const weeklyIncome = income / weeksPerYear;
      const totalHoursPerYear = hours * weeksPerYear;
      const hourlyRate = income / totalHoursPerYear;

      setHourlyPay(hourlyRate.toFixed(2));
      setMonthlyPay(monthlyIncome.toFixed(2));
      setWeeklyPay(weeklyIncome.toFixed(2));
      setBiWeeklyPay((weeklyIncome * 2).toFixed(2));
    } else {
      setHourlyPay(null);
      setMonthlyPay(null);
      setWeeklyPay(null);
      setBiWeeklyPay(null);
    }
  }, [annualIncome, hoursPerWeek]);

  // Calculate income from hourly rate and hours per week
  useEffect(() => {
    if (currentHourlyRate && currentHoursPerWeek) {
      const weeksPerYear = 52;
      const hourlyRate = parseFloat(currentHourlyRate.replace(/,/g, '')); // Remove commas for calculation
      const hours = parseFloat(currentHoursPerWeek.replace(/,/g, '')); // Remove commas for calculation
      const weeklyIncome = hourlyRate * hours;
      const annualIncome = weeklyIncome * weeksPerYear;
      const monthlyIncome = annualIncome / 12;
      const biWeeklyIncome = weeklyIncome * 2;

      setCurrentAnnualIncome(annualIncome.toFixed(2));
      setCurrentMonthlyPay(monthlyIncome.toFixed(2));
      setCurrentWeeklyPay(weeklyIncome.toFixed(2));
      setCurrentBiWeeklyPay(biWeeklyIncome.toFixed(2));
    } else {
      setCurrentAnnualIncome(null);
      setCurrentMonthlyPay(null);
      setCurrentWeeklyPay(null);
      setCurrentBiWeeklyPay(null);
    }
  }, [currentHourlyRate, currentHoursPerWeek]);

  return (
    <div className="App">
      <h1>Income Calculator</h1>

      {/* Calculate Income from Annual Income */}
      <div className="calculator-section">
        <h2>Calculate Hourly, Weekly, and Monthly Pay</h2>
        <div className="input-container">
          <label>Annual Income:</label>
          <input
            type="text"
            value={annualIncome}
            onChange={handleAnnualIncomeChange}
          />
        </div>
        <div className="input-container">
          <label>Hours per Week:</label>
          <input
            type="text"
            value={hoursPerWeek}
            onChange={handleHoursPerWeekChange}
          />
        </div>

        {/* Results section with fixed height */}
        <div className="results-container">
          {hourlyPay !== null ? (
            <div className="results">
              <h3>Results:</h3>
              <p>Hourly Pay: ${hourlyPay}</p>
              <p>Weekly Pay: ${weeklyPay}</p>
              <p>Bi-Weekly Pay: ${biWeeklyPay}</p>
              <p>Monthly Pay: ${monthlyPay}</p>
            </div>
          ) : (
            <div className="placeholder">
              Enter your annual income and hours per week to see the results.
            </div>
          )}
        </div>
      </div>

      <hr />

      {/* Calculate Income from Hourly Rate */}
      <div className="calculator-section">
        <h2>Calculate Annual, Monthly, Weekly, and Bi-Weekly Pay</h2>
        <div className="input-container">
          <label>Hourly Rate:</label>
          <input
            type="text"
            value={currentHourlyRate}
            onChange={handleCurrentHourlyRateChange}
          />
        </div>
        <div className="input-container">
          <label>Hours per Week:</label>
          <input
            type="text"
            value={currentHoursPerWeek}
            onChange={handleCurrentHoursPerWeekChange}
          />
        </div>

        {/* Results section with fixed height */}
        <div className="results-container">
          {currentAnnualIncome !== null ? (
            <div className="results">
              <h3>Results:</h3>
              <p>Annual Income: ${currentAnnualIncome}</p>
              <p>Monthly Pay: ${currentMonthlyPay}</p>
              <p>Bi-Weekly Pay: ${currentBiWeeklyPay}</p>
              <p>Weekly Pay: ${currentWeeklyPay}</p>
            </div>
          ) : (
            <div className="placeholder">
              Enter your hourly rate and hours per week to see the results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
*/