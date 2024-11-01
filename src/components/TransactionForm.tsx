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
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Neue Transaktion</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Typ</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="income">Einnahme</option>
            <option value="expense">Ausgabe</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Betrag (€)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Beschreibung</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        {type === 'expense' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Kategorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
          <label className="block text-sm font-medium text-gray-700">Tags (kommagetrennt)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="z.B. Lebensmittel, Restaurant, Transport"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Transaktion hinzufügen
        </button>
      </div>
    </form>
  );
}
