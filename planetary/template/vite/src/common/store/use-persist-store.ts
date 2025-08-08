import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ChatStore {
  messages: string[];
  addMessage: (message: string) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message: string) => {
        set((state) => ({ messages: [...state.messages, message] }));
      },
      
      clearMessages: () => {
        set({ messages: [] });
      },
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
