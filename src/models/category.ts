import { Request} from "express";
import { db } from "../libs/db";


export class CategoryModel {
  // CREATE
  static async create(req: Request) {
      const category = req.body.category;
      if (category) {
        try {
          const categoryFound = await db.categories.findFirst({ where: { category_name: category}})
          console.log(categoryFound)
          if (!categoryFound) {
            const newCategory = await db.categories.create({
              data: {
                category_name: category
              }})
              console.log(newCategory)
              return newCategory
          } else return 409
        } catch (error) {
          return error
        }
        } else {
          return 400
        }
      }
  static async createMany(req: Request) {
    const categories = req.body;
    if (categories.length > 0) {
      try {
        const newCategories = await db.categories.createMany({
          data: categories,
          skipDuplicates: true
        })
        return(newCategories)
      } catch (error) {
        return error
      }
    } else {
      return  '400'
    }
  }
  // READ
  static async getAll() {
    try {
      const allCategories = await db.categories.findMany()
      return allCategories; 
    } catch (error) {
      console.log(error)
      return error
    }
  }
  static async getById(req: Request) {
    const id = Number(req.params.id)
    if (id){
      try {
        const category = await db.categories.findUnique({
          where: {
            category_id : id
          }
        })
        if (category) {
          return category
        } else return ('Category ID not found')
      } catch (error) {
        return error
      }
    } else {
      return 'Invalid Category ID'
    }
  }
  // UPDATE
  static async updateById(req: Request){
    const newCategory = req.body
    console.log(newCategory)
    const id = Number(req.params.id)
    if (id && newCategory) {
      try {
        const foundCategory = await db.categories.findUnique({
            where: {
            category_id : id
          }
        })
        if (foundCategory && newCategory.category_name) {
          try {
            const updatedCategory = await db.categories.update({
              where: {
                category_id : id
              },
              data: {
                category_name: newCategory.category_name,
              }
            })
            console.log(updatedCategory)
          if (updatedCategory) {
            return updatedCategory
          }} catch (error) {
            return 500
          }
        }
        else if (!foundCategory){
          return 404
        } else {
          return 400
        }
      } catch (error) {
        console.error(error)
        return 500
      }
    } {
      return 
    }
  }
  // DELETE
  static async deleteById(req: Request){
    const id = Number(req.params.id)
    if (id) {
      try {
        const foundCategory = await db.categories.findUnique({
          where: {
            category_id : id
          }})
        if (foundCategory) {
          const deletedCategory = await db.categories.delete({
            where: {
              category_id : id
            }
          })
          return deletedCategory
        } else {
          return undefined
        }


      } catch (error) {
        console.error(error)
        return
      }
    } else {
      return
    } 
  }
  }