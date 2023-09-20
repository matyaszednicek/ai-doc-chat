import { deleteUserById, getUserById, getUserByUsername, getUsers } from '../db/users';
import { Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { openaiApiKey } = req.body;

    const user = await getUserById(id);
    if (!user) return res.status(400).json({ error: "User doesn't exist!" });

    if (openaiApiKey) user.openaiApiKey = openaiApiKey;
    await user.save();

    return res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export const getUserKey = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);
    if (!user) return res.status(400).json({ error: "User doesn't exist!" });

    return res.status(200).json({ key: user.openaiApiKey });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
