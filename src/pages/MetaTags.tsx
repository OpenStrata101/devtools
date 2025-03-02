import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw, ExternalLink } from 'lucide-react';

interface MetaTagsConfig {
  title: string;
  description: string;
  keywords: string;
  author: string;
  viewport: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  themeColor: string;
  favicon: string;
  appleIcon: string;
  canonical: string;
}

export function MetaTags() {
  const [config, setConfig] = useState<MetaTagsConfig>({
    title: 'My Website',
    description: 'A description of my website content',
    keywords: 'website, html, meta tags',
    author: 'Your Name',
    viewport: 'width=device-width, initial-scale=1.0',
    robots: 'index, follow',
    ogTitle: 'My Website',
    ogDescription: 'A description of my website content',
    ogImage: 'https://example.com/image.jpg',
    ogUrl: 'https://example.com',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'My Website',
    twitterDescription: 'A description of my website content',
    twitterImage: 'https://example.com/image.jpg',
    twitterSite: '@yourusername',
    themeColor: '#4f46e5',
    favicon: '/favicon.ico',
    appleIcon: '/apple-touch-icon.png',
    canonical: 'https://example.com',
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'opengraph' | 'twitter' | 'other'>('basic');

  const handleChange = (key: keyof MetaTagsConfig, value: string) => {
    setConfig({ ...config, [key]: value });
  };

  const generateMetaTags = () => {
    let tags = `<!-- Basic Meta Tags -->\n<title>${config.title}</title>\n`;
    
    if (config.description) {
      tags += `<meta name="description" content="${config.description}" />\n`;
    }
    
    if (config.keywords) {
      tags += `<meta name="keywords" content="${config.keywords}" />\n`;
    }
    
    if (config.author) {
      tags += `<meta name="author" content="${config.author}" />\n`;
    }
    
    if (config.viewport) {
      tags += `<meta name="viewport" content="${config.viewport}" />\n`;
    }
    
    if (config.robots) {
      tags += `<meta name="robots" content="${config.robots}" />\n`;
    }
    
    if (config.canonical) {
      tags += `<link rel="canonical" href="${config.canonical}" />\n`;
    }
    
    tags += `\n<!-- Open Graph Meta Tags -->\n`;
    
    if (config.ogTitle) {
      tags += `<meta property="og:title" content="${config.ogTitle}" />\n`;
    }
    
    if (config.ogDescription) {
      tags += `<meta property="og:description" content="${config.ogDescription}" />\n`;
    }
    
    if (config.ogImage) {
      tags += `<meta property="og:image" content="${config.ogImage}" />\n`;
    }
    
    if (config.ogUrl) {
      tags += `<meta property="og:url" content="${config.ogUrl}" />\n`;
    }
    
    if (config.ogType) {
      tags += `<meta property="og:type" content="${config.ogType}" />\n`;
    }
    
    tags += `\n<!-- Twitter Meta Tags -->\n`;
    
    if (config.twitterCard) {
      tags += `<meta name="twitter:card" content="${config.twitterCard}" />\n`;
    }
    
    if (config.twitterTitle) {
      tags += `<meta name="twitter:title" content="${config.twitterTitle}" />\n`;
    }
    
    if (config.twitterDescription) {
      tags += `<meta name="twitter:description" content="${config.twitterDescription}" />\n`;
    }
    
    if (config.twitterImage) {
      tags += `<meta name="twitter:image" content="${config.twitterImage}" />\n`;
    }
    
    if (config.twitterSite) {
      tags += `<meta name="twitter:site" content="${config.twitterSite}" />\n`;
    }
    
    tags += `\n<!-- Other Meta Tags -->\n`;
    
    if (config.themeColor) {
      tags += `<meta name="theme-color" content="${config.themeColor}" />\n`;
    }
    
    if (config.favicon) {
      tags += `<link rel="icon" href="${config.favicon}" />\n`;
    }
    
    if (config.appleIcon) {
      tags += `<link rel="apple-touch-icon" href="${config.appleIcon}" />\n`;
    }
    
    return tags;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setConfig({
      title: 'My Website',
      description: 'A description of my website content',
      keywords: 'website, html, meta tags',
      author: 'Your Name',
      viewport: 'width=device-width, initial-scale=1.0',
      robots: 'index, follow',
      ogTitle: 'My Website',
      ogDescription: 'A description of my website content',
      ogImage: 'https://example.com/image.jpg',
      ogUrl: 'https://example.com',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'My Website',
      twitterDescription: 'A description of my website content',
      twitterImage: 'https://example.com/image.jpg',
      twitterSite: '@yourusername',
      themeColor: '#4f46e5',
      favicon: '/favicon.ico',
      appleIcon: '/apple-touch-icon.png',
      canonical: 'https://example.com',
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
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Meta Tags Generator
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Configure Meta Tags</h2>
                  <button
                    onClick={handleReset}
                    className="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                    <button
                      onClick={() => setActiveTab('basic')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === 'basic'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      Basic
                    </button>
                    <button
                      onClick={() => setActiveTab('opengraph')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === 'opengraph'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      Open Graph
                    </button>
                    <button
                      onClick={() => setActiveTab('twitter')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === 'twitter'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      Twitter
                    </button>
                    <button
                      onClick={() => setActiveTab('other')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === 'other'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      Other
                    </button>
                  </div>

                  <div className="space-y-4">
                    {activeTab === 'basic' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            value={config.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description
                          </label>
                          <textarea
                            value={config.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Keywords (comma separated)
                          </label>
                          <input
                            type="text"
                            value={config.keywords}
                            onChange={(e) => handleChange('keywords', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Author
                          </label>
                          <input
                            type="text"
                            value={config.author}
                            onChange={(e) => handleChange('author', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Viewport
                          </label>
                          <input
                            type="text"
                            value={config.viewport}
                            onChange={(e) => handleChange('viewport', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Robots
                          </label>
                          <select
                            value={config.robots}
                            onChange={(e) => handleChange('robots', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          >
                            <option value="index, follow">index, follow</option>
                            <option value="index, nofollow">index, nofollow</option>
                            <option value="noindex, follow">noindex, follow</option>
                            <option value="noindex, nofollow">noindex, nofollow</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Canonical URL
                          </label>
                          <input
                            type="text"
                            value={config.canonical}
                            onChange={(e) => handleChange('canonical', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </>
                    )}

                    {activeTab === 'opengraph' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            OG Title
                          </label>
                          <input
                            type="text"
                            value={config.ogTitle}
                            onChange={(e) => handleChange('ogTitle', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            OG Description
                          </label>
                          <textarea
                            value={config.ogDescription}
                            onChange={(e) => handleChange('ogDescription', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            OG Image URL
                          </label>
                          <input
                            type="text"
                            value={config.ogImage}
                            onChange={(e) => handleChange('ogImage', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            OG URL
                          </label>
                          <input
                            type="text"
                            value={config.ogUrl}
                            onChange={(e) => handleChange('ogUrl', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            OG Type
                          </label>
                          <select
                            value={config.ogType}
                            onChange={(e) => handleChange('ogType', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          >
                            <option value="website">website</option>
                            <option value="article">article</option>
                            <option value="book">book</option>
                            <option value="profile">profile</option>
                            <option value="music.song">music.song</option>
                            <option value="music.album">music.album</option>
                            <option value="video.movie">video.movie</option>
                            <option value="video.tv_show">video.tv_show</option>
                          </select>
                        </div>
                      </>
                    )}

                    {activeTab === 'twitter' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Twitter Card
                          </label>
                          <select
                            value={config.twitterCard}
                            onChange={(e) => handleChange('twitterCard', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          >
                            <option value="summary">summary</option>
                            <option value="summary_large_image">summary_large_image</option>
                            <option value="app">app</option>
                            <option value="player">player</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Twitter Title
                          </label>
                          <input
                            type="text"
                            value={config.twitterTitle}
                            onChange={(e) => handleChange('twitterTitle', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Twitter Description
                          </label>
                          <textarea
                            value={config.twitterDescription}
                            onChange={(e) => handleChange('twitterDescription', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Twitter Image URL
                          </label>
                          <input
                            type="text"
                            value={config.twitterImage}
                            onChange={(e) => handleChange('twitterImage', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Twitter Site (@username)
                          </label>
                          <input
                            type="text"
                            value={config.twitterSite}
                            onChange={(e) => handleChange('twitterSite', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </>
                    )}

                    {activeTab === 'other' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Theme Color
                          </label>
                          <div className="flex">
                            <input
                              type="color"
                              value={config.themeColor}
                              onChange={(e) => handleChange('themeColor', e.target.value)}
                              className="h-10 w-10 rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={config.themeColor}
                              onChange={(e) => handleChange('themeColor', e.target.value)}
                              className="ml-2 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Favicon Path
                          </label>
                          <input
                            type="text"
                            value={config.favicon}
                            onChange={(e) => handleChange('favicon', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Apple Touch Icon Path
                          </label>
                          <input
                            type="text"
                            value={config.appleIcon}
                            onChange={(e) => handleChange('appleIcon', e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Generated Meta Tags</h2>
                  <button
                    onClick={handleCopy}
                    className="flex items-center px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 mr-2" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    {copied ? 'Copied!' : 'Copy All'}
                  </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono overflow-auto max-h-[500px]">
                    {generateMetaTags()}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Meta Tags Guide
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Basic Meta Tags</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    These tags provide basic information about your page to search engines and browsers.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Open Graph Meta Tags</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Used by social media platforms like Facebook to display rich previews when your content is shared.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">Twitter Meta Tags</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Specifically for Twitter to control how your content appears when shared on the platform.
                  </p>
                </div>
                <div>
                  <a
                    href="https://developers.facebook.com/docs/sharing/webmasters/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Open Graph Protocol Documentation
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Twitter Cards Documentation
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}