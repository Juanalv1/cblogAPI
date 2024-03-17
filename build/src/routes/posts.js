"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controller/posts");
const auth_1 = require("../middleware/auth");
exports.postsRouter = express_1.default.Router();
exports.postsRouter.post('/create', auth_1.auth, posts_1.PostController.create);
exports.postsRouter.get('/', posts_1.PostController.getAll);
exports.postsRouter.get('/id/:id', posts_1.PostController.getById);
exports.postsRouter.get('/title/:title', posts_1.PostController.getByTitle);
exports.postsRouter.patch('/update/:id', auth_1.auth, posts_1.PostController.updateById);
exports.postsRouter.delete('/delete/:id', auth_1.auth, posts_1.PostController.deleteById);
