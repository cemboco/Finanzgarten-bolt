import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Scale, Calculator } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MetalPrice {
  price: number;
  change24h: number;
}

interface Weight {
  unit: string;
  value: number;
  label: string;
}

export function PreciousMetalsPage() {
  const [goldPrice, setGoldPrice] = useState<MetalPrice>({ price: 1876.50, change24h: 2.3 });
  const [silverPrice, setSilverPrice] = useState<MetalPrice>({ price: 23.15, change24h: -0.8 });
  const [weight, setWeight] = useState<number>(1);
  const [selectedUnit, setSelectedUnit] = useState<string>('oz');
  const [calculatedValue, setCalculatedValue] = useState<number>(0);

  const weights: Weight[] = [
    { unit: 'oz', value: 1, label: 'Unze (31,1g)' },
    { unit: 'g', value: 0.03215, label: 'Gramm' },
    { unit: 'kg', value: 32.15, label: 'Kilogramm' },
    { unit: 'lb', value: 14.58, label: 'Pfund (453,6g)' },
  ];

  // Simulierte historische Daten
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Gold',
        data: [1800, 1850, 1825, 1890, 1876.50, 1900, 1876.50],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
      },
      {
        label: 'Silber',
        data: [22, 23, 22.5, 23.5, 23.15, 24, 23.15],
        borderColor: 'rgb(148, 163, 184)',
        backgroundColor: 'rgba(148, 163, 184, 0.5)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Preisentwicklung der letzten 6 Monate'
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  useEffect(() => {
    const selectedWeight = weights.find(w => w.unit === selectedUnit)?.value || 1;
    setCalculatedValue(weight * selectedWeight * goldPrice.price);
  }, [weight, goldPrice.price, selectedUnit]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <PriceCard
          title="Gold"
          price={goldPrice.price}
          change24h={goldPrice.change24h}
          color="from-yellow-500 to-yellow-600"
        />
        <PriceCard
          title="Silber"
          price={silverPrice.price}
          change24h={silverPrice.change24h}
          color="from-gray-300 to-gray-400"
        />
      </motion.div>

      {/* Price Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <Line options={chartOptions} data={chartData} />
      </motion.div>

      {/* Gold Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edelmetallrechner</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gewicht
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Einheit
              </label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
              >
                {weights.map((w) => (
                  <option key={w.unit} value={w.unit}>
                    {w.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
            <p className="text-sm opacity-90 mb-1">Aktueller Wert</p>
            <p className="text-3xl font-bold">€{calculatedValue.toFixed(2)}</p>
          </div>

          {/* Weight Conversion Table */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Gewichtsumrechnungen
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Einheit
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Gold Wert
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Silber Wert
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {weights.map((w) => (
                    <tr key={w.unit}>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                        {w.label}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-300">
                        €{(goldPrice.price * w.value).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-300">
                        €{(silverPrice.price * w.value).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Market Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Markteinblicke</h2>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300">
            Gold gilt traditionell als sicherer Hafen in Zeiten wirtschaftlicher Unsicherheit.
            Der aktuelle Goldpreis spiegelt verschiedene globale Faktoren wider, darunter:
          </p>
          <ul className="text-gray-700 dark:text-gray-300">
            <li>Geopolitische Spannungen</li>
            <li>Inflationsraten</li>
            <li>Währungsschwankungen</li>
            <li>Zentralbankpolitik</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

interface PriceCardProps {
  title: string;
  price: number;
  change24h: number;
  color: string;
}

function PriceCard({ title, price, change24h, color }: PriceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-r ${color} rounded-xl shadow-lg p-6 text-white`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <Scale className="h-6 w-6" />
      </div>
      
      <p className="text-3xl font-bold mb-2">€{price.toFixed(2)}</p>
      
      <div className={`flex items-center gap-1 text-sm ${
        change24h >= 0 ? 'text-green-200' : 'text-red-200'
      }`}>
        <span>{change24h >= 0 ? '↑' : '↓'}</span>
        <span>{Math.abs(change24h)}% (24h)</span>
      </div>
    </motion.div>
  );
}
