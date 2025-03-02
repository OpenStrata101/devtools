import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw, Plus, Minus } from 'lucide-react';

interface GradientPoint {
  x: number;
  y: number;
  color: string;
}

export function MeshGradient() {
  const [points, setPoints] = useState<GradientPoint[]>([
    { x: 0, y: 0, color: '#ff0080' },
    { x: 100, y: 0, color: '#7928ca' },
    { x: 100, y: 100, color: '#0070f3' },
    { x: 0, y: 100, color: '#00dfd8' },
  ]);
  const [copied, setCopied] = useState<string | null>(null);
  const [bgSize, setBgSize] = useState<number>(100);

  const generateGradient = () => {
    const svgPoints = points.map(point => 
      `<stop offset="${point.x}% ${point.y}%" stop-color="${point.color}" />`
    ).join('\n    ');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <radialGradient id="meshGradient" gradientUnits="userSpaceOnUse" 
      cx="50%" cy="50%" r="75%">
      ${svgPoints}
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#meshGradient)" />
</svg>`;

    const encoded = encodeURIComponent(svg);
    return `url("data:image/svg+xml,${encoded}")`;
  };

  const cssCode = `background-image: ${generateGradient()};
background-size: ${bgSize}% ${bgSize}%;
background-position: center;`;

  const handleAddPoint = () => {
    if (points.length < 8) {
      setPoints([...points, { x: 50, y: 50, color: '#ffffff' }]);
    }
  };

  const handleRemovePoint = (index: number) => {
    if (points.length > 2) {
      setPoints(points.filter((_, i) => i !== index));
    }
  };

  const handlePointChange = (index: number, key: keyof GradientPoint, value: number | string) => {
    const newPoints = [...points];
    newPoints[index] = { ...newPoints[index], [key]: value };
    setPoints(newPoints);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied('css');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setPoints([
      { x: 0, y: 0, color: '#ff0080' },
      { x: 100, y: 0, color: '#7928ca' },
      { x: 100, y: 100, color: '#0070f3' },
      { x: 0, y: 100, color: '#00dfd8' },
    ]);
    setBgSize(100);
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
              Mesh Gradient Generator
            </h1>

            <div className="w-full max-w-3xl mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h2>
                <button
                  onClick={handleReset}
                  className="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>

              <div 
                className="w-full h-64 rounded-lg mb-8 transition-all duration-300"
                style={{ 
                  backgroundImage: generateGradient(),
                  backgroundSize: `${bgSize}% ${bgSize}%`,
                  backgroundPosition: 'center'
                }}
              />

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Background Size: {bgSize}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={bgSize}
                  onChange={(e) => setBgSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-4">
                {points.map((point, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Point {index + 1}
                      </h3>
                      {points.length > 2 && (
                        <button
                          onClick={() => handleRemovePoint(index)}
                          className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          X Position: {point.x}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={point.x}
                          onChange={(e) =>
                            handlePointChange(index, 'x', parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Y Position: {point.y}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={point.y}
                          onChange={(e) =>
                            handlePointChange(index, 'y', parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Color
                        </label>
                        <input
                          type="color"
                          value={point.color}
                          onChange={(e) => handlePointChange(index, 'color', e.target.value)}
                          className="w-full h-10 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {points.length < 8 && (
                <button
                  onClick={handleAddPoint}
                  className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Point
                </button>
              )}
            </div>

            <div className="w-full">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">CSS</span>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                  >
                    {copied === 'css' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                </div>
                <code className="block mt-2 text-sm text-gray-800 dark:text-gray-200 break-all whitespace-pre-wrap">
                  {cssCode}
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}