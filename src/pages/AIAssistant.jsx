import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, MessageCircle, Lightbulb, Trash2, Volume2, Pause, Square } from 'lucide-react';
import { generateChatResponse } from '../services/geminiAI';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm your **Cape Town** AI travel assistant.\n\nI can help you with:\n\n• **Attractions** & activities\n• **Itineraries** & planning\n• **Budget** tips & costs\n• **Beaches**, wine tours & more\n\nWhat would you like to explore?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const messagesEndRef = useRef(null);
  const speechSynthesisRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Clear chat function
  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! 👋 I'm your **Cape Town** AI travel assistant.\n\nI can help you with:\n\n• **Attractions** & activities\n• **Itineraries** & planning\n• **Budget** tips & costs\n• **Beaches**, wine tours & more\n\nWhat would you like to explore?"
      }
    ]);
    // Stop any ongoing speech
    if (isSpeaking) {
      handleStopSpeaking();
    }
  };

  // Text-to-speech functions
  const handlePlaySpeech = (text) => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Remove HTML tags and formatting for better speech
    const cleanText = text
      .replace(/<[^>]*>/g, '')
      .replace(/\*\*/g, '')
      .replace(/•/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePauseSpeech = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleResumeSpeech = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleStopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const suggestedQuestions = [
    "Top 5 must-see attractions?",
    "Best beaches in Cape Town?",
    "When to visit Cape Town?",
    "Budget-friendly activities?",
    "Best wine regions?",
    "3-day itinerary ideas?"
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    const newMessages = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Get AI response (simplified call like the widget)
      const response = await generateChatResponse(userMessage);

      // Add AI response
      setMessages([...newMessages, { role: 'assistant', content: response }]);
    } catch (error) {
      // Better error handling with specific messages
      let errorMessage = 'Sorry, I encountered an error. Please try again later.';

      if (error.message?.includes('429') || error.message?.includes('Resource exhausted')) {
        errorMessage = '⚠️ **Rate limit reached**\n\nI\'m receiving too many requests. Please wait a minute and try again.\n\n**Tip**: Use the floating chat widget (bottom-right corner) for quick questions!';
      } else if (error.message?.includes('API key')) {
        errorMessage = '⚠️ **API Configuration Issue**\n\nPlease check your Gemini API key in the .env file.';
      }

      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: errorMessage
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-full mr-4">
                <Sparkles className="h-8 w-8 text-gray-700" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Travel Assistant</h1>
                <p className="text-gray-600">Powered by Google Gemini AI</p>
              </div>
            </div>
            {messages.length > 1 && (
              <button
                onClick={handleClearChat}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                title="Clear conversation"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Clear Chat</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4" style={{ height: 'calc(100vh - 400px)', minHeight: '400px' }}>
          <div className="h-full overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-900 border border-gray-200'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Sparkles className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="text-xs font-semibold text-gray-600">AI Assistant</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {!isSpeaking && (
                          <button
                            onClick={() => handlePlaySpeech(message.content)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Play audio"
                          >
                            <Volume2 className="h-4 w-4 text-gray-600" />
                          </button>
                        )}
                        {isSpeaking && !isPaused && (
                          <button
                            onClick={handlePauseSpeech}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Pause audio"
                          >
                            <Pause className="h-4 w-4 text-gray-600" />
                          </button>
                        )}
                        {isSpeaking && isPaused && (
                          <button
                            onClick={handleResumeSpeech}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Resume audio"
                          >
                            <Volume2 className="h-4 w-4 text-gray-600" />
                          </button>
                        )}
                        {isSpeaking && (
                          <button
                            onClick={handleStopSpeaking}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Stop audio"
                          >
                            <Square className="h-4 w-4 text-gray-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  <div
                    className="whitespace-pre-line leading-relaxed text-base"
                    dangerouslySetInnerHTML={{
                      __html: message.content
                        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
                        .replace(/\n/g, '<br/>')
                        .replace(/•/g, '<span class="inline-block w-4 text-gray-700">•</span>')
                    }}
                  />
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-3 bg-gray-100 border border-gray-200">
                  <div className="flex items-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin text-gray-600" />
                    <span className="text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-4">
            <div className="flex items-center mb-4">
              <Lightbulb className="h-5 w-5 mr-2 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Suggested Questions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-left px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-colors text-sm text-gray-700"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Cape Town..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              rows="2"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Send className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">Send</span>
                </>
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-4">
          <div className="flex items-start">
            <MessageCircle className="h-5 w-5 mr-2 text-gray-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-2">💡 Quick Tips:</p>
              <ul className="space-y-1.5">
                <li>• Ask <strong>short, specific questions</strong> for best results</li>
                <li>• Responses are optimized to be <strong>brief and scannable</strong></li>
                <li>• Use the <strong>voice button</strong> to listen to responses</li>
                <li>• Try the suggested questions above to get started</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
