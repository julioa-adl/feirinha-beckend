import { Request, Response } from 'express';
import IProduct from '../interfaces/IProduct';
import ProductService from '../services/Product.Service';
import FeirinhaService from '../services/Feirinha.Service';
import RecommendationService from '../services/Recommendation.Service';

export default class ProductController {
  public service: ProductService;
  public feirinhaService: FeirinhaService;
  public recommendationService: RecommendationService;

  constructor() {
    this.service = new ProductService();
    this.feirinhaService = new FeirinhaService();
    this.recommendationService = new RecommendationService();
    this.getAll = this.getAll.bind(this);
    this.getOneById = this.getOneById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async getOneById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { type, payload } = await this.service.getOneById(id);
      if (type) {
        return res.status(404).json({ message: 'Product not found' }); 
      } 
      return res.status(200).json(payload);
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'Erro ao buscar produto no banco', error: String(err),
      });
    }
  } 

  public async getAll(_req: Request, res: Response) {
    try {
      const { type, payload } = await this.service.getAll();
      if (type) {
        return res.status(404).json({ message: 'No Products Returned' }); 
      }
      let allProducts: any[]; // Alterado para any[] para incluir a propriedade 'media'
      if (Array.isArray(payload)) {
        const mediaPromises = payload.map(async (p: any) => {
          const id = p._doc._id.toString()
          
          const { type: ftype, message: fmessage } = await this.feirinhaService.getAllByProductId(id);
          if (!ftype) {
            if (Array.isArray(fmessage)) {
              const media = fmessage.reduce((acc: number, cur: any) => acc + Number(cur.price), 0) / fmessage.length;
              if (media) {
                return media;
              }
              return 0;
            }
          }
        });

        const ratingPromises = payload.map(async (p: any) => {
          const id = p._doc._id.toString()

          const { type: rtype, payload: rpayload } = await this.recommendationService.getByProductId(id);
          if (!rtype) {
            if (Array.isArray(rpayload)) {
              const media = rpayload.reduce((acc: number, cur: any) => acc + Number(cur.rating), 0) / rpayload.length;
              if (media) {
                return media;
              }
              return 0;
            }
          }
          
        });
        const mediaResults = await Promise.all(mediaPromises);
        const ratingResults = await Promise.all(ratingPromises);
        allProducts = payload.map((p: any, index: number) => ({
          ...p._doc,
          media: mediaResults[index],
          rating: ratingResults[index],
        }));
      } else {
        allProducts = []; // or whatever default value you want
      }
      return res.status(200).json(allProducts);
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'Erro ao buscar produtos no banco', error: String(err),
      });
    }
  } 
   

  public async create(req: Request, res: Response) {
    try {
      const product: IProduct = req.body;
      const { type, message } = await this.service.create(product);
      if (type) {
        return res.status(type).json(message);
      }
      return res.status(201).json({ message });
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao registrar novo produto', error: String(err),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id, ...obj } = req.body;
      const result = await this.service.update(id, obj);
      return res.status(200).json({ message: `${result?.name} atualizado`});
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao atualizar produto', error: String(err),
      })
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const result = await this.service.delete(id);
      if (result) return res.status(200).json({ 
        message: 
        `produto ${result.name}-${result.subName}-${result.size}${result.unitMeasure}
da ${result.manufacturer} excluido com sucesso`});
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao deletar produto', error: String(err),
      })
    }
  }
}