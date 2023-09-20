import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import ChatNavBar from './components/ChatNavBar';
import Chat from './components/Chat';
import { Document } from '@/typings';
import { useChatStore } from '@/store/ChatStore';

const getDoc = async (id: string) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.APP_URL}/api/v1/documents/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.sessionToken}`,
    },
  });

  if (res.ok) {
    const { doc } = await res.json();

    return doc;
  }

  return [];
};

async function ChatPage({ params }: { params: { id: string } }) {
  const doc: Document = await getDoc(params.id);

  return (
    <>
      <ChatNavBar name={doc.name} />
      <Chat doc={doc} />
    </>
  );
}

export default ChatPage;
