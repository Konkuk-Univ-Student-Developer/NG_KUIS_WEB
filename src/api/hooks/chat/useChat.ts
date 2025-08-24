import { http } from "@/api/fetch";
import type { ChatResponse } from "@/types/chat";
import { useState } from "react";
import type { Message } from "@/types/chat";

export const getChatbotResponse = async (
  question: string
): Promise<ChatResponse> => {
  const { response } = await http.get<ChatResponse>(`/ai/chat`, { question });
  return response;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (question: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: question,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { answer } = await getChatbotResponse(question);

      const botMessage: Message = {
        id: Date.now() + 1,
        text: answer,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to fetch bot's response:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "답변을 가져오는 중 오류가 발생했어요.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
};
