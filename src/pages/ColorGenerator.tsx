import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { generateRandomColor, hexToRgb } from '../lib/utils';

export function ColorGenerator() {
  const [color, setColor] = useState(generateRandomColor());
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Random Color Generator
            </h1>

            <div 
              className="w-full h-64 rounded-lg mb-8 transition-colors duration-200"
              style={{ backgroundColor: color }}
            />

            <button
              onClick={() => setColor(generateRandomColor())}
              className="mb-8 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Generate New Color
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: 'HEX', value: color },
                { label: 'RGB', value: hexToRgb(color) },
                { label: 'CSS', value: `background-color: ${color};` }
              ].map((format) => (
                <div
                  key={format.label}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {format.label}
                    </span>
                    <button
                      onClick={() => handleCopy(format.value, format.label)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                    >
                      {copied === format.label ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                  <code className="block mt-2 text-sm text-gray-800 dark:text-gray-200">
                    {format.value}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}