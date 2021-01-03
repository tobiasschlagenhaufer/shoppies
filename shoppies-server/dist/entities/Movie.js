"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
let Movie = class Movie {
    constructor() {
        this.users = new core_1.Collection(this);
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], Movie.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property(),
    __metadata("design:type", String)
], Movie.prototype, "imdbId", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property(),
    __metadata("design:type", String)
], Movie.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property(),
    __metadata("design:type", Number)
], Movie.prototype, "year", void 0);
__decorate([
    type_graphql_1.Field(),
    core_1.Property(),
    __metadata("design:type", String)
], Movie.prototype, "poster", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User]),
    core_1.ManyToMany(() => User_1.User),
    __metadata("design:type", core_1.Collection)
], Movie.prototype, "users", void 0);
Movie = __decorate([
    type_graphql_1.ObjectType(),
    core_1.Entity()
], Movie);
exports.Movie = Movie;
//# sourceMappingURL=Movie.js.map