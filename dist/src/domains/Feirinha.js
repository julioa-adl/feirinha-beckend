"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Feirinha {
    constructor(feirinha) {
        this.id = feirinha.id;
        this.title = feirinha.title;
        this.userId = feirinha.userId;
        this.availableToSpend = feirinha.availableToSpend;
        this.marketId = feirinha.marketId;
        this.listCart = feirinha.listCart;
        this.date = feirinha.date;
    }
}
exports.default = Feirinha;
