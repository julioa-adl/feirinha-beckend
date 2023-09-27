"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Recommendation {
    constructor(recommendation) {
        this.id = recommendation.id;
        this.userId = recommendation.userId;
        this.productId = recommendation.productId;
        this.rating = recommendation.rating;
        this.comment = recommendation.comment;
        this.date = recommendation.date;
    }
}
exports.default = Recommendation;
