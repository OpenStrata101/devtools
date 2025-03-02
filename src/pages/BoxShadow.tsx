import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Plus, Minus, RotateCcw } from 'lucide-react';

interface Shadow {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export function BoxShadow() {
  const [shadows, setShadows] = useState<Shadow[]>([
    {
      offsetX: 5,
      offsetY: 5,
      blur: 10,
      spread: 0,
      color: '#00000040',
      inset: false,
    },
  ]);
  const [copied, setCopied] = useState<string | null>(null);
  const [previewBgColor, setPreviewBgColor] = useState('#ffffff');
  const [previewBoxColor, setPreviewBoxColor] = useState('#4f46e5');

  const generateBoxShadow = () => {
    return shadows
      .map(
        (shadow) =>
          `${shadow.inset ? 'inset ' : ''}${shadow.offsetX}px ${shadow.offsetY}px ${
            shadow.blur
          }px ${shadow.spread}px ${shadow.color}`
      )
      .join(', ');
  };

  const boxShadowStyle = generateBoxShadow();
  const cssCode = `box-shadow: ${boxShadowStyle};`;

  const handleAddShadow = () => {
    if (shadows.length < 4) {
      setShadows([
        ...shadows,
        {
          offsetX: 5,
          offsetY: 5,
          blur: 10,
          spread: 0,
          color: '#00000040',
          inset: false,
        },
      ]);
    }
  };

  const handleRemoveShadow = (index: number) => {
    if (shadows.length > 1) {
      setShadows(shadows.filter((_, i) => i !== index));
    }
  };

  const handleShadowChange = (index: number, key: keyof Shadow, value: number | string | boolean) => {
    const newShadows = [...shadows];
    newShadows[index] = { ...newShadows[index], [key]: value };
    setShadows(newShadows);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied('css');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setShadows([
      {
        offsetX: 5,
        offsetY: 5,
        blur: 10,
        spread: 0,
        color: '#00000040',
        inset: false,
      },
    ]);
    setPreviewBgColor('#ffffff');
    setPreviewBoxColor('#4f46e5');
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
              Box Shadow Generator
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
                className="w-full h-64 rounded-lg mb-8 flex items-center justify-center p-8 transition-all"
                style={{ backgroundColor: previewBgColor }}
              >
                <div
                  className="w-32 h-32 rounded-lg transition-all"
                  style={{
                    backgroundColor: previewBoxColor,
                    boxShadow: boxShadowStyle,
                  }}
                />
              </div>

              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={previewBgColor}
                    onChange={(e) => setPreviewBgColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Box Color
                  </label>
                  <input
                    type="color"
                    value={previewBoxColor}
                    onChange={(e) => setPreviewBoxColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {shadows.map((shadow, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Shadow {index + 1}
                      </h3>
                      {shadows.length > 1 && (
                        <button
                          onClick={() => handleRemoveShadow(index)}
                          className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Offset X: {shadow.offsetX}px
                        </label>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          value={shadow.offsetX}
                          onChange={(e) =>
                            handleShadowChange(index, 'offsetX', parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Offset Y: {shadow.offsetY}px
                        </label>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          value={shadow.offsetY}
                          onChange={(e) =>
                            handleShadowChange(index, 'offsetY', parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Blur: {shadow.blur}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={shadow.blur}
                          onChange={(e) => handleShadowChange(index, 'blur', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Spread: {shadow.spread}px
                        </label>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          value={shadow.spread}
                          onChange={(e) =>
                            handleShadowChange(index, 'spread', parseInt(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Color
                        </label>
                        <input
                          type="color"
                          value={shadow.color}
                          onChange={(e) => handleShadowChange(index, 'color', e.target.value)}
                          className="w-full h-10 rounded cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={shadow.inset}
                            onChange={(e) => handleShadowChange(index, 'inset', e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Inset</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {shadows.length < 4 && (
                <button
                  onClick={handleAddShadow}
                  className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Shadow
                </button>
              )}
            </div>

            <div className="w-full">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">CSS</span>
                  <button
                    onClick={() => handleCopy(cssCode)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                  >
                    {copied === 'css' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                </div>
                <code className="block mt-2 text-sm text-gray-800 dark:text-gray-200 break-all">
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