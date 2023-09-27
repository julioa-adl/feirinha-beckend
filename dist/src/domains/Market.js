"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Market {
    constructor(market) {
        this.id = market.id;
        this.name = market.name;
        this.address = market.address;
        this.neighborhood = market.neighborhood;
        this.city = market.city;
        this.state = market.state;
    }
}
exports.default = Market;
