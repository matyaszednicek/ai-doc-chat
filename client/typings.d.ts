export interface Document {
  _id: string;
  name: string;
  email: string;
  messages: Message[];
  __v: number;
}

export type MessageType = 'question' | 'answer';

export interface Message {
  type: MessageType;
  message: string;
}
