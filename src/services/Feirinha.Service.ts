import Feirinha from '../domains/Feirinha';
import FeirinhaModel from '../models/Feirinha.Model';
import { IFeirinha, IList } from '../interfaces/IFeirinha';

export default class FeirinhaService {
  public model = new FeirinhaModel();
  public createFeirinhaDomain(feirinha: IFeirinha | null): Feirinha | null {
    if (feirinha) {
      return new Feirinha(feirinha);
    }
    return null;
  }

  public async create(feirinha: IFeirinha) {
    const register = await this.model.create(feirinha);
    if (register) return { type: null, message: 'feirinha salva!' };
    return { type: 500, message: 'Erro ao cadastrar' };
  }

  public async getByUserId(userId: string) {
    const feirinhas = await this.model.findByUserId(userId);
    if (feirinhas) return { type: null, message: feirinhas };
    return { type: 404, message: 'nenhuma feirinha encontrada' };
  }

  public async getAll() {
    const search = await this.model.findAll();
    if (search) return { type: null, message: search };
    return { type: 404, message: 'nenhuma feirinha encontrada' };
  }

  public async update(id: string, obj: IFeirinha) {
    const update = await this.model.update(id, obj)
    if (update) return { type: null, message: 'feirinha atualizada!' };
    return { type: 500, message: 'Erro ao atualizar' };
  }

  public async delete(id: string) {
    return await this.model.delete(id)
  }

  // CRUD ITENS LISTCART
  public async addItemToList(feirinhaId: string, newItem: IList) {
    const updatedFeirinha = await this.model.addItemToList(feirinhaId, newItem);
    if (updatedFeirinha) {
      return { type: null, message: 'Item adicionado à lista!' };
    } else {
      return { type: 500, message: 'Erro ao adicionar item à lista' };
    }
  }
  
  public async removeItemFromList(feirinhaId: string, itemId: string) {
    const updatedFeirinha = await this.model.removeItemFromList(feirinhaId, itemId);
    if (updatedFeirinha) {
      return { type: null, message: 'Item removido da lista!' };
    } else {
      return { type: 500, message: 'Erro ao remover item da lista' };
    }
  }
  
  public async updateItemInList(feirinhaId: string, itemId: string, updatedItem: IList) {
    // Verificar se a feirinha existe
    const feirinha = await this.model.findById(feirinhaId);
    if (!feirinha) {
      return { type: 404, message: 'Feirinha não encontrada' };
    }
  
    // Verificar se o item com o ID fornecido existe na listaCart
    const existingItem = feirinha.listCart.find((item) => item['_id'] == itemId);
    if (!existingItem) {
      return { type: 404, message: 'Item não encontrado na lista' };
    }
  
    // Atualizar o item
    const updatedFeirinha = await this.model.updateItemInList(feirinhaId, itemId, updatedItem);
    if (updatedFeirinha) {
      return { type: null, message: 'Item atualizado na lista!' };
    } else {
      return { type: 500, message: 'Erro ao atualizar item na lista' };
    }
  }
  
  
}