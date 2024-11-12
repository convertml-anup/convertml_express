import { Request, Response } from 'express';

export const exampleController = (req: Request, res: Response): void => {
  res.status(200).json({ message: 'This is an example response' });
};
