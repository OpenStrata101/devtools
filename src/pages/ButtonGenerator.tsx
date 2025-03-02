import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw, Plus, Minus, ArrowRight, Zap, Heart, Star, Bell, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

type ButtonStyle = 'solid' | 'outline' | 'ghost' | 'soft' | 'glass' | 'gradient';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
type ButtonAnimation = 'none' | 'scale' | 'pulse' | 'bounce' | 'shine';
type IconPosition = 'none' | 'left' | 'right' | 'only';
type IconType = 'arrow' | 'zap' | 'heart' | 'star' | 'bell' | 'mail';

interface ButtonConfig {
  text: string;
  style: ButtonStyle;
  size: ButtonSize;
  radius: ButtonRadius;
  animation: ButtonAnimation;
  icon: {
    position: IconPosition;
    type: IconType;
  };
  colors: {
    background: string;
    text: string;
    border: string;
    hoverBackground: string;
    hoverText: string;
    hoverBorder: string;
  };
  shadow: boolean;
  uppercase: boolean;
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  paddingX: number;
  paddingY: number;
}

export function ButtonGenerator() {
  const [config, setConfig] = useState<ButtonConfig>({
    text: 'Button',
    style: 'solid',
    size: 'md',
    radius: 'md',
    animation: 'none',
    icon: {
      position: 'none',
      type: 'arrow',
    },
    colors: {
      background: '#4f46e5',
      text: '#ffffff',
      border: '#4f46e5',
      hoverBackground: '#4338ca',
      hoverText: '#ffffff',
      hoverBorder: '#4338ca',
    },
    shadow: true,
    uppercase: false,
    fontWeight: 'medium',
    paddingX: 4,
    paddingY: 2,
  });
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'style' | 'colors' | 'advanced'>('style');

  const getIconComponent = (type: IconType) => {
    switch (type) {
      case 'arrow':
        return <ArrowRight className="w-full h-full" />;
      case 'zap':
        return <Zap className="w-full h-full" />;
      case 'heart':
        return <Heart className="w-full h-full" />;
      case 'star':
        return <Star className="w-full h-full" />;
      case 'bell':
        return <Bell className="w-full h-full" />;
      case 'mail':
        return <Mail className="w-full h-full" />;
      default:
        return <ArrowRight className="w-full h-full" />;
    }
  };

  const getSizeClasses = (size: ButtonSize) => {
    switch (size) {
      case 'xs':
        return 'text-xs';
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  const getRadiusClasses = (radius: ButtonRadius) => {
    switch (radius) {
      case 'none':
        return 'rounded-none';
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded-md';
      case 'lg':
        return 'rounded-lg';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-md';
    }
  };

  const getAnimationClasses = (animation: ButtonAnimation) => {
    switch (animation) {
      case 'scale':
        return 'transition-transform hover:scale-105 active:scale-95';
      case 'pulse':
        return 'hover:animate-pulse';
      case 'bounce':
        return 'hover:animate-bounce';
      case 'shine':
        return 'relative overflow-hidden hover:before:absolute hover:before:inset-0 hover:before:bg-white hover:before:opacity-20 hover:before:animate-shine';
      default:
        return '';
    }
  };

  const getFontWeightClasses = (weight: string) => {
    switch (weight) {
      case 'normal':
        return 'font-normal';
      case 'medium':
        return 'font-medium';
      case 'semibold':
        return 'font-semibold';
      case 'bold':
        return 'font-bold';
      default:
        return 'font-medium';
    }
  };

  const getButtonStyles = () => {
    const baseStyles: React.CSSProperties = {
      padding: `${config.paddingY * 0.25}rem ${config.paddingX * 0.25}rem`,
      fontWeight: config.fontWeight === 'normal' ? 400 : 
                 config.fontWeight === 'medium' ? 500 :
                 config.fontWeight === 'semibold' ? 600 : 700,
      textTransform: config.uppercase ? 'uppercase' : 'none',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      boxShadow: config.shadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
    };

    switch (config.style) {
      case 'solid':
        return {
          ...baseStyles,
          backgroundColor: config.colors.background,
          color: config.colors.text,
          border: 'none',
          ':hover': {
            backgroundColor: config.colors.hoverBackground,
            color: config.colors.hoverText,
          },
        };
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: config.colors.border,
          border: `2px solid ${config.colors.border}`,
          ':hover': {
            backgroundColor: config.colors.hoverBackground,
            color: config.colors.hoverText,
            borderColor: config.colors.hoverBorder,
          },
        };
      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: config.colors.background,
          border: 'none',
          ':hover': {
            backgroundColor: `${config.colors.background}20`,
            color: config.colors.hoverText,
          },
        };
      case 'soft':
        return {
          ...baseStyles,
          backgroundColor: `${config.colors.background}20`,
          color: config.colors.background,
          border: 'none',
          ':hover': {
            backgroundColor: `${config.colors.hoverBackground}30`,
            color: config.colors.hoverText,
          },
        };
      case 'glass':
        return {
          ...baseStyles,
          backgroundColor: `${config.colors.background}30`,
          backdropFilter: 'blur(8px)',
          color: config.colors.text,
          border: `1px solid ${config.colors.background}40`,
          ':hover': {
            backgroundColor: `${config.colors.hoverBackground}40`,
            color: config.colors.hoverText,
          },
        };
      case 'gradient':
        return {
          ...baseStyles,
          background: `linear-gradient(to right, ${config.colors.background}, ${config.colors.border})`,
          color: config.colors.text,
          border: 'none',
          ':hover': {
            background: `linear-gradient(to right, ${config.colors.hoverBackground}, ${config.colors.hoverBorder})`,
            color: config.colors.hoverText,
          },
        };
      default:
        return baseStyles;
    }
  };

  const generateButtonHTML = () => {
    const iconSize = config.size === 'xs' ? 'w-3 h-3' : 
                    config.size === 'sm' ? 'w-4 h-4' : 
                    config.size === 'md' ? 'w-5 h-5' : 
                    config.size === 'lg' ? 'w-6 h-6' : 'w-7 h-7';
    
    let buttonContent = '';
    
    if (config.icon.position === 'left' || config.icon.position === 'only') {
      buttonContent += `<span class="${iconSize}">${getIconSVG(config.icon.type)}</span>`;
    }
    
    if (config.icon.position !== 'only') {
      buttonContent += config.icon.position === 'left' ? ' ' : '';
      buttonContent += config.text;
      buttonContent += config.icon.position === 'right' ? ' ' : '';
    }
    
    if (config.icon.position === 'right') {
      buttonContent += `<span class="${iconSize}">${getIconSVG(config.icon.type)}</span>`;
    }

    const buttonStyles = getButtonStyles();
    const inlineStyles = Object.entries(buttonStyles)
      .map(([key, value]) => {
        if (key === ':hover') return '';
        // Convert camelCase to kebab-case
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssKey}: ${value};`;
      })
      .filter(Boolean)
      .join(' ');

    const hoverStyles = buttonStyles[':hover'] 
      ? Object.entries(buttonStyles[':hover'])
          .map(([key, value]) => {
            const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            return `${cssKey}: ${value};`;
          })
          .join(' ')
      : '';

    return `<button class="${getSizeClasses(config.size)} ${getRadiusClasses(config.radius)} ${getAnimationClasses(config.animation)} ${getFontWeightClasses(config.fontWeight)}" style="${inlineStyles}">
  ${buttonContent}
</button>

<style>
  button:hover {
    ${hoverStyles}
  }
  
  @keyframes shine {
    from {
      transform: translateX(-100%) rotate(45deg);
    }
    to {
      transform: translateX(100%) rotate(45deg);
    }
  }
  
  .animate-shine {
    animation: shine 1.5s infinite;
  }
</style>`;
  };

  const getIconSVG = (type: IconType) => {
    switch (type) {
      case 'arrow':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`;
      case 'zap':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
      case 'heart':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`;
      case 'star':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      case 'bell':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>`;
      case 'mail':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`;
      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`;
    }
  };

  const generateTailwindClasses = () => {
    const sizeClasses = {
      xs: 'text-xs px-2 py-1',
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-5 py-2.5',
      xl: 'text-xl px-6 py-3',
    };

    const radiusClasses = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    const fontWeightClasses = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    let classes = [
      sizeClasses[config.size],
      radiusClasses[config.radius],
      fontWeightClasses[config.fontWeight],
      config.uppercase ? 'uppercase' : '',
      'inline-flex items-center justify-center',
      'transition-all duration-200',
      config.shadow ? 'shadow-md' : '',
    ];

    // Style-specific classes
    switch (config.style) {
      case 'solid':
        classes.push(`bg-[${config.colors.background}] text-[${config.colors.text}] hover:bg-[${config.colors.hoverBackground}] hover:text-[${config.colors.hoverText}]`);
        break;
      case 'outline':
        classes.push(`bg-transparent text-[${config.colors.border}] border-2 border-[${config.colors.border}] hover:bg-[${config.colors.hoverBackground}] hover:text-[${config.colors.hoverText}] hover:border-[${config.colors.hoverBorder}]`);
        break;
      case 'ghost':
        classes.push(`bg-transparent text-[${config.colors.background}] hover:bg-[${config.colors.background}]/20 hover:text-[${config.colors.hoverText}]`);
        break;
      case 'soft':
        classes.push(`bg-[${config.colors.background}]/20 text-[${config.colors.background}] hover:bg-[${config.colors.hoverBackground}]/30 hover:text-[${config.colors.hoverText}]`);
        break;
      case 'glass':
        classes.push(`bg-[${config.colors.background}]/30 backdrop-blur-md text-[${config.colors.text}] border border-[${config.colors.background}]/40 hover:bg-[${config.colors.hoverBackground}]/40 hover:text-[${config.colors.hoverText}]`);
        break;
      case 'gradient':
        classes.push(`bg-gradient-to-r from-[${config.colors.background}] to-[${config.colors.border}] text-[${config.colors.text}] hover:from-[${config.colors.hoverBackground}] hover:to-[${config.colors.hoverBorder}] hover:text-[${config.colors.hoverText}]`);
        break;
    }

    // Animation classes
    switch (config.animation) {
      case 'scale':
        classes.push('hover:scale-105 active:scale-95');
        break;
      case 'pulse':
        classes.push('hover:animate-pulse');
        break;
      case 'bounce':
        classes.push('hover:animate-bounce');
        break;
      case 'shine':
        classes.push('relative overflow-hidden hover:before:absolute hover:before:inset-0 hover:before:bg-white/20 hover:before:animate-shine');
        break;
    }

    return classes.filter(Boolean).join(' ');
  };

  const handleCopy = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setConfig({
      text: 'Button',
      style: 'solid',
      size: 'md',
      radius: 'md',
      animation: 'none',
      icon: {
        position: 'none',
        type: 'arrow',
      },
      colors: {
        background: '#4f46e5',
        text: '#ffffff',
        border: '#4f46e5',
        hoverBackground: '#4338ca',
        hoverText: '#ffffff',
        hoverBorder: '#4338ca',
      },
      shadow: true,
      uppercase: false,
      fontWeight: 'medium',
      paddingX: 4,
      paddingY: 2,
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
              Button Generator
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

              <div className="w-full h-40 rounded-lg mb-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <button
                  className={cn(
                    getSizeClasses(config.size),
                    getRadiusClasses(config.radius),
                    getAnimationClasses(config.animation),
                    getFontWeightClasses(config.fontWeight),
                    config.uppercase ? 'uppercase' : ''
                  )}
                  style={getButtonStyles()}
                >
                  {(config.icon.position === 'left' || config.icon.position === 'only') && (
                    <span className={
                      config.size === 'xs' ? 'w-3 h-3' : 
                      config.size === 'sm' ? 'w-4 h-4' : 
                      config.size === 'md' ? 'w-5 h-5' : 
                      config.size === 'lg' ? 'w-6 h-6' : 'w-7 h-7'
                    }>
                      {getIconComponent(config.icon.type)}
                    </span>
                  )}
                  {config.icon.position !== 'only' && config.text}
                  {config.icon.position === 'right' && (
                    <span className={
                      config.size === 'xs' ? 'w-3 h-3' : 
                      config.size === 'sm' ? 'w-4 h-4' : 
                      config.size === 'md' ? 'w-5 h-5' : 
                      config.size === 'lg' ? 'w-6 h-6' : 'w-7 h-7'
                    }>
                      {getIconComponent(config.icon.type)}
                    </span>
                  )}
                </button>
              </div>

              <div className="mb-6">
                <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                  <button
                    onClick={() => setActiveTab('style')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === 'style'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Style & Layout
                  </button>
                  <button
                    onClick={() => setActiveTab('colors')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === 'colors'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Colors
                  </button>
                  <button
                    onClick={() => setActiveTab('advanced')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === 'advanced'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Advanced
                  </button>
                </div>

                {activeTab === 'style' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={config.text}
                        onChange={(e) => setConfig({ ...config, text: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Button Style
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['solid', 'outline', 'ghost', 'soft', 'glass', 'gradient'] as ButtonStyle[]).map((style) => (
                          <button
                            key={style}
                            onClick={() => setConfig({ ...config, style })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                              config.style === style
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Button Size
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as ButtonSize[]).map((size) => (
                          <button
                            key={size}
                            onClick={() => setConfig({ ...config, size })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium uppercase transition-colors ${
                              config.size === size
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Border Radius
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {(['none', 'sm', 'md', 'lg', 'full'] as ButtonRadius[]).map((radius) => (
                          <button
                            key={radius}
                            onClick={() => setConfig({ ...config, radius })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                              config.radius === radius
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {radius}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Icon
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Position
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {(['none', 'left', 'right', 'only'] as IconPosition[]).map((position) => (
                              <button
                                key={position}
                                onClick={() => setConfig({
                                  ...config,
                                  icon: { ...config.icon, position }
                                })}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                                  config.icon.position === position
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                              >
                                {position}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Icon Type
                          </label>
                          <select
                            value={config.icon.type}
                            onChange={(e) => setConfig({
                              ...config,
                              icon: { ...config.icon, type: e.target.value as IconType }
                            })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            disabled={config.icon.position === 'none'}
                          >
                            <option value="arrow">Arrow</option>
                            <option value="zap">Zap</option>
                            <option value="heart">Heart</option>
                            <option value="star">Star</option>
                            <option value="bell">Bell</option>
                            <option value="mail">Mail</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'colors' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Background Color
                        </label>
                        <div className="flex">
                          <input
                            type="color"
                            value={config.colors.background}
                            onChange={(e) => setConfig({
                              ...config,
                              colors: { ...config.colors, background: e.target.value }
                            })}
                            className="h-10 w-10 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.colors.background}
                            onChange={(e) => setConfig({
                              ...config,
                              colors: { ...config.colors, background: e.target.value }
                            })}
                            className="ml-2 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Text Color
                        </label>
                        <div className="flex">
                          <input
                            type="color"
                            value={config.colors.text}
                            onChange={(e) => setConfig({
                              ...config,
                              colors: { ...config.colors, text: e.target.value }
                            })}
                            className="h-10 w-10 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.colors.text}
                            onChange={(e) => setConfig({
                              ...config,
                              colors: { ...config.colors, text: e.target.value }
                            })}
                            className="ml-2 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Border Color
                        </label>
                        <div className="flex">
                          <input
                            type="color"
                            value={config.colors.border}
                            onChange={(e) => setConfig({
                              ...config,
                              colors: { ...config.colors, border: e.target.value }
                            })}
                            className="h-10 w-10 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.colors.border}
                            onChange={(e) => setConfig({
                              ...config,
                              colors: { ...config.colors, border: e.target.value }
                            })}
                            className="ml-2 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Hover Colors
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Hover Background
                          </label>
                          <div className="flex">
                            <input
                              type="color"
                              value={config.colors.hoverBackground}
                              onChange={(e) => setConfig({
                                ...config,
                                colors: { ...config.colors, hoverBackground: e.target.value }
                              })}
                              className="h-10 w-10 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={config.colors.hoverBackground}
                              onChange={(e) => setConfig({
                                ...config,
                                colors: { ...config.colors, hoverBackground: e.target.value }
                              })}
                              className="ml-2 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Hover Text
                          </label>
                          <div className="flex">
                            <input
                              type="color"
                              value={config.colors.hoverText}
                              onChange={(e) => setConfig({
                                ...config,
                                colors: { ...config.colors, hoverText: e.target.value }
                              })}
                              className="h-10 w-10 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={config.colors.hoverText}
                              onChange={(e) => setConfig({
                                ...config,
                                colors: { ...config.colors, hoverText: e.target.value }
                              })}
                              className="ml-2 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Hover Border
                          </label>
                          <div className="flex">
                            <input
                              type="color"
                              value={config.colors.hoverBorder}
                              onChange={(e) => setConfig({
                                ...config,
                                colors: { ...config.colors, hoverBorder: e.target.value }
                              })}
                              className="h-10 w-10 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={config.colors.hoverBorder}
                              onChange={(e) => setConfig({
                                ...config,
                                colors: { ...config.colors, hoverBorder: e.target.value }
                              })}
                              className="ml-2 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'advanced' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Animation
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {(['none', 'scale', 'pulse', 'bounce', 'shine'] as ButtonAnimation[]).map((animation) => (
                          <button
                            key={animation}
                            onClick={() => setConfig({ ...config, animation })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                              config.animation === animation
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {animation}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Font Weight
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {(['normal', 'medium', 'semibold', 'bold'] as const).map((weight) => (
                          <button
                            key={weight}
                            onClick={() => setConfig({ ...config, fontWeight: weight })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                              config.fontWeight === weight
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {weight}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Horizontal Padding: {config.paddingX}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          value={config.paddingX}
                          onChange={(e) => setConfig({ ...config, paddingX: parseInt(e.target.value) })}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Vertical Padding: {config.paddingY}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="8"
                          value={config.paddingY}
                          onChange={(e) => setConfig({ ...config, paddingY: parseInt(e.target.value) })}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex items-center">
                        <input
                          id="shadow"
                          type="checkbox"
                          checked={config.shadow}
                          onChange={(e) => setConfig({ ...config, shadow: e.target.checked })}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="shadow" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Add Shadow
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="uppercase"
                          type="checkbox"
                          checked={config.uppercase}
                          onChange={(e) => setConfig({ ...config, uppercase: e.target.checked })}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="uppercase" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Uppercase Text
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">HTML & CSS</span>
                  <button
                    onClick={() => handleCopy(generateButtonHTML(), 'html')}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                  >
                    {copied === 'html' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                </div>
                <code className="block mt-2 text-sm text-gray-800 dark:text-gray-200 break-all whitespace-pre-wrap">
                  {generateButtonHTML()}
                </code>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Tailwind CSS</span>
                  <button
                    onClick={() => handleCopy(generateTailwindClasses(), 'tailwind')}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                  >
                    {copied === 'tailwind' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                </div>
                <code className="block mt-2 text-sm text-gray-800 dark:text-gray-200 break-all whitespace-pre-wrap">
                  {generateTailwindClasses()}
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}