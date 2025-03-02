import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Plus, Minus, RotateCcw } from 'lucide-react';

interface GradientColor {
  color: string;
  position: number;
}

export function LinearGradient() {
  const [angle, setAngle] = useState(90);
  const [colors, setColors] = useState<GradientColor[]>([
    { color: '#FF0080', position: 0 },
    { color: '#7928CA', position: 100 },
  ]);
  const [copied, setCopied] = useState<string | null>(null);

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${colors
      .map((c) => `${c.color} ${c.position}%`)
      .join(', ')})`,
  };

  const cssCode = `background: ${gradientStyle.background};`;

  const handleAddColor = () => {
    if (colors.length < 5) {
      const position = Math.floor(
        (colors[colors.length - 1].position + colors[colors.length - 2].position) / 2
      );
      setColors([...colors, { color: '#000000', position }]);
    }
  };

  const handleRemoveColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], color: newColor };
    setColors(newColors);
  };

  const handlePositionChange = (index: number, newPosition: number) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], position: newPosition };
    setColors(newColors.sort((a, b) => a.position - b.position));
  };

  const handleCopy = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setAngle(90);
    setColors([
      { color: '#FF0080', position: 0 },
      { color: '#7928CA', position: 100 },
    ]);
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
              Linear Gradient Generator
            </h1>

            <div 
              className="w-full h-64 rounded-lg mb-8 transition-all duration-300"
              style={gradientStyle}
            />

            <div className="w-full max-w-3xl mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Gradient Controls
                </h2>
                <button
                  onClick={handleReset}
                  className="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Angle: {angle}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-4">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={color.color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={color.position}
                      onChange={(e) => handlePositionChange(index, Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                      {color.position}%
                    </span>
                    {colors.length > 2 && (
                      <button
                        onClick={() => handleRemoveColor(index)}
                        className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {colors.length < 5 && (
                <button
                  onClick={handleAddColor}
                  className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Color
                </button>
              )}
            </div>

            <div className="w-full grid grid-cols-1 gap-4">
              {[
                { label: 'CSS', value: cssCode },
                { label: 'Tailwind', value: `bg-gradient-to-r from-[${colors[0].color}] to-[${colors[colors.length-1].color}]` }
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
                  <code className="block mt-2 text-sm text-gray-800 dark:text-gray-200 break-all">
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