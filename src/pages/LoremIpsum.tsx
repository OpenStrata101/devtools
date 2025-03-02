import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RotateCcw } from 'lucide-react';

export function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [type, setType] = useState<'lorem' | 'hipster' | 'office' | 'food'>('lorem');
  const [includeHTML, setIncludeHTML] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const loremText = {
    lorem: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.",
      "Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit.",
      "Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna.",
      "Sed sollicitudin ipsum quis nunc sollicitudin ultrices. Donec euismod scelerisque ligula. Maecenas eu varius risus, eu aliquet arcu. Curabitur fermentum suscipit est, tincidunt mattis lorem luctus id. Donec eget massa a diam condimentum pretium. Aliquam erat volutpat. Integer ut tincidunt orci. Etiam tristique, elit ut consectetur iaculis, metus lectus mattis justo, vel mollis eros neque quis augue.",
      "Sed lobortis ultrices lacus, a placerat metus rutrum sit amet. Aenean ut suscipit justo. Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin egestas eros, quis iaculis nulla feugiat vitae. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras adipiscing rhoncus sem. Etiam convallis imperdiet nisl, id pellentesque sem faucibus et.",
    ],
    hipster: [
      "I'm baby pok pok sriracha unicorn, palo santo four loko everyday carry raw denim whatever bicycle rights. Poutine YOLO irony, activated charcoal vegan pok pok drinking vinegar. Pug fixie poke, helvetica vape tote bag taiyaki. Schlitz pug vegan, palo santo humblebrag meditation tote bag.",
      "Craft beer poutine cloud bread, pork belly humblebrag cliche. Vegan palo santo heirloom, pok pok tote bag helvetica. Pug fixie poke, helvetica vape tote bag taiyaki. Schlitz pug vegan, palo santo humblebrag meditation tote bag. Poutine YOLO irony, activated charcoal vegan pok pok drinking vinegar.",
      "Letterpress taxidermy brunch, retro celiac cred mustache fixie cloud bread. Tousled try-hard taiyaki, thundercats fixie palo santo pok pok. Pug fixie poke, helvetica vape tote bag taiyaki. Schlitz pug vegan, palo santo humblebrag meditation tote bag. Poutine YOLO irony, activated charcoal vegan pok pok drinking vinegar.",
      "Mixtape heirloom fixie, vaporware venmo pug palo santo. Pug fixie poke, helvetica vape tote bag taiyaki. Schlitz pug vegan, palo santo humblebrag meditation tote bag. Poutine YOLO irony, activated charcoal vegan pok pok drinking vinegar. Craft beer poutine cloud bread, pork belly humblebrag cliche.",
      "Vegan palo santo heirloom, pok pok tote bag helvetica. Pug fixie poke, helvetica vape tote bag taiyaki. Schlitz pug vegan, palo santo humblebrag meditation tote bag. Poutine YOLO irony, activated charcoal vegan pok pok drinking vinegar. Craft beer poutine cloud bread, pork belly humblebrag cliche.",
    ],
    office: [
      "Leveraging agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
      "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.",
      "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.",
      "Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.",
      "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.",
    ],
    food: [
      "Cupcake ipsum dolor sit amet. Pastry cotton candy jelly beans candy canes. Tootsie roll chocolate bar jelly-o chocolate cake. Jelly beans chocolate cake pudding gummi bears pudding jujubes dragée. Chocolate bar chocolate cake chocolate bar pudding chocolate bar marzipan.",
      "Tiramisu chocolate cake chocolate bar. Gummies jelly-o cupcake. Chocolate cake chocolate bar chocolate bar pudding chocolate bar marzipan. Pastry cotton candy jelly beans candy canes. Tootsie roll chocolate bar jelly-o chocolate cake.",
      "Jelly beans chocolate cake pudding gummi bears pudding jujubes dragée. Chocolate bar chocolate cake chocolate bar pudding chocolate bar marzipan. Pastry cotton candy jelly beans candy canes. Tootsie roll chocolate bar jelly-o chocolate cake. Jelly beans chocolate cake pudding gummi bears pudding jujubes dragée.",
      "Chocolate bar chocolate cake chocolate bar pudding chocolate bar marzipan. Pastry cotton candy jelly beans candy canes. Tootsie roll chocolate bar jelly-o chocolate cake. Jelly beans chocolate cake pudding gummi bears pudding jujubes dragée. Chocolate bar chocolate cake chocolate bar pudding chocolate bar marzipan.",
      "Pastry cotton candy jelly beans candy canes. Tootsie roll chocolate bar jelly-o chocolate cake. Jelly beans chocolate cake pudding gummi bears pudding jujubes dragée. Chocolate bar chocolate cake chocolate bar pudding chocolate bar marzipan. Pastry cotton candy jelly beans candy canes.",
    ],
  };

  const generateText = () => {
    const selectedText = loremText[type];
    let result = '';
    
    for (let i = 0; i < paragraphs; i++) {
      const index = i % selectedText.length;
      if (includeHTML) {
        result += `<p>${selectedText[index]}</p>\n\n`;
      } else {
        result += `${selectedText[index]}\n\n`;
      }
    }
    
    return result.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setParagraphs(3);
    setType('lorem');
    setIncludeHTML(false);
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
              Lorem Ipsum Generator
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Options</h2>
                  <button
                    onClick={handleReset}
                    className="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Number of Paragraphs: {paragraphs}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={paragraphs}
                      onChange={(e) => setParagraphs(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Text Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setType('lorem')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          type === 'lorem'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        Lorem Ipsum
                      </button>
                      <button
                        onClick={() => setType('hipster')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          type === 'hipster'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        Hipster
                      </button>
                      <button
                        onClick={() => setType('office')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          type === 'office'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        Office
                      </button>
                      <button
                        onClick={() => setType('food')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          type === 'food'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        Food
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="html-tags"
                      type="checkbox"
                      checked={includeHTML}
                      onChange={(e) => setIncludeHTML(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="html-tags" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Include HTML paragraph tags
                    </label>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 mr-2" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Generated Text
                </h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg h-[500px] overflow-auto">
                  <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {generateText().split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {includeHTML ? paragraph.replace(/<p>|<\/p>/g, '') : paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                About Lorem Ipsum
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}