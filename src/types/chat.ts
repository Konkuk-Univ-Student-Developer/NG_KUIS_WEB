export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export interface ChatResponse {
  answer: string;
}
