import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Wrench, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  type: 'bot' | 'user' | 'error';
}

const WEBHOOK_URL = (import.meta as any).env?.VITE_SRAM_CHAT_WEBHOOK_URL || "https://hook.us2.make.com/lflcgsd8lgv6ig8ejxma4al66ilvxy1b";

export default function SramSupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: 'Hola. Bienvenido al portal de Soporte Técnico Especializado para transmisiones de carretera SRAM.\n\n¿En qué puedo ayudarte hoy respecto a tus componentes Rival, Force y Red?',
      type: 'bot'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom whenever messages list or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isOpen]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const query = inputMessage.trim();
    if (!query) return;

    // Add user message
    const userMsgId = Math.random().toString(36).substring(7);
    setMessages(prev => [...prev, { id: userMsgId, text: query, type: 'user' }]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: query })
      });

      if (!response.ok) {
        throw new Error("Respuesta de red defectuosa, código: " + response.status);
      }

      const assistantText = await response.text();
      setIsTyping(false);
      
      const botMsgId = Math.random().toString(36).substring(7);
      setMessages(prev => [...prev, { id: botMsgId, text: assistantText, type: 'bot' }]);
    } catch (error: any) {
      setIsTyping(false);
      const errorMsgId = Math.random().toString(36).substring(7);
      setMessages(prev => [
        ...prev, 
        { 
          id: errorMsgId, 
          text: `No es posible establecer comunicación con el módulo de soporte de SRAM. Asegúrese de que el flujo de Make esté activo y configurado con la URL correcta. (${error.message})`, 
          type: 'error' 
        }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            className="w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)] bg-white rounded-[24px] border border-gray-200 shadow-2xl flex flex-col overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-[#0F0F10] text-white p-5 flex items-center gap-3.5 border-b-3 border-[#E60012]">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1C] border border-[#E60012] flex items-center justify-center text-[#E60012]">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-[14px] font-bold tracking-wider uppercase text-white font-sans">
                  SOPORTE TÉCNICO SRAM
                </h1>
                <div className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  Rival · Force · Red AXS
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-5 bg-[#F4F4F6] flex flex-col gap-3 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`max-w-[82%] px-4.5 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words shadow-sm font-sans ${
                    msg.type === 'bot'
                      ? 'self-start bg-white text-gray-900 rounded-[20px] rounded-bl-[6px] border border-gray-100'
                      : msg.type === 'user'
                      ? 'self-end bg-[#0F0F10] text-white rounded-[20px] rounded-br-[6px]'
                      : 'self-center bg-[#FEF2F2] text-[#E60012] border border-[#FEE2E2] rounded-[20px] text-[13px] text-center max-w-[90%] px-4 py-2.5'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start flex gap-1.5 px-5 py-3.5 bg-white rounded-[20px] rounded-bl-[6px] shadow-sm items-center border border-gray-100"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E60012] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-[#E60012] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#E60012] animate-bounce" />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex gap-2.5 bg-white items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu pregunta sobre SRAM..."
                autoComplete="off"
                required
                className="flex-1 bg-[#F4F4F6] border border-gray-200 text-gray-900 rounded-full px-5 py-2.5 text-sm outline-none transition-all focus:border-[#E60012] focus:bg-white font-sans"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-[#E60012] text-white flex items-center justify-center shrink-0 hover:bg-[#C1000F] active:scale-95 transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                aria-label="Enviar consulta"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-[60px] h-[60px] rounded-full bg-[#0F0F10] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all border-none cursor-pointer relative"
        aria-label="Abrir soporte técnico"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="chat-icon"
              initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="close-icon"
              initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
