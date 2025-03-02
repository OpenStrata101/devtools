import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw } from 'lucide-react';

export function TextCase() {
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const transformations = [
    {
      name: 'UPPERCASE',
      transform: (text: string) => text.toUpperCase(),
      description: 'Convert all characters to uppercase',
    },
    {
      name: 'lowercase',
      transform: (text: string) => text.toLowerCase(),
      description: 'Convert all characters to lowercase',
    },
    {
      name: 'Title Case',
      transform: (text: string) => {
        return text
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      },
      description: 'Capitalize the first letter of each word',
    },
    {
      name: 'Sentence case',
      transform: (text: string) => {
        return text
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
      },
      description: 'Capitalize the first letter of each sentence',
    },
    {
      name: 'camelCase',
      transform: (text: string) => {
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
      },
      description: 'Remove spaces and capitalize each word except the first',
    },
    {
      name: 'PascalCase',
      transform: (text: string) => {
        return text
          .toLowerCase()
          .replace(/(^|[^a-zA-Z0-9])(.)/g, (_, __, chr) => chr.toUpperCase())
          .replace(/[^a-zA-Z0-9]/g, '');
      },
      description: 'Remove spaces and capitalize each word',
    },
    {
      name: 'snake_case',
      transform: (text: string) => {
        return text
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-zA-Z0-9_]/g, '');
      },
      description: 'Replace spaces with underscores and lowercase all',
    },
    {
      name: 'kebab-case',
      transform: (text: string) => {
        return text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9-]/g, '');
      },
      description: 'Replace spaces with hyphens and lowercase all',
    },
    {
      name: 'CONSTANT_CASE',
      transform: (text: string) => {
        return text
          .toUpperCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-zA-Z0-9_]/g, '');
      },
      description: 'Replace spaces with underscores and uppercase all',
    },
    {
      name: 'Alternating Case',
      transform: (text: string) => {
        return text
          .split('')
          .map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase())
          .join('');
      },
      description: 'Alternate between lowercase and uppercase characters',
    },
  ];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setInputText('');
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
              Text Case Converter
            </h1>

            <div className="w-full max-w-3xl mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Input Text</h2>
                <button
                  onClick={handleReset}
                  className="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear
                </button>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here to convert it to different cases..."
                className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
              {transformations.map((transformation) => (
                <div
                  key={transformation.name}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {transformation.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {transformation.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(transformation.transform(inputText), transformation.name)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                      disabled={!inputText}
                    >
                      {copied === transformation.name ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 min-h-[60px] break-words">
                    {inputText ? transformation.transform(inputText) : (
                      <span className="text-gray-400 dark:text-gray-500 text-sm italic">
                        Result will appear here
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}