import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownViewer = ({ markdownContent }) => {
  return (
    <div className="markdown-container">
      <ReactMarkdown children={markdownContent} remarkPlugins={[remarkGfm]} />
    </div>
  );
};

export default MarkdownViewer;
