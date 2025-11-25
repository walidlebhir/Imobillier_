import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiX, FiMinimize, FiMessageCircle } from 'react-icons/fi';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simuler une réponse de l'IA après un délai
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: "Je suis une démonstration d'interface chat. Dans une application réelle, je fournirais une réponse pertinente à votre message.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <FiMessageCircle size={24} />
        </button>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleChat}
          className="bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-blue-900 transition-colors flex items-center"
        >
          <FiMessageCircle size={24} className="mr-2" />
          <span>Assistant</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 from-blue-900 to-blue-900 text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white/20 p-1 rounded-full mr-2">
            <FiMessageCircle size={16} />
          </div>
          <span className="font-semibold">Assistant IA</span>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={minimizeChat}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Minimiser"
          >
            <FiMinimize size={16} />
          </button>
          <button
            onClick={toggleChat}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Fermer"
          >
            <FiX size={16} />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-80 overflow-y-auto p-3 bg-gray-50">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-3">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || inputText.trim() === ''}
            className={`p-2 rounded-lg ${
              isLoading || inputText.trim() === ''
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            } transition-colors`}
          >
            <FiSend size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

// Hook personnalisé pour utiliser le chat dans n'importe quel composant
export const useChatBot = () => {
  return { ChatBot };
};

export default ChatBot;