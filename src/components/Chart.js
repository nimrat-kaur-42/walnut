import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

function calculateGrowth(principal, rate, years) {
  return principal * Math.pow(1 + rate, years);
}

function Chart({ totalSaved, totalInvested, savingsRate, investmentRate }) {
  const yearMarks = [5, 10, 20];
  const data = yearMarks.map((year) => ({
    year: `${year} Years`,
    saved: Number(calculateGrowth(totalSaved, savingsRate, year).toFixed(2)),
    invested: Number(calculateGrowth(totalInvested, investmentRate, year).toFixed(2)),
  }));

  return (
    <div style={{ overflowX: 'auto', scrollBehavior: 'smooth', width: '100%' }}>
      <div style={{ width: '100%', maxWidth: '600px', height: '300px', margin: '0 auto' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(val) => `$${val}`} />
            <Legend />
            <Bar dataKey="invested" fill="#8B572A" name="Investments" />
            <Bar dataKey="saved" fill="#C59B6C" name="Savings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;
