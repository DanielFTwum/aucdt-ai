import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Image as ImageIcon, Loader2, Minimize2, Maximize2, Bot } from 'lucide-react';
import { ChatMessage } from '../types';
import { streamResponse } from '../lib/gemini';

interface AIChatAgentProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const AIChatAgent: React.FC<AIChatAgentProps> = ({ isOpen, onClose, onOpen }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'Akwaaba! I am Nkyinkyim, your AUCDT assistant. How can I help you navigate your creative journey today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Create placeholder for AI response
    const aiMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiMessageId, role: 'model', text: '' }]);

    try {
      await streamResponse(
        userMessage.text,
        history,
        userMessage.image || null,
        (chunkText) => {
          setMessages(prev => prev.map(msg => 
            msg.id === aiMessageId ? { ...msg, text: chunkText } : msg
          ));
        }
      );
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, text: "I'm having trouble connecting right now. Please try again." } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-sans flex flex-col items-end pointer-events-none">
      {/* 
        Pointer events are disabled on the container so it doesn't block clicks underneath,
        but enabled on the children (chat window and toggle button).
      */}
      
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`pointer-events-auto bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 border border-gray-200 overflow-hidden mb-4 ${
            isExpanded 
              ? 'w-[90vw] h-[80vh] md:w-[600px] md:h-[700px]' 
              : 'w-[calc(100vw-3rem)] sm:w-[350px] h-[500px]'
          } animate-scale-up origin-bottom-right`}
        >
          {/* Header */}
          <div className="bg-aucdt-maroon p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-1.5 rounded-full">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Nkyinkyim AI</h3>
                <span className="flex items-center text-aucdt-gold text-[10px] uppercase font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors"
                title={isExpanded ? "Minimize" : "Maximize"}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors"
                title="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm text-sm ${
                    msg.role === 'user' 
                      ? 'bg-aucdt-maroon text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.image && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-white/20">
                      <img src={msg.image} alt="User upload" className="max-w-full h-auto max-h-48 object-cover" />
                    </div>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1].role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <Loader2 size={20} className="animate-spin text-aucdt-maroon" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            {selectedImage && (
              <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg mb-2 text-xs border border-gray-200">
                <div className="flex items-center text-gray-600">
                  <ImageIcon size={14} className="mr-2" />
                  <span className="truncate max-w-[200px]">Image attached</span>
                </div>
                <button onClick={() => setSelectedImage(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-end space-x-2">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 text-gray-400 hover:text-aucdt-maroon hover:bg-gray-50 rounded-xl transition-colors"
                title="Upload Image"
              >
                <ImageIcon size={20} />
              </button>
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Ask a question..."
                  className="w-full bg-gray-100 border-none rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-aucdt-maroon/20 focus:bg-white transition-all resize-none max-h-24 min-h-[44px] text-sm"
                  rows={1}
                />
              </div>
              <button 
                type="submit"
                disabled={(!input.trim() && !selectedImage) || isLoading}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  (!input.trim() && !selectedImage) || isLoading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-aucdt-maroon text-white hover:bg-aucdt-gold hover:text-aucdt-maroon shadow-md transform hover:scale-105 active:scale-95'
                }`}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button (Floating Action Button) - Visible when chat is closed */}
      {!isOpen && (
        <button 
          onClick={onOpen}
          className="pointer-events-auto bg-aucdt-maroon text-white p-4 rounded-full shadow-xl hover:bg-aucdt-gold hover:text-aucdt-maroon transition-all duration-300 hover:scale-110 group relative border-4 border-white"
          aria-label="Open AI Chat Assistant"
        >
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-10"></span>
          <MessageCircle size={28} />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none transform translate-x-2 group-hover:translate-x-0">
            Chat with Nkyinkyim
          </span>
        </button>
      )}
    </div>
  );
};

export default AIChatAgent;