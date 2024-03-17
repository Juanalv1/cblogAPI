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
exports.CategoryModel = void 0;
const db_1 = require("../libs/db");
class CategoryModel {
    // CREATE
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = req.body.category;
            if (category) {
                try {
                    const categoryFound = yield db_1.db.categories.findFirst({ where: { category_name: category } });
                    console.log(categoryFound);
                    if (!categoryFound) {
                        const newCategory = yield db_1.db.categories.create({
                            data: {
                                category_name: category
                            }
                        });
                        console.log(newCategory);
                        return newCategory;
                    }
                    else
                        return 409;
                }
                catch (error) {
                    return error;
                }
            }
            else {
                return 400;
            }
        });
    }
    static createMany(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = req.body;
            if (categories.length > 0) {
                try {
                    const newCategories = yield db_1.db.categories.createMany({
                        data: categories,
                        skipDuplicates: true
                    });
                    return (newCategories);
                }
                catch (error) {
                    return error;
                }
            }
            else {
                return '400';
            }
        });
    }
    // READ
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCategories = yield db_1.db.categories.findMany();
                return allCategories;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    static getById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (id) {
                try {
                    const category = yield db_1.db.categories.findUnique({
                        where: {
                            category_id: id
                        }
                    });
                    if (category) {
                        return category;
                    }
                    else
                        return ('Category ID not found');
                }
                catch (error) {
                    return error;
                }
            }
            else {
                return 'Invalid Category ID';
            }
        });
    }
    // UPDATE
    static updateById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = req.body;
            console.log(newCategory);
            const id = Number(req.params.id);
            if (id && newCategory) {
                try {
                    const foundCategory = yield db_1.db.categories.findUnique({
                        where: {
                            category_id: id
                        }
                    });
                    if (foundCategory && newCategory.category_name) {
                        try {
                            const updatedCategory = yield db_1.db.categories.update({
                                where: {
                                    category_id: id
                                },
                                data: {
                                    category_name: newCategory.category_name,
                                }
                            });
                            console.log(updatedCategory);
                            if (updatedCategory) {
                                return updatedCategory;
                            }
                        }
                        catch (error) {
                            return 500;
                        }
                    }
                    else if (!foundCategory) {
                        return 404;
                    }
                    else {
                        return 400;
                    }
                }
                catch (error) {
                    console.error(error);
                    return 500;
                }
            }
            {
                return;
            }
        });
    }
    // DELETE
    static deleteById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (id) {
                try {
                    const foundCategory = yield db_1.db.categories.findUnique({
                        where: {
                            category_id: id
                        }
                    });
                    if (foundCategory) {
                        const deletedCategory = yield db_1.db.categories.delete({
                            where: {
                                category_id: id
                            }
                        });
                        return deletedCategory;
                    }
                    else {
                        return undefined;
                    }
                }
                catch (error) {
                    console.error(error);
                    return;
                }
            }
            else {
                return;
            }
        });
    }
}
exports.CategoryModel = CategoryModel;
