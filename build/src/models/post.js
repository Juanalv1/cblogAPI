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
exports.PostModel = void 0;
const db_1 = require("../libs/db");
class PostModel {
    //CREATE
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const postdata = req.body;
            if (postdata) {
                try {
                    const newPost = yield db_1.db.posts.create({
                        data: {
                            post_title: postdata.post_title,
                            content: postdata.content,
                            banner_url: postdata.banner_url,
                            preview_description: postdata.preview_description
                        }
                    });
                    if (newPost) {
                        return newPost;
                    }
                    else {
                        return;
                    }
                }
                catch (error) {
                    return;
                }
            }
            else
                return;
        });
    }
    //READ
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield db_1.db.posts.findMany({
                    orderBy: {
                        post_id: 'desc'
                    }
                });
                if (posts) {
                    return posts;
                }
                else
                    return '500';
            }
            catch (error) {
                console.error(error);
                return '500';
            }
        });
    }
    static getAllTitles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield db_1.db.posts.findMany({
                    orderBy: {
                        post_id: 'desc'
                    },
                    select: {
                        post_title: true
                    }
                });
                if (posts) {
                    return posts;
                }
                else
                    return '500';
            }
            catch (error) {
                console.error(error);
                return '500';
            }
        });
    }
    static getById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            console.log(id);
            if (id) {
                const post = yield db_1.db.posts.findUnique({
                    where: {
                        post_id: id
                    }
                });
                if (post) {
                    return post;
                }
                else
                    return '404';
            }
            else
                return '400';
        });
    }
    static getByTitle(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = req.params.title;
            console.log('aqui', title);
            if (title) {
                const post = yield db_1.db.posts.findFirst({
                    where: {
                        post_title: {
                            equals: title,
                            mode: 'insensitive'
                        }
                    }
                });
                if (post) {
                    return post;
                }
                else
                    return '404';
            }
            else
                return '400';
        });
    }
    //UPDATE
    static updateById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const id = Number(req.params.id);
            if (id) {
                try {
                    const postFound = yield db_1.db.posts.findUnique({
                        where: {
                            post_id: id
                        }
                    });
                    if (postFound) {
                        const updatedPost = yield db_1.db.posts.update({
                            where: {
                                post_id: id
                            },
                            data: {
                                post_title: data.post_title,
                                content: data.content,
                                banner_url: data.banner_url,
                                preview_description: data.preview_description
                            }
                        });
                        if (updatedPost) {
                            return updatedPost;
                        }
                        else
                            return '400';
                    }
                    else
                        return '400';
                }
                catch (error) {
                    return '500';
                }
            }
            else
                return '404';
        });
    }
    //DELETE
    static deleteById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (id) {
                try {
                    const postFound = yield db_1.db.posts.findUnique({
                        where: {
                            post_id: id
                        }
                    });
                    if (postFound) {
                        const deletedPost = yield db_1.db.posts.delete({
                            where: {
                                post_id: id
                            }
                        });
                        return deletedPost;
                    }
                    else
                        return '404';
                }
                catch (error) {
                    return '500';
                }
            }
            else
                return '400';
        });
    }
}
exports.PostModel = PostModel;
