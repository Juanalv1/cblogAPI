import { Request, Response } from "express";
import { CategoryModel } from "../models/category"

export class CategoryController {
  //CREATE
  static async create (req: Request, res: Response){
    if(req.query.many){
      return CategoryController.createMany(req, res)
    } else {
      try {
        const newCategory = await CategoryModel.create(req)
        if (newCategory == 409) {
          res.status(409).json('Category Already exists')
        }else if (newCategory == 400) res.status(400).json('Invalid Request')
        else if (newCategory) {
          res.status(201).json(newCategory)
        } 
      } catch (error) {
        res.status(500).json(error)
      }
    }
  }
  static async createMany ( req: Request, res: Response){

    try {
      const newCategories = await CategoryModel.createMany(req)
      if (newCategories == '400') {
        res.status(400).json('Invalid Request')
      }
      else if(newCategories) {res.status(201).json(newCategories)}
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  }
  // READ
  static async getAll (_req: Request,res: Response) {
    try {
      const categories = await CategoryModel.getAll()
      console.log(categories)
      res.status(200).json(categories)
    } catch (error) {
      console.log('error')
      res.status(500).send('Server error')
    }
  }
  static async getById (req: Request,res: Response) {
    try {
      const category = await CategoryModel.getById(req)
      res.status(200).json(category)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  // UPDATE 
  static async updateById (req: Request, res: Response) {
    try {
      const updatedCategory = await CategoryModel.updateById(req)
      if (updatedCategory == 404) {
        res.status(404).json('Category not found')
      } else if (updatedCategory == 400){
        res.status(400).json('Invalid request')
      }
      else{
      res.status(200).json(updatedCategory)
    }
    } catch (error) {
      res.status(500).json(error)
    }
  }
  //DELETE
  static async deleteById (req: Request, res: Response) {
    try {
      const deletedCategory = await CategoryModel.deleteById(req)
      console.log(deletedCategory)
      if (!deletedCategory) {
        res.status(404).json('Category not found')
      } else if(deletedCategory) {
        res.status(200).json(deletedCategory)
      } 
    } catch (error) {
      res.status(500).json(error)
    }
  }
}