import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (file) {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const session = await getServerSession(authOptions);

    const { data, error } = await supabase.storage
      .from('documents')
      .upload(`${session?.user?.username}-${file?.name}`, file);

    if (error) {
      return NextResponse.json({ error: error.message });
    } else {
      const { data: urlData } = await supabase.storage.from('documents').getPublicUrl(data.path);
      const { publicUrl } = urlData;

      const res = await fetch(`${process.env.APP_URL}/api/v1/documents/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.sessionToken}`,
        },
        body: JSON.stringify({ url: publicUrl, name: file?.name }),
      });

      if (res.ok) {
        return NextResponse.json({});
      } else {
        const { error } = await res.json();
        return NextResponse.json({ error });
      }
    }
  }
}
