'use client';

import { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import React, { useEffect, useRef } from 'react';

const ACCENT = '#FFB300';

export default function AiCompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const chat = useChat();
  console.log('useChat exports:', Object.keys(chat));
  
  const { messages, append, status, isLoading } = chat as any;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];
    
    let targetPath = null;
    
    // Check top-level toolInvocations
    if (lastMessage.role === 'assistant' && lastMessage.toolInvocations) {
      const navTool = lastMessage.toolInvocations.find((t: any) => t.toolName === 'navigateToPage');
      if (navTool && navTool.args?.path) targetPath = navTool.args.path;
    }
    
    // Check parts for tool-invocation or custom OpenRouter format
    if (!targetPath && lastMessage.role === 'assistant' && (lastMessage as any).parts && Array.isArray((lastMessage as any).parts)) {
      const toolPart = (lastMessage as any).parts.find((p: any) => p.type === 'tool-invocation' || p.type === 'tool-navigateToPage');
      if (toolPart) {
        if (toolPart.toolInvocation?.args?.path) targetPath = toolPart.toolInvocation.args.path;
        else if (toolPart.input?.path) targetPath = toolPart.input.path;
        else if (toolPart.args?.path) targetPath = toolPart.args.path;
      }
    }
    
    // Normalize path just in case the AI hallucinates missing leading slashes (e.g. "certifications" instead of "/certifications")
    if (targetPath && !targetPath.startsWith('/')) {
      targetPath = '/' + targetPath;
    }
    
    // Strict validation to prevent 404 errors if the AI hallucinates a non-existent route
    const validPaths = ['/', '/about', '/cv', '/education', '/experience', '/projects', '/certifications'];
    
    if (targetPath && validPaths.includes(targetPath)) {
      // If the user wants to see a section that is on the main canvas, scroll them there instead of locking them in a standalone page
      let finalRoute = targetPath;
      if (['/experience', '/education', '/projects'].includes(targetPath)) {
        const sectionId = targetPath.substring(1);
        // If we are already on the main page, Next.js router.push might not smoothly scroll to a hash. We do it manually.
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
          const targetElement = document.getElementById(sectionId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            return; // Stop here, no need to push a new route
          }
        }
        finalRoute = `/#${sectionId}`;
      }
      router.push(finalRoute);
    } else if (targetPath) {
      console.warn("AI tried to navigate to an invalid path:", targetPath);
    }
  }, [messages, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (append) {
      append({ role: 'user', content: input });
    } else if (chat.sendMessage) {
      (chat as any).sendMessage({ text: input });
    }
    setInput('');
  };

  const chatAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0px) scale(1)' : 'translateY(20px) scale(0.95)',
    config: config.stiff,
  });

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-50 transition-all duration-500 hover:scale-110 ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
        style={{ backgroundColor: ACCENT }}
      >
        <MessageSquare className="w-6 h-6 text-black" />
      </button>

      {/* Chat Window */}
      <animated.div
        style={{
          ...chatAnimation,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10">
              <Bot className="w-4 h-4" style={{ color: ACCENT }} />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white tracking-widest uppercase">COMPANION</h3>
              <p className="font-mono text-xs text-neutral-400">Ask me anything</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-neutral-400 hover:text-white transition-colors p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {/* Welcome Header (Always Visible at the top of the chat history) */}
          <div className="flex flex-col items-center text-center space-y-6 pt-2 pb-8 border-b border-white/5 mb-2">
            <Bot className="w-10 h-10 mb-2 opacity-50" style={{ color: ACCENT }} />
            <div className="space-y-2">
              <p className="font-mono text-xs tracking-widest text-neutral-300 uppercase">
                Welcome! I am COMPANION.
              </p>
              <p className="text-xs text-neutral-400">
                I'm an AI trained on Ozan's entire portfolio. I can answer questions about his background, or physically pilot your browser to the pages you want to explore!
              </p>
            </div>
            
            <div className="flex flex-col gap-2 w-full pt-4">
              <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase mb-1">Try asking me:</p>
              {[
                "What is your teaching philosophy?",
                "Tell me about your tech projects",
                "Take me to the certifications page",
                "How can I contact Ozan?"
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => append ? append({ role: 'user', content: suggestion }) : (chat as any).sendMessage({ text: suggestion })}
                  className="text-xs text-left px-4 py-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-neutral-300 hover:text-white"
                >
                  "{suggestion}"
                </button>
              ))}
            </div>
          </div>

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[85%] flex items-end gap-2">
                {m.role !== 'user' && (
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mb-1">
                    <Bot className="w-3 h-3" style={{ color: ACCENT }} />
                  </div>
                )}
                <div
                  className={`px-4 py-3 text-sm font-sans leading-relaxed shadow-md ${
                    m.role === 'user'
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-neutral-200 border border-white/10'
                  }`}
                  style={{
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    borderBottomLeftRadius: m.role === 'user' ? '12px' : '0px',
                    borderBottomRightRadius: m.role === 'user' ? '0px' : '12px',
                  }}
                >
                  {(() => {
                    console.log('Rendering message in bubble:', m);
                    let content = m.content || (m as any).text || "";
                    if (!content && (m as any).parts && Array.isArray((m as any).parts)) {
                      // Try extracting text
                      content = (m as any).parts.filter((p: any) => p.type === 'text').map((p: any) => p.text || "").join("");
                      
                      // Try extracting tool invocations from parts if no text
                      if (!content) {
                        const toolPart = (m as any).parts.find((p: any) => p.type === 'tool-invocation' || p.type === 'tool-navigateToPage');
                        if (toolPart) {
                          if (toolPart.toolInvocation?.args?.message) content = toolPart.toolInvocation.args.message;
                          else if (toolPart.input?.message) content = toolPart.input.message;
                          else if (toolPart.args?.message) content = toolPart.args.message;

                          // Check if it's an invalid hallucinated path
                          let path = toolPart.toolInvocation?.args?.path || toolPart.input?.path || toolPart.args?.path;
                          if (path && !path.startsWith('/')) path = '/' + path; // Normalize
                          const validPaths = ['/', '/about', '/cv', '/education', '/experience', '/projects', '/certifications'];
                          if (path && !validPaths.includes(path)) {
                            content = `I'm sorry, I cannot take you there. The page "${path}" does not exist on this website!`;
                          }
                        }
                      }
                    }
                    
                    // Fallback to top-level toolInvocations array
                    let navTool = null;
                    if (!content && m.toolInvocations && m.toolInvocations.length > 0) {
                      navTool = m.toolInvocations.find((t: any) => t.toolName === 'navigateToPage');
                      if (navTool && navTool.args?.message) {
                        content = navTool.args.message;
                        
                        let path = navTool.args?.path;
                        if (path && !path.startsWith('/')) path = '/' + path; // Normalize
                        const validPaths = ['/', '/about', '/cv', '/education', '/experience', '/projects', '/certifications'];
                        if (path && !validPaths.includes(path)) {
                          content = `I'm sorry, I cannot take you there. The page "${path}" does not exist on this website!`;
                        }
                      }
                    }

                    if (!content) {
                       // We can clear this debug now, but let's just leave a clean fallback
                       content = "Navigating...";
                    }
                    return (
                      <div className="[&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_strong]:text-current [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:ml-5 [&_ul]:ml-5 [&_li]:mt-1 [&_a]:text-[#FFB300] [&_a]:underline hover:[&_a]:text-yellow-400">
                        <ReactMarkdown
                          components={{
                            a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />
                          }}
                        >
                          {content}
                        </ReactMarkdown>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-tr-xl rounded-tl-xl rounded-br-xl">
                <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-black/50">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input || ''}
              onChange={handleInputChange}
              placeholder="Ask a question..."
              className="w-full bg-white/5 border border-white/10 text-white font-sans text-sm px-4 py-3 rounded-full focus:outline-none focus:border-white/30 transition-colors pr-12"
            />
            <button
              type="submit"
              disabled={isLoading || !(input || '').trim()}
              className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" style={{ color: ACCENT }} />
            </button>
          </form>
        </div>
      </animated.div>
    </>
  );
}
