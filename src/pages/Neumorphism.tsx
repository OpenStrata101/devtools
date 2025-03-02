import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface NeumorphismConfig {
  size: number;
  radius: number;
  distance: number;
  intensity: number;
  blur: number;
  color: string;
  type: 'flat' | 'pressed' | 'concave' | 'convex';
}

export function Neumorphism() {
  const [config, setConfig] = useState<NeumorphismConfig>({
    size: 200,
    radius: 30,
    distance: 20,
    intensity: 0.15,
    blur: 40,
    color: '#e0e0e0',
    type: 'flat',
  });
  const [copied, setCopied] = useState<string | null>(null);

  const calculateShadows = () => {
    const darken = (color: string, amount: number) => {
      const hex = color.replace('#', '');
      const rgb = parseInt(hex, 16);
      const r = Math.max(0, (rgb >> 16) - amount);
      const g = Math.max(0, ((rgb >> 8) & 0x00ff) - amount);
      const b = Math.max(0, (rgb & 0x0000ff) - amount);
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    const lighten = (color: string, amount: number) => {
      const hex = color.replace('#', '');
      const rgb = parseInt(hex, 16);
      const r = Math.min(255, (rgb >> 16) + amount);
      const g = Math.min(255, ((rgb >> 8) & 0x00ff) + amount);
      const b = Math.min(255, (rgb & 0x0000ff) + amount);
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    const intensityValue = Math.round(config.intensity * 255);
    const darkShadow = darken(config.color, intensityValue);
    const lightShadow = lighten(config.color, intensityValue);

    const distance = config.distance;
    const blur = config.blur;

    switch (config.type) {
      case 'pressed':
        return {
          background: config.color,
          boxShadow: `inset ${distance}px ${distance}px ${blur}px ${darkShadow},
                     inset -${distance}px -${distance}px ${blur}px ${lightShadow}`,
        };
      case 'concave':
        return {
          background: `linear-gradient(145deg, ${darken(config.color, intensityValue / 2)}, ${lighten(
            config.color,
            intensityValue / 2
          )})`,
          boxShadow: `${distance}px ${distance}px ${blur}px ${darkShadow},
                     -${distance}px -${distance}px ${blur}px ${lightShadow}`,
        };
      case 'convex':
        return {
          background: `linear-gradient(145deg, ${lighten(config.color, intensityValue / 2)}, ${darken(
            config.color,
            intensityValue / 2
          )})`,
          boxShadow: `${distance}px ${distance}px ${blur}px ${darkShadow},
                     -${distance}px -${distance}px ${blur}px ${lightShadow}`,
        };
      default:
        return {
          background: config.color,
          boxShadow: `${distance}px ${distance}px ${blur}px ${darkShadow},
                     -${distance}px -${distance}px ${blur}px ${lightShadow}`,
        };
    }
  };

  const style = calculateShadows();
  const cssCode = `background: ${style.background};
border-radius: ${config.radius}px;
box-shadow: ${style.boxShadow};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied('css');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setConfig({
      size: 200,
      radius: 30,
      distance: 20,
      intensity: 0.15,
      blur: 40,
      color: '#e0e0e0',
      type: 'flat',
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
              Neumorphism Generator
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

              <div className="w-full aspect-video rounded-lg mb-8 flex items-center justify-center p-8"
                   style={{ background: config.color }}>
                <div
                  style={{
                    width: `${config.size}px`,
                    height: `${config.size}px`,
                    borderRadius: `${config.radius}px`,
                    ...style,
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Size: {config.size}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    value={config.size}
                    onChange={(e) =>
                      setConfig({ ...config, size: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Border Radius: {config.radius}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={config.radius}
                    onChange={(e) =>
                      setConfig({ ...config, radius: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Distance: {config.distance}px
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={config.distance}
                    onChange={(e) =>
                      setConfig({ ...config, distance: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Intensity: {Math.round(config.intensity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={config.intensity * 100}
                    onChange={(e) =>
                      setConfig({ ...config, intensity: parseInt(e.target.value) / 100 })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blur: {config.blur}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.blur}
                    onChange={(e) =>
                      setConfig({ ...config, blur: parseInt(e.target.value) })
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
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(['flat', 'pressed', 'concave', 'convex'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setConfig({ ...config, type })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                      config.type === type
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
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