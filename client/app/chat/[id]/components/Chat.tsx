'use client';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import './chat.css';
import { Document, Message as IMessage } from '@/typings';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { useChatStore } from '@/store/ChatStore';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useEffect } from 'react';

const getResponse = async (question: string, user: Session, documentName: string, documentId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/documents/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.user?.sessionToken}`,
    },
    body: JSON.stringify({ message: question, document: documentName, id: documentId }),
  });

  if (res.ok) {
    const { response } = await res.json();

    return response;
  } else {
    const { error } = await res.json();
  }
};

function Chat({ doc }: { doc: Document }) {
  const { data: user, status } = useSession();
  const { messages, addMessage, setMessages, loading, setLoading } = useChatStore();

  useEffect(() => {
    setMessages(doc.messages);
  }, []);

  const handleSendMessage = async (innerHtml: string, textContent: string) => {
    setLoading(true);
    addMessage(textContent, 'question');

    const response = await getResponse(textContent, user!, doc.name, doc._id);

    addMessage(response, 'answer');
    setLoading(false);
  };

  return (
    <div style={{ position: 'relative', height: '90vh', width: '100%', maxWidth: '1024px', marginTop: '14px' }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages &&
              messages.map((message, index) =>
                message.type === 'question' ? (
                  <HumanMessage key={index} message={message} />
                ) : (
                  <ResponseMessage key={index} message={message} />
                )
              )}
            {loading && <TypingIndicator content="AI is typing" />}
          </MessageList>
          <MessageInput
            disabled={loading}
            attachButton={false}
            placeholder="Type question here"
            onSend={handleSendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

const HumanMessage = (message: IMessage) => {
  return (
    <Message
      model={{
        message: message.message.message,
        sender: 'You',
        direction: 'outgoing',
        position: 'normal',
      }}
    />
  );
};
const ResponseMessage = (message: IMessage) => {
  return (
    <Message
      model={{
        message: message.message.message,
        sender: 'Document',
        direction: 'incoming',
        position: 'normal',
      }}
    />
  );
};

export default Chat;
