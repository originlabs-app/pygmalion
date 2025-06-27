import React from 'react';

interface TextContentProps {
  content: string;
}

const TextContent: React.FC<TextContentProps> = ({ content }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
      <div className="prose prose-blue max-w-none">
        {/* Structured text formatting for better readability */}
        <div className="text-content">
          <div
            className="prose prose-headings:font-semibold prose-headings:mb-4 
              prose-h1:text-2xl prose-h1:mt-6 prose-h1:mb-4 prose-h1:font-bold prose-h1:text-primary
              prose-h2:text-xl prose-h2:mt-5 prose-h2:mb-3 
              prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
              prose-p:my-3 prose-p:leading-relaxed
              prose-ul:list-disc prose-ul:ml-6 prose-ul:my-3
              prose-ol:list-decimal prose-ol:ml-6 prose-ol:my-3
              prose-li:my-1 prose-li:pl-1
              prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
              prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4
              prose-strong:font-semibold prose-em:italic"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

export default TextContent;
