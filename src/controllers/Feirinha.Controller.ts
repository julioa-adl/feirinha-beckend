import { Request, Response } from 'express';
import { IFeirinha } from '../interfaces/IFeirinha';
import FeirinhaService from '../services/Feirinha.Service';

export default class FeirinhaController {
  public service: FeirinhaService;

  constructor() {
    this.service = new FeirinhaService();
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getByUserId = this.getByUserId.bind(this);
    this.default = this.default.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  public async default(req: Request, res: Response) {
    return res.status(200).json({ message: 'servidor no ar' });
  }

  public async create(req: Request, res: Response) {
    try {
      const feirinha: IFeirinha = req.body;
      const { type, message } = await this.service.create(feirinha);
      if (type) {
        return res.status(type).json({ message });
      }
      return res.status(201).json({ message });
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao registrar feirinha',
        error: String(err),
      });
    }
  }

  public async getByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const { type, message } = await this.service.getByUserId(userId);
      if (!type) return res.status(200).json( message );
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao buscar no banco',
        error: String(err),
      });
    }
  }

  public async getAll(_req: Request, res: Response) {
    try {
      const { type, message } = await this.service.getAll();
      if (!type) return res.status(200).json( message );
      return res.status(type).json({ message });
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao buscar no banco',
        error: String(err),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id, ...obj } = req.body;
      const { type, message } = await this.service.update(id, obj);
      if (!type) return res.status(200).json( message );
      return res.status(type).json({ message });
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao buscar no banco',
        error: String(err),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const result = await this.service.delete(id);
      if (result) return res.status(200).json({ 
        message: 
        'feirinha excluida com sucesso'});
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao deletar feirinha', error: String(err),
      })
    }
}
}