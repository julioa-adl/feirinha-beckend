import Recommendation from '../domains/Recommendation';
import IRecommendation from '../interfaces/IRecommendation';
import RecommendationModel from '../models/Recommendation.Model';

export default class RecommendationService {
    public model = new RecommendationModel();
    public createRecommendationDomain(recommendation: IRecommendation |
            null): Recommendation | null {
        if (recommendation) {
          return new Recommendation(recommendation);
        }
        return null;
    }

    public async getByProductId(productId: string) {
        const allRecommendations = await this.model.find({productId});
        if (!allRecommendations) return { type: 404, payload: { token: null } };
    
        return { type: null, payload: allRecommendations };
    }

    public async create(recommendation: IRecommendation) {
        const { userId, productId, rating, comment, date, userName } = recommendation;
    
        const newRecommendation = await this.model.create({
            userId, productId, rating, comment, date, userName
        });
        return { type: null, message: 
          `Recommendation ${newRecommendation.id} successfuly registered`};
      }
    
      public async delete(id: string) {
        return await this.model.delete(id)
      }
}
