import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Transaction } from '../types/finance';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SpendingChartProps {
  transactions: Transaction[];
}

export function SpendingChart({ transactions }: SpendingChartProps) {
  const spendingByCategory = transactions
    .filter(t => t.type === 'expense' && t.category)
    .reduce((acc, curr) => {
      const category = curr.category!.type;
      acc[category] = (acc[category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(spendingByCategory).map(cat => 
      cat.charAt(0).toUpperCase() + cat.slice(1)
    ),
    datasets: [
      {
        data: Object.values(spendingByCategory),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            return `€${value.toFixed(2)}`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Wo gibst du dein Geld aus?</h2>
      <div className="w-full max-w-md mx-auto">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
