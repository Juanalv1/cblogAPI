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
exports.PostController = void 0;
const post_1 = require("../models/post");
class PostController {
    //CREATE
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPost = yield post_1.PostModel.create(req);
                if (newPost)
                    res.status(201).json(newPost);
                else if (!newPost)
                    res.status(400).json({ message: "Error" });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    //READ
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let posts;
                const { onlytitles } = req.params;
                if (onlytitles) {
                    posts = yield post_1.PostModel.getAllTitles();
                }
                else {
                    posts = yield post_1.PostModel.getAll();
                }
                if (posts == '500') {
                    res.status(500).json('Server error');
                }
                else if (posts)
                    res.status(200).json(posts);
                else
                    res.status(500).json('Server error');
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postFound = yield post_1.PostModel.getById(req);
                if (postFound == '404') {
                    res.status(404).json('Post Id not found');
                }
                else if (postFound == '400') {
                    res.status(400).json('Invalid Request');
                }
                else if (postFound)
                    res.status(200).json(postFound);
                else
                    res.status(500).json('Server error');
            }
            catch (error) {
                console.error(error);
                res.status(500).json(error);
            }
        });
    }
    static getByTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postFound = yield post_1.PostModel.getByTitle(req);
                if (postFound == '404') {
                    res.status(404).json('Post Title not found');
                }
                else if (postFound == '400') {
                    res.status(400).json('Invalid Request');
                }
                else if (postFound)
                    res.status(200).json(postFound);
                else
                    res.status(500).json('Server error');
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    //UPDATE
    static updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPost = yield post_1.PostModel.updateById(req);
                if (updatedPost == '404') {
                    res.status(404).json('Post Id not found');
                }
                else if (updatedPost == '400')
                    res.status(400).json('Invalid request');
                else if (updatedPost == '500')
                    res.status(500).json('Server error');
                else
                    res.status(200).json(updatedPost);
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
                const deletedPost = yield post_1.PostModel.deleteById(req);
                if (deletedPost == '404')
                    res.status(404).json('Post id not found');
                else if (deletedPost == '400')
                    res.status(400).json('Invalid request');
                else if (deletedPost == '500')
                    res.status(500).json('Server error');
                else
                    res.status(200).json(deletedPost);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.PostController = PostController;
