export default interface IRecommendation {
    id?: string,
    userId: string,
    userName: string,
    productId: string,
    rating: number,
    comment: string,
    date: Date,
}