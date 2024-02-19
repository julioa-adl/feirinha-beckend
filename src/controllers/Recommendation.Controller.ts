import { Request, Response } from 'express';
import IRecommendation from '../interfaces/IRecommendation';
import RecommendationService from '../services/Recommendation.Service';

export default class RecommendationController {
    public service: RecommendationService;

    constructor() {
        this.service = new RecommendationService();
        this.getByProductId = this.getByProductId.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }
    
    public async getByProductId(req: Request, res: Response) {
    const { productId } = req.params;
    try {
            const { type, payload } = await this.service.getByProductId(productId);
            if (type) {
            return res.status(404).json({ message: 'No Recommendations Returned' }); 
        } 
        return res.status(200).json(payload);
    } catch(err: unknown) {
            return res.status(500).json({
            message: 'Erro ao buscar Recomendações no banco', error: String(err),
            });
        }
    }

    public async create(req: Request, res: Response) {
      const recommendation: IRecommendation = req.body;
      if (recommendation.rating > 5 || recommendation.rating < 0) return res.status(400).json({ message: 'avaliação deve ser entre 0 e 5' });
        try {
          const { type, message } = await this.service.create(recommendation);
          if (type) {
            return res.status(type).json({ message });
          }
          return res.status(201).json({ message });
        } catch(err: unknown) {
          return res.status(500).json({
            message: 'erro ao registrar nova recomendação', error: String(err),
          });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
          const { id } = req.body;
          const result = await this.service.delete(id);
          if (result) return res.status(200).json({ 
            message: 
            'recomendação excluida com sucesso'});
        } catch(err: unknown) {
          return res.status(500).json({
            message: 'erro ao deletar recomendação', error: String(err),
          })
        }
    }
}