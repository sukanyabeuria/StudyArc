import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { askGeminiAssistant } from '../../api/client';
import { Bot, Send, User, Loader2, Maximize2, Minimize2, Sparkles } from 'lucide-react';

export default function AiAssistantWidget() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi! I'm your StudyArc assistant powered by Google Gemini. Ask me any homework questions, concept explanations, or study strategies!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const messagesEndRef = useRef(null);
  const modalMessagesEndRef = useRef(null);

  const promptChips = [
    'Explain this concept',
    'Summarize notes',
    'Give study tips',
    'Solve this problem',
    'Create practice quiz'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    modalMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);

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
    <>
      {/* Standard Compact Grid Card */}
      <div className="bg-gradient-to-b from-[#0c0e15] to-[#08090d] border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-4 shadow-2xl flex flex-col justify-between h-full overflow-hidden text-zinc-100 relative">
        {/* Subtle Inner Highlight */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shadow-sm shadow-orange-500/10">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white font-syne leading-none flex items-center gap-1.5">
                <span>StudyArc AI</span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 font-bold border border-orange-500/30 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-orange-400" />
                  Gemini
                </span>
              </h3>
              <span className="text-[10px] text-zinc-400 font-medium">Instant study explanations</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Gemini 3.6 Active" />
            <button
              onClick={() => setIsFullScreen(true)}
              className="p-1 rounded-lg text-zinc-400 hover:text-orange-400 hover:bg-zinc-850/80 transition-colors"
              title="Open Bigger Window (Full Screen)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Compact Messages Scroll Area */}
        <div className="custom-scrollbar flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs mb-2 min-h-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                  msg.role === 'user' ? 'bg-zinc-800 text-zinc-200 border border-zinc-700' : 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-sm'
                }`}
              >
                {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`p-3 rounded-2xl max-w-[88%] whitespace-pre-wrap leading-relaxed text-[11px] ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white font-medium rounded-tr-none shadow-md shadow-orange-500/25'
                    : 'bg-zinc-950/80 border border-zinc-800/80 text-zinc-200 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-[11px] text-orange-400 pl-8">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Gemini is generating response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Prompt Chips */}
        <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-0.5">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInput(`${chip}: `)}
              className="px-2.5 py-1 rounded-full bg-zinc-950/90 hover:bg-zinc-900 border border-zinc-800/80 text-[10px] text-zinc-400 hover:text-orange-300 hover:border-orange-500/40 shrink-0 transition-all cursor-pointer font-medium"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-1.5 pt-1.5 border-t border-zinc-850/80">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask StudyArc AI any homework or coding question..."
            className="flex-1 bg-zinc-950 border border-zinc-800/80 rounded-xl px-3 py-1.5 text-[11px] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-40 text-white rounded-xl shadow-md shadow-orange-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Bigger Fullscreen Window (Portaled to document.body to avoid parent container bounds) */}
      {isFullScreen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFullScreen(false);
          }}
        >
          <div className="w-full max-w-4xl h-[88vh] bg-[#0c0e15] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between text-zinc-100 relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-syne flex items-center gap-2.5">
                    <span>StudyArc AI Assistant</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 font-bold border border-orange-500/30 flex items-center gap-1 font-sans">
                      <Sparkles className="w-3 h-3 text-orange-400" />
                      Gemini 3.6 Flash
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">
                    Instant AI homework solving, concept explanations, and study guides
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Gemini Online</span>
                </div>

                {/* Exit Fullscreen */}
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-700/80 rounded-xl text-xs font-semibold text-zinc-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                  title="Close Fullscreen (Esc)"
                >
                  <Minimize2 className="w-4 h-4 text-orange-400" />
                  <span>Exit Fullscreen</span>
                </button>
              </div>
            </div>

            {/* Modal Messages Feed */}
            <div className="custom-scrollbar flex-1 overflow-y-auto space-y-4 pr-3 py-4 text-sm my-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-9 h-9 rounded-2xl shrink-0 flex items-center justify-center text-xs font-bold ${
                      msg.role === 'user'
                        ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                        : 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/20'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
                  </div>

                  <div
                    className={`p-4 rounded-3xl max-w-[80%] whitespace-pre-wrap leading-relaxed text-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white font-medium rounded-tr-none shadow-lg shadow-orange-500/20'
                        : 'bg-zinc-950/90 border border-zinc-800/90 text-zinc-200 rounded-tl-none shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2.5 text-xs text-orange-400 pl-12 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gemini is generating detailed answer...</span>
                </div>
              )}

              <div ref={modalMessagesEndRef} />
            </div>

            {/* Suggestion Prompt Chips */}
            <div className="flex items-center gap-2 pt-2 pb-3 overflow-x-auto">
              {promptChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInput(`${chip}: `)}
                  className="px-3.5 py-1.5 rounded-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-orange-300 hover:border-orange-500/40 shrink-0 transition-all cursor-pointer font-medium"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2.5 pt-3 border-t border-zinc-800/80">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask StudyArc AI any question, paste code, or request an explanation..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-40 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all shrink-0 cursor-pointer flex items-center gap-2"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
