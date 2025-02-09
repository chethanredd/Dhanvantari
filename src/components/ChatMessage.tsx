import React from 'react';

interface ChatMessageProps {
  type: 'user' | 'assistant';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => {
  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-4 rounded-2xl text-sm sm:text-base ${
          type === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-white/10 backdrop-blur-sm text-black'
        }`}
      >
        {content}
      </div>
    </div>
  );
};
