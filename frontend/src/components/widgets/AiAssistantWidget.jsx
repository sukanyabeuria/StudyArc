import React, { useState, useRef, useEffect } from 'react';
import { askGeminiAssistant } from '../../api/client';
import { Bot, Send, User, Loader2 } from 'lucide-react';

export default function AiAssistantWidget() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi! I'm your study assistant powered by Gemini. Ask me anything!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const promptChips = [
    'Explain concept',
    'Summarize notes',
    'Study tips'
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
          text: `⚠️ ${err.message || 'Gemini error'}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b0c0f] border border-zinc-850 rounded-2xl p-3.5 shadow-xl flex flex-col justify-between h-full overflow-hidden text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-orange-500/15 text-orange-400 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white leading-none flex items-center gap-1">
              <span>AI Study Assistant</span>
              <span className="px-1 py-0.2 rounded text-[9px] bg-orange-500/20 text-orange-300 font-semibold">
                Gemini
              </span>
            </h3>
            <span className="text-[10px] text-zinc-500 font-medium">Instant explanations</span>
          </div>
        </div>

        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Ready" />
      </div>

      {/* Messages Scroll Area with custom-scrollbar */}
      <div className="custom-scrollbar flex-1 overflow-y-auto space-y-2 pr-1 text-xs mb-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold ${
                msg.role === 'user' ? 'bg-zinc-800 text-zinc-200' : 'bg-orange-500 text-white shadow-sm'
              }`}
            >
              {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
            </div>

            <div
              className={`p-2.5 rounded-xl max-w-[88%] whitespace-pre-wrap leading-relaxed text-[11px] ${
                msg.role === 'user'
                  ? 'bg-orange-500 text-white rounded-tr-none'
                  : 'bg-zinc-950 border border-zinc-850 text-zinc-200 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-1.5 text-[11px] text-orange-400 pl-7">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Gemini is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="flex items-center gap-1 mb-1.5 overflow-x-auto pb-0.5">
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setInput(`${chip}: `)}
            className="px-2 py-0.5 rounded-md bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-[10px] text-zinc-400 hover:text-orange-400 shrink-0 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-1.5 pt-1 border-t border-zinc-850">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-[11px] text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-orange-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg shadow-sm shadow-orange-500/30 active:scale-95 transition-all shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
