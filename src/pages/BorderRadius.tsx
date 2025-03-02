import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw, Link, Unlink } from 'lucide-react';

export function BorderRadius() {
  const [topLeft, setTopLeft] = useState<number>(10);
  const [topRight, setTopRight] = useState<number>(10);
  const [bottomRight, setBottomRight] = useState<number>(10);
  const [bottomLeft, setBottomLeft] = useState<number>(10);
  const [linked, setLinked] = useState<boolean>(true);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(200);
  const [bgColor, setBgColor] = useState<string>('#4f46e5');
  const [copied, setCopied] = useState<string | null>(null);

  const handleRadiusChange = (value: number, corner: string) => {
    if (linked) {
      setTopLeft(value);
      setTopRight(value);
      setBottomRight(value);
      setBottomLeft(value);
    } else {
      switch (corner) {
        case 'topLeft':
          setTopLeft(value);
          break;
        case 'topRight':
          setTopRight(value);
          break;
        case 'bottomRight':
          setBottomRight(value);
          break;
        case 'bottomLeft':
          setBottomLeft(value);
          break;
      }
    }
  };

  const borderRadiusStyle = linked
    ? `${topLeft}px`
    : `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

  const cssCode = `border-radius: ${borderRadiusStyle};`;
  const tailwindCode = `rounded-[${borderRadiusStyle}]`;

  const handleCopy = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setTopLeft(10);
    setTopRight(10);
    setBottomRight(10);
    setBottomLeft(10);
    setLinked(true);
    setWidth(300);
    setHeight(200);
    setBgColor('#4f46e5');
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
              Border Radius Generator
            </h1>

            <div className="w-full max-w-3xl mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setLinked(!linked)}
                    className="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {linked ? (
                      <>
                        <Link className="w-4 h-4 mr-2" />
                        Linked
                      </>
                    ) : (
                      <>
                        <Unlink className="w-4 h-4 mr-2" />
                        Unlinked
                      </>
                    )}
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

              <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 p-8 rounded-lg mb-8">
                <div
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: bgColor,
                    borderRadius: borderRadiusStyle,
                  }}
                  className="transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Width: {width}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height: {height}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Background Color
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Top Left: {topLeft}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={topLeft}
                    onChange={(e) => handleRadiusChange(parseInt(e.target.value), 'topLeft')}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Top Right: {topRight}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={topRight}
                    onChange={(e) => handleRadiusChange(parseInt(e.target.value), 'topRight')}
                    disabled={linked}
                    className={`w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer ${
                      linked ? 'opacity-50' : ''
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bottom Right: {bottomRight}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={bottomRight}
                    onChange={(e) => handleRadiusChange(parseInt(e.target.value), 'bottomRight')}
                    disabled={linked}
                    className={`w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer ${
                      linked ? 'opacity-50' : ''
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bottom Left: {bottomLeft}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={bottomLeft}
                    onChange={(e) => handleRadiusChange(parseInt(e.target.value), 'bottomLeft')}
                    disabled={linked}
                    className={`w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer ${
                      linked ? 'opacity-50' : ''
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">CSS</span>
                  <button
                    onClick={() => handleCopy(cssCode, 'css')}
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
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Tailwind</span>
                  <button
                    onClick={() => handleCopy(tailwindCode, 'tailwind')}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                  >
                    {copied === 'tailwind' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                </div>
                <code className="block mt-2 text-sm text-gray-800 dark:text-gray-200 break-all">
                  {tailwindCode}
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}