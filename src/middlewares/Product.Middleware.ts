import { Request, Response, NextFunction } from 'express';

const condition = (
  a: string, b: string, c: string, d: string
  ) => a && b && c && d;

const validCreateProd = async (req: Request, res: Response, next: NextFunction) => {
  const { name, manufacturer, category, code } = req.body;
  if (!condition(name, manufacturer, category, code)) {
    return res.status(400).json({ error: 'Faltam informações' }); 
  }
  next();
};

export default {
  validCreateProd,
}
