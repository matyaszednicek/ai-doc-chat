import UploadForm from './UploadForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import DocumentCard from './DocumentCard';
import { Document } from '@/typings';

const getDocs = async () => {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.APP_URL}/api/v1/documents`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.sessionToken}`,
    },
  });

  if (res.ok) {
    const { docs } = await res.json();

    return docs;
  }

  return [];
};

async function Hero() {
  const docs: Document[] = await getDocs();

  return (
    <div className="grid grid-cols-1 gap-5 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {docs && docs.map((doc) => <DocumentCard key={doc._id} doc={doc} />)}
      {docs.length < 6 && <UploadForm />}
    </div>
  );
}

export default Hero;
