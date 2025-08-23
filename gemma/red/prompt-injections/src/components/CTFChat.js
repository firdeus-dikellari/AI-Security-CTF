import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, RotateCcw, Flag } from 'lucide-react';
import axios from 'axios';

const CTFChat = ({ challengeId, challengeTitle, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentFlag, setCurrentFlag] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    checkConnection();
  }, []);

  // Function to extract EUHUB flags from text
  const extractFlag = (text) => {
    const flagRegex = /EUHUB\{[^}]+\}/g;
    const matches = text.match(flagRegex);
    return matches ? matches[0] : '';
  };

  const checkConnection = async () => {
    try {
      await axios.get('/api/health');
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/ctf/chat', {
        message: input,
        challenge_id: challengeId
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Debug logging
      console.log("=== FRONTEND DEBUG ===");
      console.log("Response data:", response.data);
      console.log("flag_found from backend:", response.data.flag_found);
      
      // Check for flags in the response (both from backend flag_found and extracted from text)
      let flag = response.data.flag_found;
      if (!flag) {
        flag = extractFlag(response.data.response);
        console.log("flag extracted from text:", flag);
      }
      if (flag) {
        console.log("✅ Setting flag:", flag);
        setCurrentFlag(flag);
      } else {
        console.log("❌ No flag to display");
      }
      console.log("=== END DEBUG ===");
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentFlag(''); // Clear flag when chat is cleared
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Bot className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">CTF Chat</h2>
              <p className="text-sm text-gray-500">{challengeTitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-2 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <button
              onClick={clearChat}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Clear chat"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Flag Display Section */}
        {currentFlag && (
          <div className="bg-green-50 border-b border-green-200 p-3">
            <div className="flex items-center space-x-3">
              <Flag className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="text-sm font-semibold text-green-800">Flag Found!</h4>
                <p className="text-green-700 font-mono text-xs">{currentFlag}</p>
              </div>
            </div>
          </div>
        )}

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">CTF Challenge Chat</h3>
              <p className="text-gray-600 mb-6">Start interacting with the AI to solve the challenge!</p>
              {!isConnected && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-yellow-800 text-sm">
                    Make sure the backend is running and connected to the AI model.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    message.role === 'user' ? 'user-message' : 'assistant-message'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {message.role === 'user' ? (
                        <User className="h-6 w-6 text-white" />
                      ) : (
                        <Bot className="h-6 w-6 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">
                        {message.content}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="chat-message assistant-message">
                  <div className="flex items-start space-x-3">
                    <Bot className="h-6 w-6 text-gray-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot" style={{ animationDelay: '0.1s' }}></div>
                        <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="1"
                disabled={isLoading || !isConnected}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading || !isConnected}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTFChat; 