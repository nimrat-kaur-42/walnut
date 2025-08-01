import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

function calculateGrowth(principal, rate, years) {
  return principal * Math.pow(1 + rate, years);
}

function Chart({ totalSaved, totalInvested, savingsRate, investmentRate }) {
  const years = 10;
  const data = [];

  for (let year = 0; year <= years; year++) {
    data.push({
      year: `Year ${year}`,
      saved: Number(calculateGrowth(totalSaved, savingsRate, year).toFixed(2)),
      invested: Number(calculateGrowth(totalInvested, investmentRate, year).toFixed(2)),
    });
  }

  return (
    <div style={{ overflowX: 'auto', scrollBehavior: 'smooth', width: '100%' }}>
      <div style={{ width: '1000px', height: '300px' }}>
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



// not sure if bar chart or line chart is better so i'm putting line chart code in comments

// import React from 'react';
// import {
//     LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';

// function calculateGrowth (principal, rate, years){
//     return principal * Math.pow((1 + rate), years);
// }

// function Chart ({ totalSaved, totalInvested, savingsRate, investmentRate }) {
//     const data = [];
//     const years = 10; // Projecting for 10 years

//     for (let year = 0; year <= years; year++) {
//         data.push({
//             year: `Year ${year}`,
//             saved: Number(calculateGrowth(totalSaved, savingsRate, year).toFixed(2)),
//             invested: Number(calculateGrowth(totalInvested, investmentRate, year).toFixed(2)),
//         });
//     }

//     return (
//        <div style ={{ width: '100%', height: 300 }}>
//         <ResponsiveContainer>
//             <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="year" />
//                 <YAxis />
//                 <Tooltip formatter={(val) => `$${val}`}/>
//                 <Legend />
//                 <Line type="monotone" dataKey="saved" stroke="#C59B6C" strokeWidth={3} name="Savings" />
//                 <Line type="monotone" dataKey="invested" stroke="#8B572A" strokeWidth={3} name="Investments" />
//             </LineChart>
//         </ResponsiveContainer>
//     );
// }

// export default Chart;