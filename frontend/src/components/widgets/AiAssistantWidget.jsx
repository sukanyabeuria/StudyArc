import React, { useState, useRef, useEffect } from 'react';
import { askGeminiAssistant } from '../../api/client';
import { Bot, Send, Sparkles, User, ExternalLink, Loader2 } from 'lucide-react';

export default function AiAssistantWidget() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi! I'm your study assistant powered by Gemini. Ask me anything about your subjects or homework!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const promptChips = [
    'Explain this concept',
    'Summarize notes',
    'Give study tips',
    'Solve this problem'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (questionText) => {
    const textToSend = (questionText || input).trim();
    if (!textToSend || loading) return;

    const userMessage = {
      id: String(Date.now()),
      role: 'user',
      text: textToSend
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await askGeminiAssistant(textToSend);
      if (res.success && res.data) {
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            role: 'assistant',
            text: res.data.answer
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: 'assistant',
          text: `⚠️ ${err.message || 'Failed to connect to Gemini AI. Make sure backend is running and GEMINI_API_KEY is configured in .env!'}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (chip) => {
    setInput(`${chip}: `);
  };

  return (
    <div className="bg-focus-900/90 border border-zinc-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between h-full backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-orange-400" />
          <h3 className="text-base font-bold text-white flex items-center gap-1.5">
            <span>AI Study Assistant</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 font-semibold border border-orange-500/30">
              Gemini
            </span>
          </h3>
        </div>

        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="AI Ready" />
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[220px] min-h-[160px] text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                msg.role === 'user'
                  ? 'bg-zinc-700 text-white'
                  : 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-sm shadow-orange-500/30'
              }`}
            >
              {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            {/* Bubble */}
            <div
              className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-orange-500 text-white rounded-tr-none'
                  : 'bg-focus-850 border border-zinc-800 text-zinc-200 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-orange-400 pl-8">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Gemini is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Suggestion Chips (Matching Mockup) */}
      <div className="flex flex-wrap gap-1.5 my-2 pt-2 border-t border-zinc-800/80">
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleChipClick(chip)}
            className="px-2 py-0.5 rounded-lg bg-focus-850 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-zinc-300 hover:text-orange-400 hover:border-orange-500/30 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Message Input (Matching Mockup) */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 bg-focus-850 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl shadow-sm shadow-orange-500/30 transition-all active:scale-95 flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
