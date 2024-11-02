import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Scale, Calculator } from 'lucide-react';

interface MetalPrice {
  price: number;
  change24h: number;
}

export function PreciousMetalsPage() {
  const [goldPrice, setGoldPrice] = useState<MetalPrice>({ price: 0, change24h: 0 });
  const [silverPrice, setSilverPrice] = useState<MetalPrice>({ price: 0, change24h: 0 });
  const [weight, setWeight] = useState<number>(1);
  const [calculatedValue, setCalculatedValue] = useState<number>(0);

  useEffect(() => {
    // Simulierte Preisdaten (in der Realität würde hier eine API-Abfrage stehen)
    setGoldPrice({ price: 1876.50, change24h: 2.3 });
    setSilverPrice({ price: 23.15, change24h: -0.8 });
  }, []);

  useEffect(() => {
    setCalculatedValue(weight * goldPrice.price);
  }, [weight, goldPrice.price]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Gold Card */}
        <PriceCard
          title="Gold"
          price={goldPrice.price}
          change24h={goldPrice.change24h}
          color="from-yellow-500 to-yellow-600"
        />

        {/* Silver Card */}
        <PriceCard
          title="Silber"
          price={silverPrice.price}
          change24h={silverPrice.change24h}
          color="from-gray-300 to-gray-400"
        />
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
          <h2 className="text-xl font-bold">Goldrechner</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gewicht in Unzen
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

          <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
            <p className="text-sm opacity-90 mb-1">Aktueller Wert</p>
            <p className="text-3xl font-bold">€{calculatedValue.toFixed(2)}</p>
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
          <h2 className="text-xl font-bold">Markteinblicke</h2>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p>
            Gold gilt traditionell als sicherer Hafen in Zeiten wirtschaftlicher Unsicherheit.
            Der aktuelle Goldpreis spiegelt verschiedene globale Faktoren wider, darunter:
          </p>
          <ul>
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
