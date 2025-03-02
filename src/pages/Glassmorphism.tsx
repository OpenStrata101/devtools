import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface GlassConfig {
  blur: number;
  transparency: number;
  saturation: number;
  brightness: number;
  outline: number;
  outlineColor: string;
}

export function Glassmorphism() {
  const [config, setConfig] = useState<GlassConfig>({
    blur: 16,
    transparency: 0.25,
    saturation: 180,
    brightness: 100,
    outline: 1,
    outlineColor: '#ffffff40',
  });
  const [bgColor1, setBgColor1] = useState('#ff0080');
  const [bgColor2, setBgColor2] = useState('#7928ca');
  const [copied, setCopied] = useState<string | null>(null);

  const glassStyle = {
    background: `rgba(255, 255, 255, ${config.transparency})`,
    backdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%) brightness(${config.brightness}%)`,
    WebkitBackdropFilter: `blur(${config.blur}px) saturate(${config.saturation}%) brightness(${config.brightness}%)`,
    border: `${config.outline}px solid ${config.outlineColor}`,
  };

  const backgroundStyle = {
    background: `linear-gradient(45deg, ${bgColor1}, ${bgColor2})`,
  };

  const cssCode = `background: rgba(255, 255, 255, ${config.transparency});
backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%) brightness(${config.brightness}%);
-webkit-backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%) brightness(${config.brightness}%);
border: ${config.outline}px solid ${config.outlineColor};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied('css');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setConfig({
      blur: 16,
      transparency: 0.25,
      saturation: 180,
      brightness: 100,
      outline: 1,
      outlineColor: '#ffffff40',
    });
    setBgColor1('#ff0080');
    setBgColor2('#7928ca');
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
              Glassmorphism Generator
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
                className="w-full h-64 rounded-lg mb-8 relative overflow-hidden"
                style={backgroundStyle}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={glassStyle}
                >
                  <p className="text-gray-800 text-xl font-medium">Glassmorphism Effect</p>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color 1
                  </label>
                  <input
                    type="color"
                    value={bgColor1}
                    onChange={(e) => setBgColor1(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color 2
                  </label>
                  <input
                    type="color"
                    value={bgColor2}
                    onChange={(e) => setBgColor2(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blur: {config.blur}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={config.blur}
                    onChange={(e) =>
                      setConfig({ ...config, blur: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Transparency: {Math.round(config.transparency * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.transparency * 100}
                    onChange={(e) =>
                      setConfig({ ...config, transparency: parseInt(e.target.value) / 100 })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Saturation: {config.saturation}%
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="200"
                    value={config.saturation}
                    onChange={(e) =>
                      setConfig({ ...config, saturation: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Brightness: {config.brightness}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={config.brightness}
                    onChange={(e) =>
                      setConfig({ ...config, brightness: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Border Width: {config.outline}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={config.outline}
                    onChange={(e) =>
                      setConfig({ ...config, outline: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Border Color
                  </label>
                  <input
                    type="color"
                    value={config.outlineColor}
                    onChange={(e) => setConfig({ ...config, outlineColor: e.target.value })}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
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