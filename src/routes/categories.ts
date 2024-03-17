import Express from "express";
import { CategoryController } from "../controller/categories";

export const categoriesRouter = Express.Router()

//CREATE
categoriesRouter.post("/create", CategoryController.create)

//READ
categoriesRouter.get("/", CategoryController.getAll)
categoriesRouter.get("/:id", CategoryController.getById)

//UPDATE
categoriesRouter.patch("/update/:id", CategoryController.updateById)

//DELETE
categoriesRouter.delete("/delete/:id", CategoryController.deleteById)
