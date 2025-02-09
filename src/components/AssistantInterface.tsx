import React, { useState } from 'react';
import { Brain, X, RefreshCw } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { MedicineScanner } from './MedicineScanner';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  language?: string;
}

interface AssistantInterfaceProps {
  messages: Message[];
  inputText: string;
  isListening: boolean;
  isSpeaking: boolean;
  selectedLanguage: string;
  placeholder?: string;
  onClose: () => void;
  onLanguageChange: (code: string) => void;
  onInputChange: (text: string) => void;
  onSend: () => void;
  onToggleListening: () => void;
  onToggleSpeaking: () => void;
  onFindHospitals: () => void;
  onRefreshTip: () => void;
  onAnalyzeMedicine: (imageData: string) => void;
}

export const AssistantInterface: React.FC<AssistantInterfaceProps> = ({
  messages,
  inputText,
  isListening,
  isSpeaking,
  selectedLanguage,
  placeholder = "Type a message...",
  onClose,
  onLanguageChange,
  onInputChange,
  onSend,
  onToggleListening,
  onToggleSpeaking,
  onFindHospitals,
  onRefreshTip,
  onAnalyzeMedicine,
}) => {
  const [showScanner, setShowScanner] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleScan = async (imageData: string) => {
    setIsAnalyzing(true);
    await onAnalyzeMedicine(imageData);
    setIsAnalyzing(false);
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-md p-4 flex items-center justify-between border-b border-white/10 shadow-md">
        <div className="flex items-center space-x-3">
          <Brain className="h-7 w-7 text-blue-400 animate-pulse" />
          <span className="font-bold text-lg sm:text-xl">Dhanvantari </span>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={onRefreshTip} className="p-2 hover:bg-white/10 rounded-full transition-all">
            <RefreshCw className="h-6 w-6" />
          </button>
          <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} />
          <button onClick={onClose} className="p-2 hover:bg-red-500 rounded-full transition-all">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32 sm:pb-24 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((message, index) => (
          <ChatMessage key={index} type={message.type} content={message.content} />
        ))}
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md p-4 border-t border-white/10 shadow-md">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            inputText={inputText}
            isListening={isListening}
            isSpeaking={isSpeaking}
            placeholder={placeholder}
            onInputChange={onInputChange}
            onSend={onSend}
            onToggleListening={onToggleListening}
            onToggleSpeaking={onToggleSpeaking}
            onFindHospitals={onFindHospitals}
            onOpenScanner={() => setShowScanner(true)}
          />
        </div>
      </div>

      {/* Medicine Scanner Modal */}
      {showScanner && (
        <MedicineScanner onScan={handleScan} onClose={() => setShowScanner(false)} isAnalyzing={isAnalyzing} />
      )}
    </div>
  );
};
