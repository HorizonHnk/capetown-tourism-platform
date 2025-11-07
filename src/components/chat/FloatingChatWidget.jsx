import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Sparkles, MapPin, Calendar, DollarSign, RotateCcw, Play, Pause, Square, Volume2 } from 'lucide-react';
import { generateChatResponse } from '../../services/geminiAI';

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your Cape Town AI assistant. How can I help you plan your trip today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const quickActions = [
    { icon: MapPin, label: 'Best attractions', prompt: 'What are the must-see attractions in Cape Town?' },
    { icon: Calendar, label: 'Best time to visit', prompt: 'When is the best time to visit Cape Town?' },
    { icon: DollarSign, label: 'Budget tips', prompt: 'What are some budget-friendly activities in Cape Town?' },
  ];

  const handleSend = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateChatResponse(messageText);
      const assistantMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt) => {
    handleSend(prompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const clearConversation = () => {
    stopSpeaking();
    setMessages([
      {
        role: 'assistant',
        content: 'Hi! I\'m your Cape Town AI assistant. How can I help you plan your trip today?'
      }
    ]);
  };

  const speakMessage = (text, messageIndex) => {
    // Stop any ongoing speech
    stopSpeaking();

    // Remove markdown and HTML formatting for speech
    const cleanText = text
      .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
      .replace(/\n/g, ' ') // Replace line breaks with spaces
      .replace(/•/g, '') // Remove bullet points
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setSpeakingMessageIndex(messageIndex);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingMessageIndex(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingMessageIndex(null);
    };

    speechSynthesisRef.current.speak(utterance);
  };

  const pauseSpeaking = () => {
    if (speechSynthesisRef.current.speaking && !speechSynthesisRef.current.paused) {
      speechSynthesisRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeaking = () => {
    if (speechSynthesisRef.current.paused) {
      speechSynthesisRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setSpeakingMessageIndex(null);
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className="fixed bottom-6 right-6 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all hover:scale-110 z-50 group"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask AI Assistant
          </span>
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 transition-all ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
          } max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-900 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Travel Assistant</h3>
                <p className="text-xs text-gray-300">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearConversation}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={toggleMinimize}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={toggleOpen}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="flex flex-col h-[calc(100%-4rem)]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex flex-col gap-2 ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                      <div
                        className={`rounded-lg px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div
                          className="text-sm whitespace-pre-line leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: message.content
                              .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                              .replace(/\n/g, '<br/>')
                              .replace(/•/g, '<span class="inline-block w-4">•</span>')
                          }}
                        />
                      </div>
                      {/* Text-to-Speech Controls for Assistant Messages */}
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-1 px-2">
                          {speakingMessageIndex === index && isSpeaking && !isPaused ? (
                            <>
                              <button
                                onClick={pauseSpeaking}
                                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                                aria-label="Pause"
                                title="Pause"
                              >
                                <Pause className="h-3.5 w-3.5 text-gray-600" />
                              </button>
                              <button
                                onClick={stopSpeaking}
                                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                                aria-label="Stop"
                                title="Stop"
                              >
                                <Square className="h-3.5 w-3.5 text-gray-600" />
                              </button>
                              <Volume2 className="h-3 w-3 text-green-500 animate-pulse ml-1" />
                            </>
                          ) : speakingMessageIndex === index && isPaused ? (
                            <>
                              <button
                                onClick={resumeSpeaking}
                                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                                aria-label="Resume"
                                title="Resume"
                              >
                                <Play className="h-3.5 w-3.5 text-gray-600" />
                              </button>
                              <button
                                onClick={stopSpeaking}
                                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                                aria-label="Stop"
                                title="Stop"
                              >
                                <Square className="h-3.5 w-3.5 text-gray-600" />
                              </button>
                              <span className="text-xs text-gray-500 ml-1">Paused</span>
                            </>
                          ) : (
                            <button
                              onClick={() => speakMessage(message.content, index)}
                              className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                              aria-label="Play audio"
                              title="Listen"
                            >
                              <Play className="h-3.5 w-3.5 text-gray-600" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 border-t border-gray-100">
                  <p className="text-xs text-gray-600 font-medium mb-2 mt-2">Quick actions or type below:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.prompt)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors"
                      >
                        <action.icon className="h-3 w-3" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your question here..."
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-sm shadow-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Powered by Google Gemini AI
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChatWidget;
