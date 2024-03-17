import { Request, Response } from "express"
import { PostModel } from "../models/post"
export class PostController {
  //CREATE

  static async create (req: Request, res: Response){
    try {
      const newPost = await PostModel.create(req)
      if(newPost) res.status(201).json(newPost)
        else if(!newPost) res.status(400).json({message: "Error"})
    } catch (error) {
      console.error(error)
    }
  }

  //READ

  static async getAll (_req: Request, res: Response){
    try {
      const posts = await PostModel.getAll()
      if (posts == '500') {
        res.status(500).json('Server error')
      }else if (posts) res.status(200).json(posts)
      else res.status(500).json('Server error')
    } catch (error) {
      res.status(500).json(error)
    }
  }
  static async getById (req: Request, res:Response){
    try {
      const postFound = await PostModel.getById(req)
      if (postFound == '404') {
        res.status(404).json('Post Id not found')
      } else if(postFound == '400') {
        res.status(400).json('Invalid Request')
      } else if (postFound) res.status(200).json(postFound)
      else res.status(500).json('Server error')
    } catch (error) {
      console.error(error)
      res.status(500).json(error)
    }
  }
  static async getByTitle (req: Request, res:Response){
    try {
      const postFound = await PostModel.getByTitle(req)
      if (postFound == '404') {
        res.status(404).json('Post Title not found')
      } else if(postFound == '400') {
        res.status(400).json('Invalid Request')
      } else if (postFound) res.status(200).json(postFound)
      else res.status(500).json('Server error')
    } catch (error) {
      res.status(500).json(error)
    }
  }

  //UPDATE
  static async updateById(req: Request, res: Response){
    try {
      const updatedPost = await PostModel.updateById(req)
      if (updatedPost == '404') {
        res.status(404).json('Post Id not found')
      } else if (updatedPost == '400') res.status(400).json('Invalid request')
        else if (updatedPost == '500') res.status(500).json('Server error')
        else res.status(200).json(updatedPost)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  //DELETE
  static async deleteById(req: Request, res: Response){
    try {
      const deletedPost = await PostModel.deleteById(req)
      if (deletedPost == '404') res.status(404).json('Post id not found')
      else if (deletedPost == '400') res.status(400).json('Invalid request')
      else if (deletedPost == '500') res.status(500).json('Server error')
      else res.status(200).json(deletedPost)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}