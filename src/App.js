import { hot } from 'react-hot-loader';
import React, { useState, useEffect } from 'react';
import DatePicker from './components/DatePicker.js';
import Table from './components/Table.js';

import { fetchAdInsights, fetchAdBudget } from './utilities/SBLY_API.js';
import './App.css';

// Start date to fetch ad insight data
const START_DATE = new Date('2020-01-01');
// End date to fetch ad insight data
const END_DATE = new Date('2020-01-05');
// Columns to show in UI. If undefined, all columns from ad insight data will be
// shown
const COLS = [
  'id',
  'spend',
  // 'revenue',
  // 'impressions',
  // 'clicks',
  'profitMargin',
  'weightedAvgOfProfMarg',
  'budget',
  'newBudget',
];
// Names to show in table for columns
const COL_NAMES = {
  id: 'ID',
  spend: 'Spending',
  revenue: 'Revenue',
  impressions: 'Impressions',
  clicks: 'Total Clicks',
  profitMargin: 'Profit Margin',
  weightedAvgOfProfMarg: 'Weighted Average of Profit Margin',
  budget: 'Current Budget',
  newBudget: 'Proposed New Budget',
};

function App() {
  const [date, setDate] = useState(START_DATE.toISOString().substring(0, 10));
  const [data, setData] = useState({});
  const [cols, setCols] = useState([]);

  // Function was created so it can be passed into DatePicker component
  const changeDate = (d) => {
    setDate(d);
  };

  const computeProfitMargin = (ad) => {
    return (ad.revenue - ad.spend) / ad.spend;
  };

  const computeWeightedAvgOfProfMarg = (performDate, mostRecentDate, ad) => {
    let spendWeight = ad.spend;
    let recencyWeight = Math.pow(
      0.5,
      Math.abs(
        (performDate.getTime() - mostRecentDate.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
    return spendWeight * recencyWeight;
  };

  const computeNextBudget = (ad) => {
    return (1 + ad.weightedAvgOfProfMarg) * ad.budget;
  };

  // When component is mounted, fetch ad insight data and compute additional values
  useEffect(() => {
    if (!data.length) {
      fetchAdInsights(START_DATE, END_DATE).then((adInsights) => {
        // For each day of ad insight data, compute profit margin, weighted
        // average of profit margin, and new budget for each ad
        for (let date in adInsights) {
          adInsights[date].forEach((ad) => {
            ad.profitMargin = parseFloat(computeProfitMargin(ad).toFixed(2));
            ad.weightedAvgOfProfMarg = parseFloat(
              computeWeightedAvgOfProfMarg(
                new Date(date),
                END_DATE,
                ad
              ).toFixed(2)
            );
            fetchAdBudget(ad.id).then((budget) => {
              ad.budget = budget.budget;
              ad.newBudget = parseFloat(computeNextBudget(ad).toFixed(2));
            });
          });
        }
        setTimeout(() => setData(adInsights), 1000);
        if (COLS.length) {
          setCols(COLS);
        } else {
          setCols(Object.keys(adInsights[Object.keys(adInsights)[0]][0]));
        }
      });
    }
  }, []);

  // Render when all data has been loaded and calculated
  if (Object.keys(data).length) {
    return (
      <div className="App">
        <h1>Maximo Macchi - SBLY Interview</h1>
        <DatePicker
          date={date}
          changeDate={changeDate}
          min={START_DATE}
          max={END_DATE}
        />
        <Table cols={cols} data={data[date]} colNames={COL_NAMES} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Maximo Macchi - SBLY Interview</h1>
        <h2>Loading...</h2>
      </div>
    );
  }
}

export default hot(module)(App);
