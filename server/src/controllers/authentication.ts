import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers/index';
import { Request, Response } from 'express';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, username, openaiApiKey } = req.body;

    if (!email || !password || !username)
      return res.status(400).json({ error: 'Email, Username and Password must be specified!' });

    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'User with this email already exists!' });

    const salt = random();
    const user = await createUser({
      email,
      username,
      openaiApiKey,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email and Password must be specified!' });

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user || !user.authentication?.salt) return res.status(400).json({ error: "User doesn't exist!" });

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) return res.status(403).json({ error: 'Wrong password!' });

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('SESSION-TOKEN', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

    return res.status(200).json({
      uid: user._id,
      username: user.username,
      email: user.email,
      openaiApiKey: user.openaiApiKey,
      sessionToken: user.authentication.sessionToken,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
