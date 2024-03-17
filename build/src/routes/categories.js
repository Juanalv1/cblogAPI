"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_1 = __importDefault(require("express"));
const categories_1 = require("../controller/categories");
exports.categoriesRouter = express_1.default.Router();
//CREATE
exports.categoriesRouter.post("/create", categories_1.CategoryController.create);
//READ
exports.categoriesRouter.get("/", categories_1.CategoryController.getAll);
exports.categoriesRouter.get("/:id", categories_1.CategoryController.getById);
//UPDATE
exports.categoriesRouter.patch("/update/:id", categories_1.CategoryController.updateById);
//DELETE
exports.categoriesRouter.delete("/delete/:id", categories_1.CategoryController.deleteById);
