import { motion } from 'framer-motion';
import { 
  Palette, Box, Type, RefreshCcw, Layers, 
  Square, Wind, Grid, Move, FileText, 
  Donut as ButtonIcon, Play, Battery as Pattern, 
  LayoutGrid, Ruler, Move3d, Code2, FileJson, 
  AlertCircle, Type as TypeIcon 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  {
    category: "Colors & Gradients",
    items: [
      { icon: Palette, name: 'Color Generator', path: '/colors/random', description: 'Generate beautiful colors with HEX, RGB, and CSS codes' },
      { icon: Layers, name: 'Linear Gradient', path: '/colors/linear-gradient', description: 'Create stunning linear gradients for your designs' },
      { icon: RefreshCcw, name: 'Mesh Gradient', path: '/colors/mesh-gradient', description: 'Design modern mesh gradients with multiple colors' },
      { icon: Grid, name: 'Color Palette', path: '/colors/palette', description: 'Generate harmonious color palettes for your projects' }
    ]
  },
  {
    category: "CSS Generators",
    items: [
      { icon: Square, name: 'Box Shadow', path: '/generators/box-shadow', description: 'Create and customize box shadows visually' },
      { icon: Wind, name: 'SVG Wave', path: '/generators/wave', description: 'Generate beautiful SVG waves for your designs' },
      { icon: Grid, name: 'Glassmorphism', path: '/generators/glassmorphism', description: 'Create modern glass effect designs' },
      { icon: Move, name: 'Neumorphism', path: '/generators/neumorphism', description: 'Generate soft UI/neumorphic designs' },
      { icon: Move3d, name: 'Border Radius', path: '/generators/border-radius', description: 'Create custom border radius shapes' }
    ]
  },
  {
    category: "Design Tools",
    items: [
      { icon: ButtonIcon, name: 'Button Generator', path: '/generators/button', description: 'Create beautiful, customizable buttons' },
      { icon: Play, name: 'Animation', path: '/generators/animation', description: 'Generate CSS animations visually' },
      { icon: Pattern, name: 'SVG Pattern', path: '/generators/pattern', description: 'Create repeatable SVG patterns' },
      { icon: LayoutGrid, name: 'Grid & Flexbox', path: '/playground/layout', description: 'Visual playground for CSS layouts' }
    ]
  },
  {
    category: "Developer Utilities",
    items: [
      { icon: Ruler, name: 'Unit Converter', path: '/tools/unit-converter', description: 'Convert between CSS units' },
      { icon: Code2, name: 'Meta Tags', path: '/generators/meta-tags', description: 'Generate HTML meta tags' },
      { icon: FileJson, name: 'JSON Tools', path: '/tools/json', description: 'Format and validate JSON data' },
      { icon: AlertCircle, name: 'HTTP Status', path: '/tools/http-status', description: 'HTTP status code reference' },
      { icon: TypeIcon, name: 'Text Case', path: '/tools/text-case', description: 'Convert text between different cases' },
      { icon: FileText, name: 'Lorem Ipsum', path: '/generators/lorem-ipsum', description: 'Generate placeholder text' }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center relative"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-lg">
              <Palette className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Developer Tools
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              {' '}Suite
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Your all-in-one toolkit for modern web development. Create, generate, and
            transform with our comprehensive suite of developer tools.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8"
          >
            {tools.map((category, categoryIndex) => (
              <div key={category.category} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-left">
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.items.map((tool, toolIndex) => (
                    <motion.div
                      key={tool.name}
                      variants={itemVariants}
                      className="group"
                    >
                      <Link
                        to={tool.path}
                        className="block h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-center mb-4">
                            <div className="p-2 bg-indigo-50 dark:bg-gray-700 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-gray-600 transition-colors">
                              <tool.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                              {tool.name}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-auto">
                            {tool.description}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}