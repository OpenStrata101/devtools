import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RefreshCw, RotateCcw } from 'lucide-react';
import { generateRandomColor, hexToRgb } from '../lib/utils';

interface ColorPaletteType {
  name: string;
  generator: (baseColor: string) => string[];
}

export function ColorPalette() {
  const [baseColor, setBaseColor] = useState(generateRandomColor());
  const [paletteType, setPaletteType] = useState<string>('analogous');
  const [copied, setCopied] = useState<string | null>(null);

  const paletteTypes: ColorPaletteType[] = [
    {
      name: 'Analogous',
      generator: (color: string) => generateAnalogousPalette(color),
    },
    {
      name: 'Monochromatic',
      generator: (color: string) => generateMonochromaticPalette(color),
    },
    {
      name: 'Complementary',
      generator: (color: string) => generateComplementaryPalette(color),
    },
    {
      name: 'Triadic',
      generator: (color: string) => generateTriadicPalette(color),
    },
    {
      name: 'Tetradic',
      generator: (color: string) => generateTetradicPalette(color),
    },
  ];

  // Helper functions for color manipulation
  const hexToHSL = (hex: string): [number, number, number] => {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  const HSLToHex = (h: number, s: number, l: number): string => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Palette generators
  const generateAnalogousPalette = (color: string): string[] => {
    const [h, s, l] = hexToHSL(color);
    return [
      HSLToHex((h - 60 + 360) % 360, s, l),
      HSLToHex((h - 30 + 360) % 360, s, l),
      color,
      HSLToHex((h + 30) % 360, s, l),
      HSLToHex((h + 60) % 360, s, l),
    ];
  };

  const generateMonochromaticPalette = (color: string): string[] => {
    const [h, s, l] = hexToHSL(color);
    return [
      HSLToHex(h, s, Math.max(0, l - 40)),
      HSLToHex(h, s, Math.max(0, l - 20)),
      color,
      HSLToHex(h, s, Math.min(100, l + 20)),
      HSLToHex(h, s, Math.min(100, l + 40)),
    ];
  };

  const generateComplementaryPalette = (color: string): string[] => {
    const [h, s, l] = hexToHSL(color);
    const complementary = (h + 180) % 360;
    return [
      HSLToHex(h, s, Math.max(0, l - 20)),
      color,
      HSLToHex(h, s, Math.min(100, l + 20)),
      HSLToHex(complementary, s, Math.max(0, l - 20)),
      HSLToHex(complementary, s, l),
    ];
  };

  const generateTriadicPalette = (color: string): string[] => {
    const [h, s, l] = hexToHSL(color);
    return [
      color,
      HSLToHex((h + 120) % 360, s, l),
      HSLToHex((h + 240) % 360, s, l),
      HSLToHex((h + 120) % 360, s, Math.max(0, l - 20)),
      HSLToHex((h + 240) % 360, s, Math.max(0, l - 20)),
    ];
  };

  const generateTetradicPalette = (color: string): string[] => {
    const [h, s, l] = hexToHSL(color);
    return [
      color,
      HSLToHex((h + 90) % 360, s, l),
      HSLToHex((h + 180) % 360, s, l),
      HSLToHex((h + 270) % 360, s, l),
      HSLToHex((h + 180) % 360, s, Math.max(0, l - 20)),
    ];
  };

  const generatePalette = () => {
    const selectedType = paletteTypes.find(type => type.name.toLowerCase() === paletteType);
    return selectedType ? selectedType.generator(baseColor) : [];
  };

  const palette = generatePalette();

  const handleCopy = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleGenerateNewColor = () => {
    setBaseColor(generateRandomColor());
  };

  const handleReset = () => {
    setBaseColor(generateRandomColor());
    setPaletteType('analogous');
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
              Color Palette Generator
            </h1>

            <div className="w-full max-w-3xl mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Base Color</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={handleGenerateNewColor}
                    className="flex items-center px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    New Color
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

              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div 
                    className="w-full h-20 rounded-lg mb-2"
                    style={{ backgroundColor: baseColor }}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {baseColor}
                    </span>
                    <button
                      onClick={() => handleCopy(baseColor, 'base')}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                    >
                      {copied === 'base' ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Palette Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {paletteTypes.map((type) => (
                    <button
                      key={type.name}
                      onClick={() => setPaletteType(type.name.toLowerCase())}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        paletteType === type.name.toLowerCase()
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Generated Palette
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {palette.map((color, index) => (
                    <div key={index} className="space-y-2">
                      <div 
                        className="w-full h-20 rounded-lg"
                        style={{ backgroundColor: color }}
                      />
                      <div className="flex justify-between">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {color}
                        </span>
                        <button
                          onClick={() => handleCopy(color, `color-${index}`)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                        >
                          {copied === `color-${index}` ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full max-w-3xl">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">CSS Variables</span>
                  <button
                    onClick={() => handleCopy(
                      `:root {\n${palette.map((color, i) => `  --color-${i + 1}: ${color};`).join('\n')}\n}`,
                      'css'
                    )}
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
                  {`:root {
${palette.map((color, i) => `  --color-${i + 1}: ${color};`).join('\n')}
}`}
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}