import { http } from "@/api/fetch";

// 예시 더미 파일입니다.
// 실제 API 엔드포인트와 데이터 구조에 맞게 수정해야 합니다.
export interface ChatResponse {
  chat_duration: string;
  id: string;
  is_archived: boolean;
  is_finished: boolean;
  session_id: string;
  started_date: string;
}

export const getChats = async (params: {
  datetime_gte: string;
  datetime_lte: string;
  dominant_emotions: string;
  matching_content: string;
}): Promise<{ chats: ChatResponse[] }> => {
  const { response } = await http.get<{ chats: ChatResponse[] }>(
    `/chats`,
    params
  );
  return response;
};
