import Express from "express";
import { PostController } from "../controller/posts";
import { auth } from "../middleware/auth";

export const postsRouter = Express.Router()

postsRouter.post('/create', auth ,PostController.create)
postsRouter.get('/', PostController.getAll)
postsRouter.get('/id/:id', PostController.getById)
postsRouter.get('/title/:title', PostController.getByTitle)
postsRouter.patch('/update/:id', auth ,PostController.updateById)
postsRouter.delete('/delete/:id', auth ,PostController.deleteById)

