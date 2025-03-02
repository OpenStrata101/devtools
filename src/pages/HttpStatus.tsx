import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Copy, Check, ExternalLink } from 'lucide-react';

interface StatusCode {
  code: number;
  title: string;
  description: string;
  spec: string;
  category: 'informational' | 'success' | 'redirection' | 'clientError' | 'serverError';
  example?: string;
}

export function HttpStatus() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  const statusCodes: StatusCode[] = [
    // 1xx - Informational
    {
      code: 100,
      title: 'Continue',
      description: 'The server has received the request headers and the client should proceed to send the request body.',
      spec: 'RFC 7231',
      category: 'informational',
      example: 'Used when uploading large files in chunks.'
    },
    {
      code: 101,
      title: 'Switching Protocols',
      description: 'The requester has asked the server to switch protocols and the server has agreed to do so.',
      spec: 'RFC 7231',
      category: 'informational',
      example: 'Upgrading from HTTP to WebSocket.'
    },
    {
      code: 102,
      title: 'Processing',
      description: 'The server has received and is processing the request, but no response is available yet.',
      spec: 'RFC 2518',
      category: 'informational'
    },
    {
      code: 103,
      title: 'Early Hints',
      description: 'Used to return some response headers before final HTTP message.',
      spec: 'RFC 8297',
      category: 'informational',
      example: 'Preloading resources while the server prepares a response.'
    },

    // 2xx - Success
    {
      code: 200,
      title: 'OK',
      description: 'The request has succeeded. The information returned depends on the method used in the request.',
      spec: 'RFC 7231',
      category: 'success',
      example: 'Standard response for successful HTTP requests.'
    },
    {
      code: 201,
      title: 'Created',
      description: 'The request has been fulfilled and has resulted in one or more new resources being created.',
      spec: 'RFC 7231',
      category: 'success',
      example: 'Response to a POST request that creates a new resource.'
    },
    {
      code: 202,
      title: 'Accepted',
      description: 'The request has been accepted for processing, but the processing has not been completed.',
      spec: 'RFC 7231',
      category: 'success',
      example: 'Used for asynchronous processing operations.'
    },
    {
      code: 203,
      title: 'Non-Authoritative Information',
      description: 'The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version of the origin\'s response.',
      spec: 'RFC 7231',
      category: 'success'
    },
    {
      code: 204,
      title: 'No Content',
      description: 'The server has successfully fulfilled the request and there is no additional content to send in the response payload body.',
      spec: 'RFC 7231',
      category: 'success',
      example: 'Response to a DELETE request that removes a resource.'
    },
    {
      code: 205,
      title: 'Reset Content',
      description: 'The server has fulfilled the request and desires that the user agent reset the "document view".',
      spec: 'RFC 7231',
      category: 'success',
      example: 'Used to clear a form after submission.'
    },
    {
      code: 206,
      title: 'Partial Content',
      description: 'The server is delivering only part of the resource due to a range header sent by the client.',
      spec: 'RFC 7233',
      category: 'success',
      example: 'Used for resumable downloads and video streaming.'
    },
    {
      code: 207,
      title: 'Multi-Status',
      description: 'The message body that follows is an XML message and can contain a number of separate response codes.',
      spec: 'RFC 4918',
      category: 'success',
      example: 'WebDAV response containing multiple status codes.'
    },
    {
      code: 208,
      title: 'Already Reported',
      description: 'Used inside a DAV: propstat response element to avoid enumerating the internal members of multiple bindings to the same collection repeatedly.',
      spec: 'RFC 5842',
      category: 'success'
    },
    {
      code: 226,
      title: 'IM Used',
      description: 'The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',
      spec: 'RFC 3229',
      category: 'success'
    },

    // 3xx - Redirection
    {
      code: 300,
      title: 'Multiple Choices',
      description: 'The request has more than one possible response. The user agent should choose one of them.',
      spec: 'RFC 7231',
      category: 'redirection'
    },
    {
      code: 301,
      title: 'Moved Permanently',
      description: 'The URL of the requested resource has been changed permanently. The new URL is given in the response.',
      spec: 'RFC 7231',
      category: 'redirection',
      example: 'Used for permanent URL redirection.'
    },
    {
      code: 302,
      title: 'Found',
      description: 'The URI of requested resource has been changed temporarily. New changes in the URI might be made in the future.',
      spec: 'RFC 7231',
      category: 'redirection',
      example: 'Temporary redirection to another URL.'
    },
    {
      code: 303,
      title: 'See Other',
      description: 'The server sent this response to direct the client to get the requested resource at another URI with a GET request.',
      spec: 'RFC 7231',
      category: 'redirection',
      example: 'Used after a PUT or POST to redirect to the resulting resource.'
    },
    {
      code: 304,
      title: 'Not Modified',
      description: 'This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.',
      spec: 'RFC 7232',
      category: 'redirection',
      example: 'Browser can use its cached copy of a resource.'
    },
    {
      code: 305,
      title: 'Use Proxy',
      description: 'Defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy.',
      spec: 'RFC 7231',
      category: 'redirection'
    },
    {
      code: 307,
      title: 'Temporary Redirect',
      description: 'The server sends this response to direct the client to get the requested resource at another URI with the same method that was used in the prior request.',
      spec: 'RFC 7231',
      category: 'redirection',
      example: 'Similar to 302 but preserves the HTTP method used.'
    },
    {
      code: 308,
      title: 'Permanent Redirect',
      description: 'This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header.',
      spec: 'RFC 7538',
      category: 'redirection',
      example: 'Similar to 301 but preserves the HTTP method used.'
    },

    // 4xx - Client Error
    {
      code: 400,
      title: 'Bad Request',
      description: 'The server cannot or will not process the request due to something that is perceived to be a client error.',
      spec: 'RFC 7231',
      category: 'clientError',
      example: 'Malformed request syntax, invalid request message parameters.'
    },
    {
      code: 401,
      title: 'Unauthorized',
      description: 'Authentication is required and has failed or has not yet been provided.',
      spec: 'RFC 7235',
      category: 'clientError',
      example: 'Missing or invalid authentication token.'
    },
    {
      code: 402,
      title: 'Payment Required',
      description: 'Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme.',
      spec: 'RFC 7231',
      category: 'clientError'
    },
    {
      code: 403,
      title: 'Forbidden',
      description: 'The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource.',
      spec: 'RFC 7231',
      category: 'clientError',
      example: 'User is authenticated but doesn\'t have permission to access the resource.'
    },
    {
      code: 404,
      title: 'Not Found',
      description: 'The server can not find the requested resource. In the browser, this means the URL is not recognized.',
      spec: 'RFC 7231',
      category: 'clientError',
      example: 'The requested resource could not be found on the server.'
    },
    {
      code: 405,
      title: 'Method Not Allowed',
      description: 'The request method is known by the server but is not supported by the target resource.',
      spec: 'RFC 7231',
      category: 'clientError',
      example: 'Using POST on a read-only resource that only supports GET.'
    },
    {
      code: 406,
      title: 'Not Acceptable',
      description: 'The target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request.',
      spec: 'RFC 7231',
      category: 'clientError'
    },
    {
      code: 407,
      title: 'Proxy Authentication Required',
      description: 'Similar to 401 Unauthorized, but it indicates that the client needs to authenticate itself in order to use a proxy.',
      spec: 'RFC 7235',
      category: 'clientError'
    },
    {
      code: 408,
      title: 'Request Timeout',
      description: 'The server timed out waiting for the request.',
      spec: 'RFC 7231',
      category: 'clientError',
      example: 'The client did not produce a request within the time that the server was prepared to wait.'
    },
    {
      code: 409,
      title: 'Conflict',
      description: 'This response is sent when a request conflicts with the current state of the server.',
      spec: 'RFC 7231',
      category: 'clientError',
      example: 'Conflict in resource state, such as an edit conflict in a collaborative document.'
    },
    {
      code: 410,
      title: 'Gone',
      description: 'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.',
      spec: 'RFC 7231',
      category: 'clientError',
      example: 'Resource has been intentionally removed and will not be available again.'
    },
    {
      code: 411,
      title: 'Length Required',
      description: 'Server rejected the request because the Content-Length header field is not defined and the server requires it.',
      spec: 'RFC 7231',
      category: 'clientError'
    },
    {
      code: 412,
      title: 'Precondition Failed',
      description: 'The client has indicated preconditions in its headers which the server does not meet.',
      spec: 'RFC 7232',
      category: 'clientError',
      example: 'Used with conditional requests, like If-Match.'
    },
    {
      code: 413,
      title: 'Payload Too Large',
      description: 'Request entity is larger than limits defined by server.',
      spec: 'RFC 7231',
      category: 'clientError',
      example: 'File upload exceeds the server\'s size limit.'
    },
    {
      code: 414,
      title: 'URI Too Long',
      description: 'The URI requested by the client is longer than the server is willing to interpret.',
      spec: 'RFC 7231',
      category: 'clientError'
    },
    {
      code: 415,
      title: 'Unsupported Media Type',
      description: 'The media format of the requested data is not supported by the server, so the server is rejecting the request.',
      spec: 'RFC 7231',
      category: 'clientError',
      example: 'Server doesn\'t support the content type in the request, like application/xml when only application/json is supported.'
    },
    {
      code: 416,
      title: 'Range Not Satisfiable',
      description: 'The range specified by the Range header field in the request cannot be fulfilled.',
      spec: 'RFC 7233',
      category: 'clientError',
      example: 'Client asked for a portion of the file that lies beyond the end of the file.'
    },
    {
      code: 417,
      title: 'Expectation Failed',
      description: 'The expectation indicated by the Expect request header field cannot be met by the server.',
      spec: 'RFC 7231',
      category: 'clientError'
    },
    {
      code: 418,
      title: 'I\'m a teapot',
      description: 'The server refuses the attempt to brew coffee with a teapot.',
      spec: 'RFC 2324',
      category: 'clientError',
      example: 'An April Fools\' joke from 1998. Not a real error code for practical use.'
    },
    {
      code: 421,
      title: 'Misdirected Request',
      description: 'The request was directed at a server that is not able to produce a response.',
      spec: 'RFC 7540',
      category: 'clientError'
    },
    {
      code: 422,
      title: 'Unprocessable Entity',
      description: 'The request was well-formed but was unable to be followed due to semantic errors.',
      spec: 'RFC 4918',
      category: 'clientError',
      example: 'The request is syntactically correct but semantically incorrect, like validation errors.'
    },
    {
      code: 423,
      title: 'Locked',
      description: 'The resource that is being accessed is locked.',
      spec: 'RFC 4918',
      category: 'clientError'
    },
    {
      code: 424,
      title: 'Failed Dependency',
      description: 'The request failed due to failure of a previous request.',
      spec: 'RFC 4918',
      category: 'clientError'
    },
    {
      code: 425,
      title: 'Too Early',
      description: 'Indicates that the server is unwilling to risk processing a request that might be replayed.',
      spec: 'RFC 8470',
      category: 'clientError'
    },
    {
      code: 426,
      title: 'Upgrade Required',
      description: 'The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.',
      spec: 'RFC 7231',
      category: 'clientError',
      example: 'Server requires the client to upgrade to a newer protocol version.'
    },
    {
      code: 428,
      title: 'Precondition Required',
      description: 'The origin server requires the request to be conditional.',
      spec: 'RFC 6585',
      category: 'clientError',
      example: 'Used to prevent the "lost update" problem, where a client GETs a resource, modifies it, and PUTs it back without checking if it has been modified by someone else.'
    },
    {
      code: 429,
      title: 'Too Many Requests',
      description: 'The user has sent too many requests in a given amount of time ("rate limiting").',
      spec: 'RFC 6585',
      category: 'clientError',
      example: 'Rate limiting to prevent abuse or overload of an API.'
    },
    {
      code: 431,
      title: 'Request Header Fields Too Large',
      description: 'The server is unwilling to process the request because its header fields are too large.',
      spec: 'RFC 6585',
      category: 'clientError'
    },
    {
      code: 451,
      title: 'Unavailable For Legal Reasons',
      description: 'The user agent requested a resource that cannot legally be provided, such as a web page censored by a government.',
      spec: 'RFC 7725',
      category: 'clientError',
      example: 'Content blocked due to legal restrictions, like DMCA takedowns or government censorship.'
    },

    // 5xx - Server Error
    {
      code: 500,
      title: 'Internal Server Error',
      description: 'The server has encountered a situation it doesn\'t know how to handle.',
      spec: 'RFC 7231',
      category: 'serverError',
      example: 'Generic server error, often due to unhandled exceptions.'
    },
    {
      code: 501,
      title: 'Not Implemented',
      description: 'The request method is not supported by the server and cannot be handled.',
      spec: 'RFC 7231',
      category: 'serverError',
      example: 'Server does not recognize the request method and is incapable of supporting it for any resource.'
    },
    {
      code: 502,
      title: 'Bad Gateway',
      description: 'The server, while working as a gateway, got an invalid response from the upstream server.',
      spec: 'RFC 7231',
      category: 'serverError',
      example: 'Proxy or gateway server received an invalid response from an upstream server.'
    },
    {
      code: 503,
      title: 'Service Unavailable',
      description: 'The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.',
      spec: 'RFC 7231',
      category: 'serverError',
      example: 'Server is temporarily unavailable due to maintenance or overload.'
    },
    {
      code: 504,
      title: 'Gateway Timeout',
      description: 'The server, while acting as a gateway, did not get a response in time from the upstream server that it needed in order to complete the request.',
      spec: 'RFC 7231',
      category: 'serverError',
      example: 'Proxy or gateway server timed out waiting for a response from an upstream server.'
    },
    {
      code: 505,
      title: 'HTTP Version Not Supported',
      description: 'The HTTP version used in the request is not supported by the server.',
      spec: 'RFC 7231',
      category: 'serverError'
    },
    {
      code: 506,
      title: 'Variant Also Negotiates',
      description: 'The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.',
      spec: 'RFC 2295',
      category: 'serverError'
    },
    {
      code: 507,
      title: 'Insufficient Storage',
      description: 'The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.',
      spec: 'RFC 4918',
      category: 'serverError',
      example: 'WebDAV server has insufficient storage space.'
    },
    {
      code: 508,
      title: 'Loop Detected',
      description: 'The server detected an infinite loop while processing the request.',
      spec: 'RFC 5842',
      category: 'serverError'
    },
    {
      code: 510,
      title: 'Not Extended',
      description: 'Further extensions to the request are required for the server to fulfill it.',
      spec: 'RFC 2774',
      category: 'serverError'
    },
    {
      code: 511,
      title: 'Network Authentication Required',
      description: 'The client needs to authenticate to gain network access.',
      spec: 'RFC 6585',
      category: 'serverError',
      example: 'Used by captive portals like public WiFi login pages.'
    }
  ];

  const categories = [
    { id: 'informational', name: '1xx - Informational', color: 'bg-blue-500' },
    { id: 'success', name: '2xx - Success', color: 'bg-green-500' },
    { id: 'redirection', name: '3xx - Redirection', color: 'bg-yellow-500' },
    { id: 'clientError', name: '4xx - Client Error', color: 'bg-orange-500' },
    { id: 'serverError', name: '5xx - Server Error', color: 'bg-red-500' }
  ];

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'informational': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'redirection': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'clientError': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'serverError': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getBorderColor = (category: string): string => {
    switch (category) {
      case 'informational': return 'border-blue-200 dark:border-blue-800';
      case 'success': return 'border-green-200 dark:border-green-800';
      case 'redirection': return 'border-yellow-200 dark:border-yellow-800';
      case 'clientError': return 'border-orange-200 dark:border-orange-800';
      case 'serverError': return 'border-red-200 dark:border-red-800';
      default: return 'border-gray-200 dark:border-gray-700';
    }
  };

  const filteredCodes = statusCodes.filter(code => {
    const matchesSearch = searchTerm === '' || 
      code.code.toString().includes(searchTerm) || 
      code.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === null || code.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (code: number) => {
    navigator.clipboard.writeText(code.toString());
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
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
              HTTP Status Codes Reference
            </h1>

            <div className="mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by code, title, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === null
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredCodes.map((statusCode) => (
                <div
                  key={statusCode.code}
                  className={`border rounded-lg overflow-hidden ${getBorderColor(statusCode.category)}`}
                >
                  <div className={`px-6 py-4 flex justify-between items-center ${getCategoryColor(statusCode.category)}`}>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleCopy(statusCode.code)}
                        className="mr-3 p-1 hover:bg-white/20 rounded transition-colors"
                        title="Copy status code"
                      >
                        {copied === statusCode.code ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                      <h3 className="text-lg font-bold">
                        {statusCode.code} {statusCode.title}
                      </h3>
                    </div>
                    <div className="text-sm">
                      <a
                        href={`https://tools.ietf.org/html/${statusCode.spec.toLowerCase()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:underline"
                      >
                        {statusCode.spec}
                        <ExternalLink className="ml-1 w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-800">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {statusCode.description}
                    </p>
                    {statusCode.example && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Example Use Case:
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded">
                          {statusCode.example}
                        </p>
                      </div>
                    )}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Code Snippet:
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded font-mono text-sm overflow-x-auto">
                        {statusCode.category === 'informational' && (
                          <code className="text-blue-600 dark:text-blue-400">
                            // Node.js example<br />
                            res.writeHead({statusCode.code}, &#123; 'Content-Type': 'text/plain' &#125;);<br />
                            res.end('Processing request...');
                          </code>
                        )}
                        {statusCode.category === 'success' && (
                          <code className="text-green-600 dark:text-green-400">
                            // Node.js example<br />
                            res.status({statusCode.code}).json(&#123; success: true, data: result &#125;);
                          </code>
                        )}
                        {statusCode.category === 'redirection' && (
                          <code className="text-yellow-600 dark:text-yellow-400">
                            // Node.js example<br />
                            res.redirect({statusCode.code}, 'https://example.com/new-location');
                          </code>
                        )}
                        {statusCode.category === 'clientError' && (
                          <code className="text-orange-600 dark:text-orange-400">
                            // Node.js example<br />
                            res.status({statusCode.code}).json(&#123; error: '{statusCode.title}', message: '{statusCode.description}' &#125;);
                          </code>
                        )}
                        {statusCode.category === 'serverError' && (
                          <code className="text-red-600 dark:text-red-400">
                            // Node.js example<br />
                            res.status({statusCode.code}).json(&#123; error: '{statusCode.title}', message: 'An unexpected error occurred' &#125;);
                          </code>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCodes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No status codes found matching your search criteria.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}