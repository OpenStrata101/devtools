import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Palette, Box, Wand2, Layers, FileText } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  {
    icon: Palette,
    label: 'Colors',
    path: '/colors',
    subItems: [
      { label: 'Random Color', path: '/colors/random' },
      { label: 'Linear Gradient', path: '/colors/linear-gradient' },
      { label: 'Mesh Gradient', path: '/colors/mesh-gradient' },
      { label: 'Color Palette', path: '/colors/palette' },
    ],
  },
  {
    icon: Box,
    label: 'Generators',
    path: '/generators',
    subItems: [
      { label: 'Box Shadow', path: '/generators/box-shadow' },
      { label: 'SVG Wave', path: '/generators/wave' },
      { label: 'Glassmorphism', path: '/generators/glassmorphism' },
      { label: 'Neumorphism', path: '/generators/neumorphism' },
      { label: 'Border Radius', path: '/generators/border-radius' },
      { label: 'Button', path: '/generators/button' },
      { label: 'Animation', path: '/generators/animation' },
      { label: 'Pattern', path: '/generators/pattern' },
      { label: 'Meta Tags', path: '/generators/meta-tags' },
      { label: 'Lorem Ipsum', path: '/generators/lorem-ipsum' },
    ],
  },
  {
    icon: Layers,
    label: 'Design',
    path: '/design',
    subItems: [
      { label: 'Grid & Flexbox', path: '/playground/layout' },
    ],
  },
  {
    icon: FileText,
    label: 'Tools',
    path: '/tools',
    subItems: [
      { label: 'Unit Converter', path: '/tools/unit-converter' },
      { label: 'JSON Tools', path: '/tools/json' },
      { label: 'HTTP Status', path: '/tools/http-status' },
      { label: 'Text Case', path: '/tools/text-case' },
    ],
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-gray-800 group-hover:bg-indigo-100 dark:group-hover:bg-gray-700 transition-colors">
                <Wand2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                DevTools
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={item.path}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
                {activeMenu === item.label && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="pl-4 border-l border-gray-200 dark:border-gray-700">
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.path}
                  className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
                <div className="pl-8 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="px-3 py-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}