import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Tag } from 'lucide-react';
import { Transaction } from '../types/finance';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Transaktionen</h2>
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {transactions.slice(0, 10).map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              {transaction.type === 'income' ? (
                <ArrowUpCircle className="h-8 w-8 text-green-500" />
              ) : (
                <ArrowDownCircle className="h-8 w-8 text-red-500" />
              )}
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                  {transaction.category && ` • ${transaction.category.name}`}
                </p>
                {transaction.tags && transaction.tags.length > 0 && (
                  <div className="flex items-center mt-1 space-x-1">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <div className="flex gap-1">
                      {transaction.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}€{transaction.amount.toFixed(2)}
              </span>
              <button
                onClick={() => onDelete(transaction.id)}
                className="text-gray-400 hover:text-red-500"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
