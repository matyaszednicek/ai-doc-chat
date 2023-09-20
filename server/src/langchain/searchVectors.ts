import { supabase as client } from '../../supabase/config';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import path from 'path';
import { readFile } from 'fs/promises';

const PROMPT_TEMPLATES_PATH = '/src/langchain/promptTemplates';

export const searchVectors = async (message: string, document: string, key: string, email: string) => {
  const chat = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: key,
  });

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(new OpenAIEmbeddings({ openAIApiKey: key }), {
    client,
    tableName: 'documents',
    queryName: 'match_documents',
  });

  const systemPromptPath = path.join(process.cwd(), PROMPT_TEMPLATES_PATH, '/system.txt');
  const systemPrompt = await readFile(systemPromptPath, 'utf-8');
  const humanPromptPath = path.join(process.cwd(), PROMPT_TEMPLATES_PATH, '/human.txt');
  const humanPrompt = await readFile(humanPromptPath, 'utf-8');

  const prompt = PromptTemplate.fromTemplate(`${systemPrompt}\n${humanPrompt}`);

  let chain = ConversationalRetrievalQAChain.fromLLM(chat, vectorStore.asRetriever(), {
    metadata: { email, document },
    qaChainOptions: {
      type: 'stuff',
      prompt,
    },
    returnSourceDocuments: true,
  });

  try {
    const res = await chain.call({ question: message, chat_history: [] });

    return res;
  } catch (error: any) {
    return { error: error.message };
  }
};
