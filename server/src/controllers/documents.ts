import { Request, Response } from 'express';
import { generateEmbeddings } from '../langchain/generateEmbeddings';
import { searchVectors } from '../langchain/searchVectors';
import { createDoc, getDocById, getDocsByEmail } from '../db/documents';

declare namespace Express {
  export interface IRequest extends Request {
    identity?: any;
  }
}

export const uploadFile = async (req: Express.IRequest, res: Response) => {
  try {
    const { url, name } = req.body;

    const error = await generateEmbeddings(url, name, req.identity.openaiApiKey, req.identity.email);

    if (!error) {
      const doc = await createDoc({
        name,
        email: req.identity.email,
        messages: [],
      });

      return res.status(200).json(doc);
    }

    throw new Error(error);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const query = async (req: Express.IRequest, res: Response) => {
  try {
    const { message, document, id } = req.body;

    const doc = await getDocById(id);
    doc?.messages?.push({ message, type: 'question' });

    const data = await searchVectors(message, document, req.identity.openaiApiKey, req.identity.email);

    if (data.text) {
      doc?.messages?.push({ message: data.text, type: 'answer' });
      doc?.save();

      return res.status(200).json({ response: data.text });
    }
    doc?.save();

    throw new Error('Something went wrong!');
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getUserDocuments = async (req: Express.IRequest, res: Response) => {
  try {
    const docs = await getDocsByEmail(req.identity.email);

    if (docs) return res.status(200).json({ docs });

    throw new Error('Something went wrong!');
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getUserDocument = async (req: Express.IRequest, res: Response) => {
  try {
    const { id } = req.params;

    const doc = await getDocById(id);

    if (doc) return res.status(200).json({ doc });

    throw new Error('Something went wrong!');
  } catch (error) {
    return res.status(400).json({ error });
  }
};
