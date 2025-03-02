import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw, AlertCircle } from 'lucide-react';

export function JsonTools() {
  const [inputJson, setInputJson] = useState<string>('');
  const [outputJson, setOutputJson] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [action, setAction] = useState<'format' | 'minify' | 'validate'>('format');

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setOutputJson(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`);
      setOutputJson('');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setOutputJson(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`);
      setOutputJson('');
    }
  };

  const handleValidate = () => {
    try {
      JSON.parse(inputJson);
      setOutputJson('JSON is valid');
      setError(null);
    } catch (err) {
      setError(`Invalid JSON: ${(err as Error).message}`);
      setOutputJson('');
    }
  };

  const handleAction = () => {
    switch (action) {
      case 'format':
        handleFormat();
        break;
      case 'minify':
        handleMinify();
        break;
      case 'validate':
        handleValidate();
        break;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputJson('');
    setOutputJson('');
    setError(null);
    setAction('format');
  };

  const handleSampleData = () => {
    const sampleData = {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      isActive: true,
      address: {
        street: "123 Main St",
        city: "New York",
        zipCode: "10001"
      },
      hobbies: ["reading", "swimming", "coding"]
    };
    setInputJson(JSON.stringify(sampleData));
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              JSON Tools
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Input JSON</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSampleData}
                      className="px-3 py-1.5 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                    >
                      Sample Data
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </button>
                  </div>
                </div>
                <textarea
                  value={inputJson}
                  onChange={(e) => setInputJson(e.target.value)}
                  placeholder="Paste your JSON here..."
                  className="w-full h-80 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Output</h2>
                  {outputJson && (
                    <button
                      onClick={handleCopy}
                      className="flex items-center px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 mr-2" />
                      ) : (
                        <Copy className="w-4 h-4 mr-2" />
                      )}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                {error ? (
                  <div className="w-full h-80 p-4 font-mono text-sm border border-red-300 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-80 p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 overflow-auto">
                    {outputJson ? (
                      <pre>{outputJson}</pre>
                    ) : (
                      <div className="text-gray-400 dark:text-gray-500">
                        Output will appear here...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setAction('format')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    action === 'format'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Format JSON
                </button>
                <button
                  onClick={() => setAction('minify')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    action === 'minify'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Minify JSON
                </button>
                <button
                  onClick={() => setAction('validate')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    action === 'validate'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Validate JSON
                </button>
              </div>
              <button
                onClick={handleAction}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Process
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                JSON Tools Guide
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Format JSON</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Formats JSON with proper indentation and spacing for better readability.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Minify JSON</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Removes all unnecessary whitespace to create the smallest possible JSON string.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Validate JSON</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Checks if the JSON is valid without modifying it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}