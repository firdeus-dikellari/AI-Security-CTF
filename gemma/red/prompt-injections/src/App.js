import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RotateCcw, Flag } from 'lucide-react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [availablePrompts, setAvailablePrompts] = useState({});
  const [currentFlag, setCurrentFlag] = useState('');
  const [foundFlags, setFoundFlags] = useState(new Set());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if backend is running
    checkConnection();
    // Load available system prompts
    loadSystemPrompts();
  }, []);

  // Function to extract flags from text
  const extractFlag = (text) => {
    // Check for EUHUB flags first
    const euhubRegex = /EUHUB\{[^}]+\}/g;
    let matches = text.match(euhubRegex);
    if (matches) return matches[0];
    
    // Check for EUHUB variations (missing E)
    const euhubVariationRegex = /EUHUB\{[^}]+\}/g;
    matches = text.match(euhubVariationRegex);
    if (matches) return `EUHUB${matches[0].substring(4)}`; // Add the missing E
    
    // Check for HTB flags
    const htbRegex = /HTB\{[^}]+\}/g;
    matches = text.match(htbRegex);
    if (matches) return matches[0];
    
    // Check for WAGON flag
    if (text.includes("WAGON")) {
      return "WAGON";
    }
    
    return '';
  };

  const checkConnection = async () => {
    try {
      await axios.get('/api/health');
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const loadSystemPrompts = async () => {
    try {
      const response = await axios.get('/api/system-prompts');
      setAvailablePrompts(response.data);
    } catch (error) {
      console.error('Error loading system prompts:', error);
      // Set empty object to prevent errors when backend is not available
      setAvailablePrompts({});
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
      let response;
      
      // If a CTF challenge is selected, use the CTF chat endpoint
      if (systemPrompt && availablePrompts[systemPrompt]) {
        console.log("Using CTF chat endpoint for challenge:", systemPrompt);
        response = await axios.post('/api/ctf/chat', {
          message: input,
          challenge_id: systemPrompt
        });
      } else {
        // Use regular chat endpoint for general chat
        console.log("Using regular chat endpoint");
        response = await axios.post('/api/chat', {
          message: input,
          system_prompt: systemPrompt ? availablePrompts[systemPrompt].system_prompt : undefined
        });
      }

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
        // Add to found flags set to prevent duplicates
        setFoundFlags(prev => new Set([...prev, flag]));
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
    setFoundFlags(new Set()); // Clear all found flags
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Bot className="h-8 w-8 text-primary-600" />
              <h1 className="text-xl font-semibold text-gray-900">EuropeHUB CTF</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              <select
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={Object.keys(availablePrompts || {}).length === 0}
              >
                <option value="">
                  {Object.keys(availablePrompts || {}).length === 0 
                    ? "No challenges available" 
                    : "Select a CTF Challenge"}
                </option>
                {Object.entries(availablePrompts || {}).map(([key, challenge]) => (
                  <option key={key} value={key}>
                    {challenge.display_label || challenge.title || `${challenge.category || 'Challenge'} ${key.split('_').pop() || '1'}`}
                  </option>
                ))}
              </select>
              
              {/* Debug Info */}
              {systemPrompt && (
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Challenge: {systemPrompt}
                  {currentFlag && <span className="ml-2 text-green-600">✓ Flag: {currentFlag}</span>}
                </div>
              )}
              <button
                onClick={clearChat}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Clear chat"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Flag Display Section */}
      <div className={`border-b ${foundFlags.size > 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {foundFlags.size > 0 ? (
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <Flag className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">🎉 Flags Found! 🎉</h3>
              </div>
              <div className="space-y-2">
                {Array.from(foundFlags).map((flag, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-green-700 font-mono text-lg font-bold">{flag}</span>
                  </div>
                ))}
              </div>
              <p className="text-green-600 text-sm mt-2">Congratulations! You've successfully completed these challenges!</p>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Flag className="h-6 w-6 text-gray-400" />
              <div>
                <h3 className="text-lg font-semibold text-gray-600">Flag</h3>
                <p className="text-gray-500 text-sm">Complete challenges to see flags here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="chat-container">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              {systemPrompt && availablePrompts[systemPrompt] ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Welcome to {availablePrompts[systemPrompt].display_label || availablePrompts[systemPrompt].title}
                  </h2>
                  <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                    {availablePrompts[systemPrompt].description || "No description available for this challenge."}
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto mb-6">
                    <p className="text-blue-800 text-sm">
                      <strong>Objective:</strong> {availablePrompts[systemPrompt].description || "Complete the challenge objectives."}
                    </p>
                    <p className="text-blue-700 text-sm mt-2">
                      <strong>Difficulty:</strong> {availablePrompts[systemPrompt].difficulty || "Unknown"} | 
                      <strong> Points:</strong> {availablePrompts[systemPrompt].points || "0"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to EuropeHUB CTF</h2>
                  <p className="text-gray-600 mb-6">Select a challenge from the dropdown above to begin testing AI security</p>
                </>
              )}
              {!isConnected && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-yellow-800 text-sm">
                    Make sure the backend is running and connected to the AI model.
                  </p>
                  <p className="text-yellow-700 text-sm mt-2">
                    Backend should be running on http://localhost:8080
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
      </div>

      {/* Input Container */}
      <div className="input-container">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows="1"
                disabled={isLoading || !isConnected}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading || !isConnected}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 