"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { MessageSquare, X, Send, Trash2, Download } from "lucide-react";
import { generateLocalResponse } from "@/utils/localChatEngine";
import portfolioData from "@/data/portfolio-data.json";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  { label: "About Janaka", query: "Tell me about yourself" },
  { label: "Projects", query: "Show your projects" },
  { label: "Skills", query: "What technologies do you know?" },
  { label: "Resume", query: "Download CV" },
  { label: "Contact Info", query: "How can I contact you?" }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const messagesRef = useRef<Message[]>([]);
  const sessionIdRef = useRef<string>("");
  const lastLoggedMessageCountRef = useRef<number>(0);

  // Keep messagesRef updated with latest messages
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Initialize unique session ID on mount
  useEffect(() => {
    sessionIdRef.current = Math.random().toString(36).substring(7);
  }, []);

  // Send conversation logs via api endpoint
  const sendLog = () => {
    const currentMsgs = messagesRef.current;
    const currentSessionId = sessionIdRef.current;
    const userMsgsCount = currentMsgs.filter((m) => m.role === "user").length;

    if (userMsgsCount > 0 && userMsgsCount > lastLoggedMessageCountRef.current) {
      lastLoggedMessageCountRef.current = userMsgsCount;

      fetch("/api/chat/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentMsgs,
          sessionId: currentSessionId,
        }),
        keepalive: true,
      }).catch((err) => console.warn("Failed to send chat log:", err));
    }
  };

  // Log when chat window is closed
  useEffect(() => {
    if (!isOpen) {
      sendLog();
    }
  }, [isOpen]);

  // Log on page unload (tab close / refresh)
  useEffect(() => {
    const handleUnload = () => {
      sendLog();
    };
    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, []);

  const handleClearChat = () => {
    sendLog();
    setMessages([]);
    sessionIdRef.current = Math.random().toString(36).substring(7);
    lastLoggedMessageCountRef.current = 0;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (window.innerWidth > 768) {
        inputRef.current?.focus();
      }
    }
  }, [messages, isOpen]);

  // Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: textToSend
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const assistantMessageId = Math.random().toString(36).substring(7);
    const assistantPlaceholder: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: ""
    };

    setMessages((prev) => [...prev, assistantPlaceholder]);

    if (useFallback) {
      simulateLocalResponse(textToSend, assistantMessageId);
      return;
    }

    try {
      const chatHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) {
        throw new Error("No reader found");
      }

      let accumulatedContent = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: accumulatedContent }
              : msg
          )
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.warn("API error, switching to local search engine.", error);
      setUseFallback(true);
      simulateLocalResponse(textToSend, assistantMessageId);
    }
  };

  const simulateLocalResponse = (query: string, messageId: string) => {
    const fullText = generateLocalResponse(query);
    let currentText = "";
    const words = fullText.split(" ");
    let i = 0;

    const timer = setInterval(() => {
      if (i < words.length) {
        currentText += (i === 0 ? "" : " ") + words[i];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, content: currentText } : msg
          )
        );
        i++;
      } else {
        clearInterval(timer);
        setIsLoading(false);
      }
    }, 25);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg hover:bg-violet-500 transition cursor-pointer border border-violet-500/20"
          aria-label="Toggle chat assistant"
        >
          {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
        </motion.button>
      </div>

      {/* Simple Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 bottom-20 right-6 w-[340px] xs:w-[360px] h-[480px] max-h-[calc(100vh-7rem)] flex flex-col bg-zinc-950 border border-zinc-800 shadow-2xl rounded-2xl overflow-hidden text-zinc-200"
          >
            {/* Minimalist Header */}
            <div className="p-3.5 border-b border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-white tracking-wide">Janaka's Assistant</span>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    title="Clear Chat"
                    className="p-1.5 text-zinc-500 hover:text-zinc-300 rounded transition cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="p-1.5 text-zinc-500 hover:text-zinc-300 rounded transition cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {messages.length === 0 ? (
                /* Welcome Message & Suggestion Chips */
                <div className="space-y-4">
                  <div className="text-xs text-zinc-400 space-y-3 bg-zinc-900/30 border border-zinc-800/60 p-4 rounded-xl">
                    <p className="font-semibold text-white text-[13px]">Janaka's AI Portfolio Assistant</p>
                    <p>I can help answer questions using Janaka's portfolio details. Ask me about:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Projects and tech stack</li>
                      <li>Technical skills</li>
                      <li>Education & experience</li>
                      <li>Resume download link</li>
                      <li>Contact details</li>
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[10px] text-zinc-500 font-medium px-1">Suggested questions:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q.label}
                          onClick={() => handleSend(q.query)}
                          className="text-[10px] bg-zinc-900 border border-zinc-800 hover:border-violet-500/40 text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium"
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Chat Thread */
                messages.map((message) => {
                  const isUser = message.role === "user";
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`rounded-xl px-3 py-2 text-xs max-w-[85%] break-words ${
                          isUser
                            ? "bg-violet-600 text-white rounded-tr-none"
                            : "bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-none"
                        }`}
                      >
                        {message.content === "" && isLoading ? (
                          /* Typing Indicator */
                          <div className="flex items-center gap-1 py-1">
                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce delay-100" />
                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce delay-200" />
                            <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce delay-300" />
                          </div>
                        ) : (
                          /* Markdown rendering */
                          <div className="prose prose-invert max-w-none text-xs space-y-1 select-text">
                            <ReactMarkdown
                              components={{
                                a: ({ href, children }) => {
                                  const isResume =
                                    href === portfolioData.contact.resume ||
                                    href === "/resume.pdf" ||
                                    (typeof children === "string" &&
                                      children.toLowerCase().includes("resume"));
                                  if (isResume) {
                                    return (
                                      <a
                                        href={href}
                                        download
                                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-[11px] transition"
                                      >
                                        <Download size={11} />
                                        {children}
                                      </a>
                                    );
                                  }
                                  return (
                                    <a
                                      href={href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-violet-400 hover:underline inline-flex items-center gap-0.5"
                                    >
                                      {children}
                                    </a>
                                  );
                                },
                                p: ({ children }) => (
                                  <p className="leading-relaxed last:mb-0">{children}</p>
                                ),
                                ul: ({ children }) => (
                                  <ul className="list-disc pl-4 space-y-0.5">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="list-decimal pl-4 space-y-0.5">{children}</ol>
                                ),
                                li: ({ children }) => <li className="text-[11px]">{children}</li>,
                                code: ({ children }) => (
                                  <code className="bg-zinc-950 border border-zinc-800 px-1 py-0.5 rounded text-[10px] text-violet-300 font-mono">
                                    {children}
                                  </code>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="text-[11px] font-semibold text-white border-b border-zinc-800 pb-0.5 mb-1 mt-1.5">
                                    {children}
                                  </h3>
                                ),
                                h4: ({ children }) => (
                                  <h4 className="text-[10px] font-semibold text-zinc-300 mt-1">
                                    {children}
                                  </h4>
                                )
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Simple Input Form */}
            <div className="p-3 border-t border-zinc-800/80 bg-zinc-900/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 focus-within:border-zinc-700 transition"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-xs text-zinc-200 border-none outline-none focus:ring-0 px-2.5 py-1.5 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-7 h-7 rounded-lg bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center transition disabled:opacity-30 disabled:hover:bg-violet-600 cursor-pointer"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
