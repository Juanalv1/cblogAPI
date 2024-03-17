import { Request } from "express";
import { db } from "../libs/db";

export class PostModel {
  //CREATE
  static async create (req: Request) {
    const postdata = req.body
    if (postdata) {
      try {
        const newPost = await db.posts.create({
          data: {
            post_title: postdata.post_title,
            content: postdata.content,
            banner_url: postdata.banner_url,
            preview_description : postdata.preview_description
          }
        })
        if (newPost) {
          return newPost
        } else {
          return 
        }
      } catch (error) {
        return 
      }
    } else return 
  }
  //READ
  static async getAll () {
    try {
      const posts = await db.posts.findMany({
        orderBy: {
          post_id: 'desc'
        }
      })
      if (posts) {
        return posts
      } else return '500'
    } catch (error) {
      console.error(error)
      return '500'
    }
  }
  static async getById (req: Request) {
    const id = Number(req.params.id)
    console.log(id)
    if (id) {
      const post = await db.posts.findUnique({
        where: {
          post_id: id
        }
      })
      if (post) {
        return post
      } else return '404'
    } else return '400'
  }
  static async getByTitle (req: Request) {
    const title = req.params.title
    console.log('aqui', title)
    if (title) {
      const post = await db.posts.findFirst({
        where: {
          post_title: {
            equals: title,
            mode: 'insensitive'
          }
        }
      })
      if (post) {
        return post
      } else return '404'
    } else return '400'
  }
  //UPDATE
  static async updateById(req: Request) {
    const data = req.body
    const id = Number(req.params.id)
    if(id){
      try {
        const postFound = await db.posts.findUnique({
          where: {
            post_id: id
          }
        })
        if (postFound) {
          const updatedPost = await db.posts.update({
            where: {
              post_id : id
            },
            data: {
              post_title: data.post_title,
              content: data.content,
              banner_url: data.banner_url,
              preview_description: data.preview_description
            }
          })
          if (updatedPost) {
            return updatedPost
          } else return '400'
        } else return '400'
      } catch (error) {
        return '500'
      }
    } else return '404'
  }
  //DELETE
  static async deleteById(req: Request){
    const id = Number(req.params.id)
    if(id){
      try {
        const postFound = await db.posts.findUnique({
          where: {
            post_id : id
          }
        })
        if (postFound) {
          const deletedPost = await db.posts.delete({
            where: {
              post_id : id
            }
          })
          return deletedPost
        } else return '404'
      } catch (error) {
        return '500'
      }
    }else return '400'
  }
}