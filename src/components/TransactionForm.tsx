import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Transaction } from '../types/finance';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString(),
      description,
      category: type === 'expense' ? { id: category, name: category, type: 'fixed', budget: 0, spent: 0 } : undefined,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : undefined
    });
    
    setAmount('');
    setDescription('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Neue Transaktion</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Typ</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'income' | 'expense')}
              className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
            >
              <option value="income">Einnahme</option>
              <option value="expense">Ausgabe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Betrag (€)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
              required
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Beschreibung</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
            required
            maxLength={50}
            placeholder="z.B. Einkauf bei Rewe"
          />
        </div>

        {type === 'expense' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
              required
            >
              <option value="">Wähle eine Kategorie</option>
              <option value="fixed">Fixkosten</option>
              <option value="needs">Bedürfnisse</option>
              <option value="wants">Wünsche</option>
              <option value="savings">Sparen/Investieren</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (kommagetrennt)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
            placeholder="z.B. Lebensmittel, Restaurant, Transport"
            maxLength={100}
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-6 py-2 rounded-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Transaktion hinzufügen
        </button>
      </div>
    </form>
  );
}
