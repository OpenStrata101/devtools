import { motion } from 'framer-motion';

export function LayoutPlayground() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Grid & Flexbox Playground
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Coming soon! Visual playground for CSS layouts.
          </p>
        </motion.div>
      </div>
    </div>
  );
}