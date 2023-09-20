import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { Document } from '@/typings';
import Link from 'next/link';

function DocumentCard({ doc }: { doc: Document }) {
  return (
    <div key={doc._id} className="grid w-full h-[148px] lg:h-[320px] max-w-xs grid-col-1">
      <Link
        href={`/chat/${doc._id}`}
        className="flex flex-col items-center justify-center w-full py-10 px-8 bg-[#D3D3D3] border-2 rounded-md text-gray-950 custom-shadow"
      >
        <ChatBubbleBottomCenterTextIcon className="w-10" />
        <p className="truncate w-60 whitespace-nowrap lg:whitespace-normal">{doc.name}</p>
      </Link>
    </div>
  );
}

export default DocumentCard;
