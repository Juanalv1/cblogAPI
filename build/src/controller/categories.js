"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_1 = require("../models/category");
class CategoryController {
    //CREATE
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.many) {
                return CategoryController.createMany(req, res);
            }
            else {
                try {
                    const newCategory = yield category_1.CategoryModel.create(req);
                    if (newCategory == 409) {
                        res.status(409).json('Category Already exists');
                    }
                    else if (newCategory == 400)
                        res.status(400).json('Invalid Request');
                    else if (newCategory) {
                        res.status(201).json(newCategory);
                    }
                }
                catch (error) {
                    res.status(500).json(error);
                }
            }
        });
    }
    static createMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCategories = yield category_1.CategoryModel.createMany(req);
                if (newCategories == '400') {
                    res.status(400).json('Invalid Request');
                }
                else if (newCategories) {
                    res.status(201).json(newCategories);
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json(error);
            }
        });
    }
    // READ
    static getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_1.CategoryModel.getAll();
                console.log(categories);
                res.status(200).json(categories);
            }
            catch (error) {
                console.log('error');
                res.status(500).send('Server error');
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_1.CategoryModel.getById(req);
                res.status(200).json(category);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    // UPDATE 
    static updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCategory = yield category_1.CategoryModel.updateById(req);
                if (updatedCategory == 404) {
                    res.status(404).json('Category not found');
                }
                else if (updatedCategory == 400) {
                    res.status(400).json('Invalid request');
                }
                else {
                    res.status(200).json(updatedCategory);
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    //DELETE
    static deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCategory = yield category_1.CategoryModel.deleteById(req);
                console.log(deletedCategory);
                if (!deletedCategory) {
                    res.status(404).json('Category not found');
                }
                else if (deletedCategory) {
                    res.status(200).json(deletedCategory);
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
