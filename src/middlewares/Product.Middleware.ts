import { Request, Response, NextFunction } from 'express';

const condition = (
  a: string, b: string, c: string, d: string, e: string
  ) => a && b && c && d && e;

const validCreateProd = async (req: Request, res: Response, next: NextFunction) => {
  const { name, manufacturer, unitSelling, category, code } = req.body;
  if (!condition(name, manufacturer, unitSelling, category, code)) {
    return res.status(400).json({ error: 'Faltam informações' }); 
  }
  next();
};

export default {
  validCreateProd,
}
