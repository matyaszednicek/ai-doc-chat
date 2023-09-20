import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  messages: { type: Array, required: false, select: true },
});

export const DocumentModel = mongoose.model('Document', DocumentSchema);

export const getDocs = () => DocumentModel.find();
export const getDocsByEmail = (email: string) => DocumentModel.find({ email });

export const getDocByEmail = (email: string) => DocumentModel.findOne({ email });
export const getDocByName = (username: string) => DocumentModel.findOne({ username });
export const getDocById = (id: string) => DocumentModel.findById(id);

export const createDoc = (values: Record<string, any>) => new DocumentModel(values).save().then();
export const deleteDocById = (id: string) => DocumentModel.findOneAndDelete({ _id: id });
export const updateDocById = (id: string, values: Record<string, any>) => DocumentModel.findByIdAndUpdate(id, values);
