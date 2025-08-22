import React, { useState, useRef, useEffect } from "react";
import SendIcon from "@/assets/icon/ic_send.svg?react";
import { useChat } from "@/api/hooks/chat/useChat";
import FormattedText from "@/components/chat/FormattedText";

const ChatPage: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();

    if (!trimmedInput || isLoading) {
      return;
    }

    sendMessage(trimmedInput);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50 font-sans">
      <header className="p-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-bold text-center text-emerald-900">
          AI Chatbot
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 flex flex-col justify-end">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-2xl rounded-xl px-4 py-2 whitespace-pre-wrap shadow-sm ${
                  message.sender === "user"
                    ? "bg-emerald-800 text-white"
                    : "bg-white text-black border"
                }`}
              >
                {message.sender === "bot" ? (
                  <FormattedText text={message.text} />
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs rounded-lg px-4 py-2 bg-white text-black border shadow-sm">
                <span className="animate-pulse">생각 중이에요...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="p-4 bg-white border-t">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 max-w-4xl mx-auto"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="질문을 입력하세요!"
            disabled={isLoading}
            className="flex-1 w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600 transition"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-3 bg-emerald-800 text-white rounded-full hover:bg-emerald-900 disabled:bg-gray-400 transition-colors flex-shrink-0"
            aria-label="Send message"
          >
            <SendIcon className="w-6 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPage;
