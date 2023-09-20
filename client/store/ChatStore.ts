import { Document, Message, MessageType } from '@/typings';
import { create } from 'zustand';

interface ChatSlice {
  doc?: Document;
  setDoc: (doc: Document) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  messages: Message[];
  addMessage: (message: string, type: MessageType) => void;
  setMessages: (messages: Message[]) => void;
}

export const useChatStore = create<ChatSlice>((set, get) => ({
  doc: undefined,
  setDoc: (doc) => set((state) => ({ doc })),
  loading: false,
  setLoading: (loading) => set((state) => ({ loading })),
  messages: [],
  addMessage: (message: string, type: MessageType) => {
    const updatedMessages = get().messages;
    updatedMessages.push({ message, type });

    set((state) => ({ messages: updatedMessages }));
  },
  setMessages: (messages: Message[]) => set((state) => ({ messages })),
}));
