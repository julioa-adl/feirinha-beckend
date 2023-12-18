"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.subName = product.subName;
        this.manufacturer = product.manufacturer;
        this.unitSelling = product.unitSelling;
        this.category = product.category;
        this.code = product.code;
        this.unitMeasure = product.unitMeasure;
        this.size = product.size;
        this.image = product.image;
    }
}
exports.default = Product;
