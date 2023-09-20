import { supabase as client } from '../../supabase/config';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

export const generateEmbeddings = async (url: string, name: string, key: string, email: string) => {
  try {
    const blobRes = await fetch(url);
    const blob = await blobRes.blob();

    const loader = new PDFLoader(blob);

    const docs = await loader.parse(Buffer.from(await blob.arrayBuffer()), { email, name });

    const vectorStore = await SupabaseVectorStore.fromExistingIndex(new OpenAIEmbeddings({ openAIApiKey: key }), {
      client,
      tableName: 'documents',
      queryName: 'match_documents',
    });

    await vectorStore.addDocuments(docs);

    return '';
  } catch (error: any) {
    return error.message;
  }
};
