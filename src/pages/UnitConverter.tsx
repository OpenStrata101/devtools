import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw, ArrowRight } from 'lucide-react';

type UnitType = 'px' | 'em' | 'rem' | 'vh' | 'vw' | 'vmin' | 'vmax' | '%' | 'pt' | 'pc' | 'in' | 'cm' | 'mm';

interface ConversionResult {
  unit: UnitType;
  value: string;
}

export function UnitConverter() {
  const [inputValue, setInputValue] = useState<string>('16');
  const [inputUnit, setInputUnit] = useState<UnitType>('px');
  const [baseSize, setBaseSize] = useState<string>('16');
  const [viewportWidth, setViewportWidth] = useState<string>('1920');
  const [viewportHeight, setViewportHeight] = useState<string>('1080');
  const [containerSize, setContainerSize] = useState<string>('1000');
  const [copied, setCopied] = useState<string | null>(null);

  const units: UnitType[] = ['px', 'em', 'rem', '%', 'vh', 'vw', 'vmin', 'vmax', 'pt', 'pc', 'in', 'cm', 'mm'];

  // Conversion functions
  const convertUnits = (): ConversionResult[] => {
    const input = parseFloat(inputValue);
    if (isNaN(input)) return [];

    const baseSizeNum = parseFloat(baseSize) || 16;
    const viewportWidthNum = parseFloat(viewportWidth) || 1920;
    const viewportHeightNum = parseFloat(viewportHeight) || 1080;
    const containerSizeNum = parseFloat(containerSize) || 1000;
    const viewportMinNum = Math.min(viewportWidthNum, viewportHeightNum);
    const viewportMaxNum = Math.max(viewportWidthNum, viewportHeightNum);

    const results: ConversionResult[] = [];

    // Conversion logic for each unit type
    switch (inputUnit) {
      case 'px':
        results.push({ unit: 'px', value: input.toFixed(2) });
        results.push({ unit: 'em', value: (input / baseSizeNum).toFixed(4) });
        results.push({ unit: 'rem', value: (input / baseSizeNum).toFixed(4) });
        results.push({ unit: '%', value: ((input / containerSizeNum) * 100).toFixed(2) });
        results.push({ unit: 'vh', value: ((input / viewportHeightNum) * 100).toFixed(2) });
        results.push({ unit: 'vw', value: ((input / viewportWidthNum) * 100).toFixed(2) });
        results.push({ unit: 'vmin', value: ((input / viewportMinNum) * 100).toFixed(2) });
        results.push({ unit: 'vmax', value: ((input / viewportMaxNum) * 100).toFixed(2) });
        results.push({ unit: 'pt', value: (input * 0.75).toFixed(2) });
        results.push({ unit: 'pc', value: (input * 0.0625).toFixed(4) });
        results.push({ unit: 'in', value: (input / 96).toFixed(4) });
        results.push({ unit: 'cm', value: (input / 37.8).toFixed(4) });
        results.push({ unit: 'mm', value: (input / 3.78).toFixed(2) });
        break;

      case 'em':
      case 'rem':
        const emValue = input * baseSizeNum;
        results.push({ unit: 'px', value: emValue.toFixed(2) });
        results.push({ unit: 'em', value: input.toFixed(4) });
        results.push({ unit: 'rem', value: input.toFixed(4) });
        results.push({ unit: '%', value: ((emValue / containerSizeNum) * 100).toFixed(2) });
        results.push({ unit: 'vh', value: ((emValue / viewportHeightNum) * 100).toFixed(2) });
        results.push({ unit: 'vw', value: ((emValue / viewportWidthNum) * 100).toFixed(2) });
        results.push({ unit: 'vmin', value: ((emValue / viewportMinNum) * 100).toFixed(2) });
        results.push({ unit: 'vmax', value: ((emValue / viewportMaxNum) * 100).toFixed(2) });
        results.push({ unit: 'pt', value: (emValue * 0.75).toFixed(2) });
        results.push({ unit: 'pc', value: (emValue * 0.0625).toFixed(4) });
        results.push({ unit: 'in', value: (emValue / 96).toFixed(4) });
        results.push({ unit: 'cm', value: (emValue / 37.8).toFixed(4) });
        results.push({ unit: 'mm', value: (emValue / 3.78).toFixed(2) });
        break;

      case '%':
        const percentValue = (input * containerSizeNum) / 100;
        results.push({ unit: 'px', value: percentValue.toFixed(2) });
        results.push({ unit: 'em', value: (percentValue / baseSizeNum).toFixed(4) });
        results.push({ unit: 'rem', value: (percentValue / baseSizeNum).toFixed(4) });
        results.push({ unit: '%', value: input.toFixed(2) });
        results.push({ unit: 'vh', value: ((percentValue / viewportHeightNum) * 100).toFixed(2) });
        results.push({ unit: 'vw', value: ((percentValue / viewportWidthNum) * 100).toFixed(2) });
        results.push({ unit: 'vmin', value: ((percentValue / viewportMinNum) * 100).toFixed(2) });
        results.push({ unit: 'vmax', value: ((percentValue / viewportMaxNum) * 100).toFixed(2) });
        results.push({ unit: 'pt', value: (percentValue * 0.75).toFixed(2) });
        results.push({ unit: 'pc', value: (percentValue * 0.0625).toFixed(4) });
        results.push({ unit: 'in', value: (percentValue / 96).toFixed(4) });
        results.push({ unit: 'cm', value: (percentValue / 37.8).toFixed(4) });
        results.push({ unit: 'mm', value: (percentValue / 3.78).toFixed(2) });
        break;

      case 'vh':
        const vhValue = (input * viewportHeightNum) / 100;
        results.push({ unit: 'px', value: vhValue.toFixed(2) });
        results.push({ unit: 'em', value: (vhValue / baseSizeNum).toFixed(4) });
        results.push({ unit: 'rem', value: (vhValue / baseSizeNum).toFixed(4) });
        results.push({ unit: '%', value: ((vhValue / containerSizeNum) * 100).toFixed(2) });
        results.push({ unit: 'vh', value: input.toFixed(2) });
        results.push({ unit: 'vw', value: ((vhValue / viewportWidthNum) * 100).toFixed(2) });
        results.push({ unit: 'vmin', value: ((vhValue / viewportMinNum) * 100).toFixed(2) });
        results.push({ unit: 'vmax', value: ((vhValue / viewportMaxNum) * 100).toFixed(2) });
        results.push({ unit: 'pt', value: (vhValue * 0.75).toFixed(2) });
        results.push({ unit: 'pc', value: (vhValue * 0.0625).toFixed(4) });
        results.push({ unit: 'in', value: (vhValue / 96).toFixed(4) });
        results.push({ unit: 'cm', value: (vhValue / 37.8).toFixed(4) });
        results.push({ unit: 'mm', value: (vhValue / 3.78).toFixed(2) });
        break;

      case 'vw':
        const vwValue = (input * viewportWidthNum) / 100;
        results.push({ unit: 'px', value: vwValue.toFixed(2) });
        results.push({ unit: 'em', value: (vwValue / baseSizeNum).toFixed(4) });
        results.push({ unit: 'rem', value: (vwValue / baseSizeNum).toFixed(4) });
        results.push({ unit: '%', value: ((vwValue / containerSizeNum) * 100).toFixed(2) });
        results.push({ unit: 'vh', value: ((vwValue / viewportHeightNum) * 100).toFixed(2) });
        results.push({ unit: 'vw', value: input.toFixed(2) });
        results.push({ unit: 'vmin', value: ((vwValue / viewportMinNum) * 100).toFixed(2) });
        results.push({ unit: 'vmax', value: ((vwValue / viewportMaxNum) * 100).toFixed(2) });
        results.push({ unit: 'pt', value: (vwValue * 0.75).toFixed(2) });
        results.push({ unit: 'pc', value: (vwValue * 0.0625).toFixed(4) });
        results.push({ unit: 'in', value: (vwValue / 96).toFixed(4) });
        results.push({ unit: 'cm', value: (vwValue / 37.8).toFixed(4) });
        results.push({ unit: 'mm', value: (vwValue / 3.78).toFixed(2) });
        break;

      case 'vmin':
        const vminValue = (input * viewportMinNum) / 100;
        results.push({ unit: 'px', value: vminValue.toFixed(2) });
        results.push({ unit: 'em', value: (vminValue / baseSizeNum).toFixed(4) });
        results.push({ unit: 'rem', value: (vminValue / baseSizeNum).toFixed(4) });
        results.push({ unit: '%', value: ((vminValue / containerSizeNum) * 100).toFixed(2) });
        results.push({ unit: 'vh', value: ((vminValue / viewportHeightNum) * 100).toFixed(2) });
        results.push({ unit: 'vw', value: ((vminValue / viewportWidthNum) * 100).toFixed(2) });
        results.push({ unit: 'vmin', value: input.toFixed(2) });
        results.push({ unit: 'vmax', value: ((vminValue / viewportMaxNum) * 100).toFixed(2) });
        results.push({ unit: 'pt', value: (vminValue * 0.75).toFixed(2) });
        results.push({ unit: 'pc', value: (vminValue * 0.0625).toFixed(4) });
        results.push({ unit: 'in', value: (vminValue / 96).toFixed(4) });
        results.push({ unit: 'cm', value: (vminValue / 37.8).toFixed(4) });
        results.push({ unit: 'mm', value: (vminValue / 3.78).toFixed(2) });
        break;

      case 'vmax':
        const vmaxValue = (input * viewportMaxNum) / 100;
        results.push({ unit: 'px', value: vmaxValue.toFixed(2) });
        results.push({ unit: 'em', value: (vmaxValue / baseSizeNum).toFixed(4) });
        results.push({ unit: 'rem', value: (vmaxValue / baseSizeNum).toFixed(4) });
        results.push({ unit: '%', value: ((vmaxValue / containerSizeNum) * 100).toFixed(2) });
        results.push({ unit: 'vh', value: ((vmaxValue / viewportHeightNum) * 100).toFixed(2) });
        results.push({ unit: 'vw', value: ((vmaxValue / viewportWidthNum) * 100).toFixed(2) });
        results.push({ unit: 'vmin', value: ((vmaxValue / viewportMinNum) * 100).toFixed(2) });
        results.push({ unit: 'vmax', value: input.toFixed(2) });
        results.push({ unit: 'pt', value: (vmaxValue * 0.75).toFixed(2) });
        results.push({ unit: 'pc', value: (vmaxValue * 0.0625).toFixed(4) });
        results.push({ unit: 'in', value: (vmaxValue / 96).toFixed(4) });
        results.push({ unit: 'cm', value: (vmaxValue / 37.8).toFixed(4) });
        results.push({ unit: 'mm', value: (vmaxValue / 3.78).toFixed(2) });
        break;

      case 'pt':
        const ptValue = input / 0.75;
        results.push({ unit: 'px', value: ptValue.toFixed(2) });
        results.push({ unit: 'em', value: (ptValue / baseSizeNum).toFixed(4) });
        results.push({ unit: 'rem', value: (ptValue / baseSizeNum).toFixed(4) });
        results.push({ unit: '%', value: ((ptValue / containerSizeNum) * 100).toFixed(2) });
        results.push({ unit: 'vh', value: ((ptValue / viewportHeightNum) * 100).toFixed(2) });
        results.push({ unit: 'vw', value: ((ptValue / viewportWidthNum) * 100).toFixed(2) });
        results.push({ unit: 'vmin', value: ((ptValue / viewportMinNum) * 100).toFixed(2) });
        results.push({ unit: 'vmax', value: ((ptValue / viewportMaxNum) * 100).toFixed(2) });
        results.push({ unit: 'pt', value: input.toFixed(2) });
        results.push({ unit: 'pc', value: (input / 12).toFixed(4) });
        results.push({ unit: 'in', value: (input / 72).toFixed(4) });
        results.push({ unit: 'cm', value: (input / 28.35).toFixed(4) });
        results.push({ unit: 'mm', value: (input / 2.835).toFixed(2) });
        break;

      case 'pc':
        const pcValue = input * 16;
        results.push({ unit: 'px', value: pcValue.toFixed(2) });
        results.push({ unit: 'em', value: (pcValue / baseSizeNum).toFixed(4) });
        results.push({ unit: 'rem', value: (pcValue / baseSizeNum).toFixed(4) });
        results.push({ unit: '%', value: ((pcValue / containerSizeNum) * 100).toFixed(2) });
        results.push({ unit: 'vh', value: ((pcValue / viewportHeightNum) * 100).toFixed(2) });
        results.push({ unit: 'vw', value: ((pcValue / viewportWidthNum) * 100).toFixed(2) });
        results.push({ unit: 'vmin', value: ((pcValue / viewportMinNum) * 100).toFixed(2) });
        results.push({ unit: 'vmax', value: ((pcValue / viewportMaxNum) * 100).toFixed(2) });
        results.push({ unit: 'pt', value: (input * 12).toFixed(2) });
        results.push({ unit: 'pc', value: input.toFixed(4) });
        results.push({ unit: 'in', value: (input / 6).toFixed(4) });
        results.push({ unit: 'cm', value: (input * 0.423).toFixed(4) });
        results.push({ unit: 'mm', value: (input * 4.23).toFixed(2) });
        break;

      case 'in':
        const inValue = input * 96;
        results.push({ unit: 'px', value: inValue.toFixed(2) });
        results.push({ unit: 'em', value: (inValue / baseSizeNum).toFixed(4) });
        results.push({ unit: 'rem', value: (inValue / baseSizeNum).toFixed(4) });
        results.push({ unit: '%', value: ((inValue / containerSizeNum) * 100).toFixed(2) });
        results.push({ unit: 'vh', value: ((inValue / viewportHeightNum) * 100).toFixed(2) });
        results.push({ unit: 'vw', value: ((inValue / viewportWidthNum) * 100).toFixed(2) });
        results.push({ unit: 'vmin', value: ((inValue / viewportMinNum) * 100).toFixed(2) });
        results.push({ unit: 'vmax', value: ((inValue / viewportMaxNum) * 100).toFixed(2) });
        results.push({ unit: 'pt', value: (input * 72).toFixed(2) });
        results.push({ unit: 'pc', value: (input * 6).toFixed(4) });
        results.push({ unit: 'in', value: input.toFixed(4) });
        results.push({ unit: 'cm', value: (input * 2.54).toFixed(4) });
        results.push({ unit: 'mm', value: (input * 25.4).toFixed(2) });
        break;

      case 'cm':
        const cmValue = input * 37.8;
        results.push({ unit: 'px', value: cmValue.toFixed(2) });
        results.push({ unit: 'em', value: (cmValue / baseSizeNum).toFixed(4) });
        results.push({ unit: 'rem', value: (cmValue / baseSizeNum).toFixed(4) });
        results.push({ unit: '%', value: ((cmValue / containerSizeNum) * 100).toFixed(2) });
        results.push({ unit: 'vh', value: ((cmValue / viewportHeightNum) * 100).toFixed(2) });
        results.push({ unit: 'vw', value: ((cmValue / viewportWidthNum) * 100).toFixed(2) });
        results.push({ unit: 'vmin', value: ((cmValue / viewportMinNum) * 100).toFixed(2) });
        results.push({ unit: 'vmax', value: ((cmValue / viewportMaxNum) * 100).toFixed(2) });
        results.push({ unit: 'pt', value: (input * 28.35).toFixed(2) });
        results.push({ unit: 'pc', value: (input * 2.36).toFixed(4) });
        results.push({ unit: 'in', value: (input / 2.54).toFixed(4) });
        results.push({ unit: 'cm', value: input.toFixed(4) });
        results.push({ unit: 'mm', value: (input * 10).toFixed(2) });
        break;

      case 'mm':
        const mmValue = input * 3.78;
        results.push({ unit: 'px', value: mmValue.toFixed(2) });
        results.push({ unit: 'em', value: (mmValue / baseSizeNum).toFixed(4) });
        results.push({ unit: 'rem', value: (mmValue / baseSizeNum).toFixed(4) });
        results.push({ unit: '%', value: ((mmValue / containerSizeNum) * 100).toFixed(2) });
        results.push({ unit: 'vh', value: ((mmValue / viewportHeightNum) * 100).toFixed(2) });
        results.push({ unit: 'vw', value: ((mmValue / viewportWidthNum) * 100).toFixed(2) });
        results.push({ unit: 'vmin', value: ((mmValue / viewportMinNum) * 100).toFixed(2) });
        results.push({ unit: 'vmax', value: ((mmValue / viewportMaxNum) * 100).toFixed(2) });
        results.push({ unit: 'pt', value: (input * 2.835).toFixed(2) });
        results.push({ unit: 'pc', value: (input * 0.236).toFixed(4) });
        results.push({ unit: 'in', value: (input / 25.4).toFixed(4) });
        results.push({ unit: 'cm', value: (input / 10).toFixed(4) });
        results.push({ unit: 'mm', value: input.toFixed(2) });
        break;
    }

    return results;
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setInputValue('16');
    setInputUnit('px');
    setBaseSize('16');
    setViewportWidth('1920');
    setViewportHeight('1080');
    setContainerSize('1000');
  };

  // Get unit descriptions
  const getUnitDescription = (unit: UnitType): string => {
    switch (unit) {
      case 'px':
        return 'Pixels (absolute unit)';
      case 'em':
        return 'Relative to parent element font size';
      case 'rem':
        return 'Relative to root element font size';
      case '%':
        return 'Percentage of parent element';
      case 'vh':
        return 'Percentage of viewport height';
      case 'vw':
        return 'Percentage of viewport width';
      case 'vmin':
        return 'Percentage of viewport\'s smaller dimension';
      case 'vmax':
        return 'Percentage of viewport\'s larger dimension';
      case 'pt':
        return 'Points (1/72 of an inch)';
      case 'pc':
        return 'Picas (1/6 of an inch)';
      case 'in':
        return 'Inches';
      case 'cm':
        return 'Centimeters';
      case 'mm':
        return 'Millimeters';
      default:
        return '';
    }
  };

  const results = convertUnits();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              CSS Unit Converter
            </h1>

            <div className="w-full mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Convert Units</h2>
                <button
                  onClick={handleReset}
                  className="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Value
                    </label>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Unit
                    </label>
                    <select
                      value={inputUnit}
                      onChange={(e) => setInputUnit(e.target.value as UnitType)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit} - {getUnitDescription(unit)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Reference Values (for relative units)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Base Font Size (px)
                      </label>
                      <input
                        type="number"
                        value={baseSize}
                        onChange={(e) => setBaseSize(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        For em/rem calculations
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Viewport Width (px)
                      </label>
                      <input
                        type="number"
                        value={viewportWidth}
                        onChange={(e) => setViewportWidth(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        For vw calculations
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Viewport Height (px)
                      </label>
                      <input
                        type="number"
                        value={viewportHeight}
                        onChange={(e) => setViewportHeight(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        For vh calculations
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Container Size (px)
                      </label>
                      <input
                        type="number"
                        value={containerSize}
                        onChange={(e) => setContainerSize(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        For % calculations
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Conversion Results
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((result) => (
                      <div
                        key={result.unit}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <span className="text-lg font-medium text-gray-900 dark:text-white">
                            {result.value}
                            <span className="text-gray-600 dark:text-gray-300">{result.unit}</span>
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {getUnitDescription(result.unit)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopy(`${result.value}${result.unit}`)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                        >
                          {copied === `${result.value}${result.unit}` ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                About CSS Units
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Absolute Units</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Absolute units are fixed and will appear as exactly that size. These include px (pixels), pt (points), pc (picas), in (inches), cm (centimeters), and mm (millimeters).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Relative Units</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Relative units are based on something else, like the parent element's font size (em), the root element's font size (rem), or the viewport dimensions (vh, vw, vmin, vmax).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">When to Use Each</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                    <li><span className="font-medium">px</span>: Good for precise control, but doesn't scale with user preferences</li>
                    <li><span className="font-medium">em/rem</span>: Best for typography and elements that should scale with text size</li>
                    <li><span className="font-medium">%</span>: Useful for responsive layouts relative to parent elements</li>
                    <li><span className="font-medium">vh/vw</span>: Perfect for full-viewport layouts and responsive design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}