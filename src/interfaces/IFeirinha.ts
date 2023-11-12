export interface IList {
  productId: string,
  productName: string
  quantity: number,
  price: number,
  buyed: boolean
}

export interface IFeirinha {
  id?: string,
  userId: string,
  marketId: string,
  listCart: IList[],
  date: Date,
}