"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }
}
exports.default = User;
