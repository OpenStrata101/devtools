import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface WaveConfig {
  height: number;
  amplitude: number;
  frequency: number;
  points: number;
  color: string;
  fill: string;
  strokeWidth: number;
}

export function SvgWave() {
  const [config, setConfig] = useState<WaveConfig>({
    height: 100,
    amplitude: 30,
    frequency: 20,
    points: 4,
    color: '#4f46e5',
    fill: 'none',
    strokeWidth: 2,
  });
  const [copied, setCopied] = useState<string | null>(null);

  const generatePath = () => {
    const width = 800;
    const points: [number, number][] = [];
    const segments = config.points * 2;
    
    for (let i = 0; i <= segments; i++) {
      const x = (i * width) / segments;
      const y = config.height / 2 + 
        Math.sin((i * Math.PI * config.frequency) / 100) * config.amplitude;
      points.push([x, y]);
    }

    const path = points.reduce((acc, point, i) => {
      if (i === 0) return `M ${point[0]},${point[1]}`;
      const [cpsX, cpsY] = [
        (points[i - 1][0] + point[0]) / 2,
        points[i - 1][1],
      ];
      const [cpeX, cpeY] = [
        (points[i - 1][0] + point[0]) / 2,
        point[1],
      ];
      return `${acc} C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
    }, '');

    return path;
  };

  const svgCode = `<svg width="100%" height="${config.height}" viewBox="0 0 800 ${
    config.height
  }" xmlns="http://www.w3.org/2000/svg">
  <path
    d="${generatePath()}"
    stroke="${config.color}"
    fill="${config.fill}"
    stroke-width="${config.strokeWidth}"
  />
</svg>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(svgCode);
    setCopied('svg');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setConfig({
      height: 100,
      amplitude: 30,
      frequency: 20,
      points: 4,
      color: '#4f46e5',
      fill: 'none',
      strokeWidth: 2,
    });
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
              SVG Wave Generator
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
                className="w-full rounded-lg mb-8 overflow-hidden bg-gray-50 dark:bg-gray-700"
                dangerouslySetInnerHTML={{ __html: svgCode }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height: {config.height}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    value={config.height}
                    onChange={(e) =>
                      setConfig({ ...config, height: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amplitude: {config.amplitude}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.amplitude}
                    onChange={(e) =>
                      setConfig({ ...config, amplitude: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Frequency: {config.frequency}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={config.frequency}
                    onChange={(e) =>
                      setConfig({ ...config, frequency: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Points: {config.points}
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={config.points}
                    onChange={(e) =>
                      setConfig({ ...config, points: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stroke Width: {config.strokeWidth}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={config.strokeWidth}
                    onChange={(e) =>
                      setConfig({ ...config, strokeWidth: parseInt(e.target.value) })
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
                    value={config.color}
                    onChange={(e) => setConfig({ ...config, color: e.target.value })}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fill
                  </label>
                  <input
                    type="color"
                    value={config.fill === 'none' ? '#ffffff' : config.fill}
                    onChange={(e) => setConfig({ ...config, fill: e.target.value })}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                  <button
                    onClick={() =>
                      setConfig({
                        ...config,
                        fill: config.fill === 'none' ? '#ffffff' : 'none',
                      })
                    }
                    className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    Toggle Fill
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">SVG</span>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                  >
                    {copied === 'svg' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                </div>
                <code className="block mt-2 text-sm text-gray-800 dark:text-gray-200 break-all whitespace-pre-wrap">
                  {svgCode}
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}