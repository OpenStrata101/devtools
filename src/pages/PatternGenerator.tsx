import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface PatternConfig {
  type: 'dots' | 'stripes' | 'grid' | 'zigzag' | 'waves' | 'triangles';
  size: number;
  spacing: number;
  rotation: number;
  opacity: number;
  primaryColor: string;
  secondaryColor: string;
}

export function PatternGenerator() {
  const [config, setConfig] = useState<PatternConfig>({
    type: 'dots',
    size: 5,
    spacing: 20,
    rotation: 0,
    opacity: 0.7,
    primaryColor: '#ffffff',
    secondaryColor: '#4f46e5',
  });
  const [copied, setCopied] = useState<string | null>(null);

  const generateSvg = () => {
    const { type, size, spacing, rotation, opacity, secondaryColor } = config;
    let svg = '';
    const patternSize = spacing;

    switch (type) {
      case 'dots':
        svg = `<svg width="${patternSize}" height="${patternSize}" viewBox="0 0 ${patternSize} ${patternSize}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${patternSize / 2}" cy="${patternSize / 2}" r="${size}" fill="${secondaryColor}" fill-opacity="${opacity}" />
</svg>`;
        break;
      case 'stripes':
        svg = `<svg width="${patternSize}" height="${patternSize}" viewBox="0 0 ${patternSize} ${patternSize}" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="0" x2="${patternSize}" y2="${patternSize}" stroke="${secondaryColor}" stroke-width="${size}" stroke-opacity="${opacity}" />
</svg>`;
        break;
      case 'grid':
        svg = `<svg width="${patternSize}" height="${patternSize}" viewBox="0 0 ${patternSize} ${patternSize}" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="${patternSize / 2}" x2="${patternSize}" y2="${patternSize / 2}" stroke="${secondaryColor}" stroke-width="${size}" stroke-opacity="${opacity}" />
  <line x1="${patternSize / 2}" y1="0" x2="${patternSize / 2}" y2="${patternSize}" stroke="${secondaryColor}" stroke-width="${size}" stroke-opacity="${opacity}" />
</svg>`;
        break;
      case 'zigzag':
        svg = `<svg width="${patternSize}" height="${patternSize}" viewBox="0 0 ${patternSize} ${patternSize}" xmlns="http://www.w3.org/2000/svg">
  <polyline points="0,0 ${patternSize / 2},${patternSize} ${patternSize},0" fill="none" stroke="${secondaryColor}" stroke-width="${size}" stroke-opacity="${opacity}" />
</svg>`;
        break;
      case 'waves':
        svg = `<svg width="${patternSize}" height="${patternSize}" viewBox="0 0 ${patternSize} ${patternSize}" xmlns="http://www.w3.org/2000/svg">
  <path d="M0,${patternSize / 2} Q${patternSize / 4},0 ${patternSize / 2},${patternSize / 2} T${patternSize},${patternSize / 2}" fill="none" stroke="${secondaryColor}" stroke-width="${size}" stroke-opacity="${opacity}" />
</svg>`;
        break;
      case 'triangles':
        svg = `<svg width="${patternSize}" height="${patternSize}" viewBox="0 0 ${patternSize} ${patternSize}" xmlns="http://www.w3.org/2000/svg">
  <polygon points="${patternSize / 2},0 ${patternSize},${patternSize} 0,${patternSize}" fill="${secondaryColor}" fill-opacity="${opacity}" />
</svg>`;
        break;
    }

    return svg;
  };

  const svg = generateSvg();
  const encodedSvg = encodeURIComponent(svg);
  const patternSize = config.spacing;

  const cssCode = `background-color: ${config.primaryColor};
background-image: url("data:image/svg+xml,${encodedSvg}");
background-size: ${patternSize}px ${patternSize}px;
${config.rotation > 0 ? `background-position: center;
transform: rotate(${config.rotation}deg);` : ''}`;

  const handleCopy = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setConfig({
      type: 'dots',
      size: 5,
      spacing: 20,
      rotation: 0,
      opacity: 0.7,
      primaryColor: '#ffffff',
      secondaryColor: '#4f46e5',
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
              SVG Pattern Generator
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
                  backgroundImage: `url("data:image/svg+xml,${encodedSvg}")`,
                  backgroundSize: `${patternSize}px ${patternSize}px`,
                  backgroundColor: config.primaryColor
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pattern Type
                  </label>
                  <select
                    value={config.type}
                    onChange={(e) => setConfig({ ...config, type: e.target.value as PatternConfig['type'] })}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="dots">Dots</option>
                    <option value="stripes">Stripes</option>
                    <option value="grid">Grid</option>
                    <option value="zigzag">Zigzag</option>
                    <option value="waves">Waves</option>
                    <option value="triangles">Triangles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Size: {config.size}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={config.size}
                    onChange={(e) => setConfig({ ...config, size: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Spacing: {config.spacing}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={config.spacing}
                    onChange={(e) => setConfig({ ...config, spacing: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rotation: {config.rotation}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={config.rotation}
                    onChange={(e) => setConfig({ ...config, rotation: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Opacity: {config.opacity.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={config.opacity}
                    onChange={(e) => setConfig({ ...config, opacity: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color
                  </label>
                  <div className="flex">
                    <input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="h-10 w-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="ml-2 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pattern Color
                  </label>
                  <div className="flex">
                    <input
                      type="color"
                      value={config.secondaryColor}
                      onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="h-10 w-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.secondaryColor}
                      onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="ml-2 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-4">
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
                <code className="block mt-2 text-sm text-gray-800 dark:text-gray-200 break-all whitespace-pre-wrap">
                  {cssCode}
                </code>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">SVG</span>
                  <button
                    onClick={() => handleCopy(svg, 'svg')}
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
                  {svg}
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}